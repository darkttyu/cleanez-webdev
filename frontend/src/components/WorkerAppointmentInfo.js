import { useEffect, useState } from "react";
import axios from "axios";
import SVGIcons from "../SVGIcons";


const WorkerAppointmentInfo  = ({appID, setShowAppInfo, paidAppointment}) => {
    const [data, setData] = useState({
        _id: "",
        userId: "",
        customerFirstName: "",
        customerLastName: "",
        phoneNumber: "",
        address: {
            block: "",
            province: "",
            municipal: "",
            barangay: ""
        },
        serviceDetails: {
            serviceCategory: "",
            sizeOfArea: "",
            numberOfWorkers: 0,
            numberOfWindows: 0
        },
        scheduleDetails: {
            date: "",
            startTime: ""
        },
        assignedWorkers: [],
        serviceCost: 0,
        appointmentStatus: "",
        paymentStatus: "",
        appointmentRating: 0,
        createdAt: "",
        updatedAt: "",
        appointmentTime: ""
    });

    useEffect(() => {
        const fetchAppointment = async (id) => {
            try {
                const userresponse = await axios.get(`https://cleanez-api.vercel.app/api/user/viewAppointment/${id}`);
                
                const token = localStorage.getItem("token");
                const workerresponse = await axios.get(`https://cleanez-api.vercel.app/api/worker/viewWorkerAppointment/${id}`,{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log("User", userresponse.data.data);
                console.log("Worker", workerresponse.data.data);
                setData(userresponse.data.data);
            } catch (e) {
                console.log(e);
            }
        }

        fetchAppointment(appID);
    }, [])

    const showActionButtons = (currPayment) => {
        const pymt = String(currPayment).toLowerCase();

        if (pymt === "cancelled" || pymt === "paid") {
            return (
                <></>
            );
        } else if (pymt === "pending") {
            return (
                <button 
                    className="act-btn complete"
                    onClick={(e) => paidAppointment(appID)}>
                        Mark as Paid
                </button>
            );
        }
    }

    useEffect(() => {
        console.log(data)
    }, [data])

    return (  
        <div 
        className="appointment-info-container">
            <section className="appointment-info-box">
                <div className="appointment-data">
                    {/* Title and Status */}
                    <div className="appointment-title-status">
                        <h2 className="appointment-title">{data.serviceDetails.serviceCategory}</h2>
                        <div className={`dashboard-status 
                        ${String(data.appointmentStatus).toLowerCase()}`}>
                            {data.appointmentStatus}
                        </div>
                    </div>

                    {/* Personal Information */}
                    <section className="appointment-data-box">
                        <div className="appointment-data-line">
                            <p className="title">Client Name</p>
                            <div className="data">
                                <p>{data.customerFirstName} {data.customerLastName}</p>
                            </div>
                        </div>
                        <div className="appointment-data-line">
                            <p className="title">Phone Number</p>
                            <div className="data">
                                <p>{data.phoneNumber}</p>
                            </div>
                        </div>
                        <div className="appointment-data-line">
                            <p className="title">Address</p>
                            <div className="data">
                                <p>{data.address.block}</p>
                                <p>{data.address.barangay}, {data.address.municipal}, {data.address.province}</p>
                            </div>
                        </div>
                    </section>

                    {/* Appointment Details */}
                    <h2>Appointment Details</h2>
                    <section className="appointment-data-box">
                        <div className="appointment-data-line">
                            <p className="title">Date</p>
                            <div className="data">
                                <p>{data.scheduleDetails.date.slice(0, 10)}</p>
                            </div>
                        </div>
                        <div className="appointment-data-line">
                            <p className="title">Time</p>
                            <div className="data">
                                <p>{data.appointmentTime}</p>
                            </div>
                        </div>
                        <div className="appointment-data-line">
                            <p className="title">Workers</p>
                            <div className="data">
                                {data.assignedWorkers.map((worker, index) => (
                                    <p key={index}>{worker}</p>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Service Details */}
                    <h2>Service Details</h2>
                    <section className="appointment-data-box">
                        <div className="appointment-data-line">
                            <p className="title">Service</p>
                            <div className="data">
                                <p>{data.serviceDetails.serviceCategory}</p>
                            </div>
                        </div>
                        <div className="appointment-data-line">
                            <p className="title">Size of Area</p>
                            <div className="data">
                                <p>{data.serviceDetails.sizeOfArea}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="appointment-data-line price">
                            <p className="title">Total Cost</p>
                            <div className="data">
                                <p>&#8369;{data.serviceCost}</p>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="appointment-buttons">
                    <button 
                    type="button"
                    className="appointment-return"
                    onClick={(e) => setShowAppInfo(false)}>
                        <SVGIcons
                        selected="previousArrow"
                        size="36px"
                        color="#222222"/>
                    </button>
                    <div className="appointment-actions">
                        {showActionButtons(data.paymentStatus)}
                    </div>
                </div>
            </section>
        </div>
    );
}
 
export default WorkerAppointmentInfo;