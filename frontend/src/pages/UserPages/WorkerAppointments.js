// Import Statements --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
import WorkerAppointmentInfo from "../../components/WorkerAppointmentInfo";
import RatingBox from "../../components/RatingBox";
// --- Other/React Import/s
import { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";
import axios from "axios";

const WorkerAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [showAppInfo, setShowAppInfo] = useState(false);
    const [appID, setAppID] = useState('');

    const fetchAppointments = async () => {
        try {
            const token = localStorage.getItem("token");
            
            const response = await axios.get(`http://localhost:5000/api/worker/getWorkerAppointments`,
                {
                    headers: { 
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            console.log(response)

            setAppointments(response.data.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchAppointments();
    }, [])

    
    const showAppointment = (id) => {
        setShowAppInfo(true);
        setAppID(id);
    }

    const paidAppointment = async (id) => {
        try {
            const token = localStorage.getItem("token");
            console.log(id, token);
            const response = await axios.put(`http://localhost:5000/api/worker/markAppointmentAsPaid/${id}`, {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
            });

            console.log(response);

            setShowAppInfo(false);
            fetchAppointments();
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        console.log(showAppInfo);
    }, [showAppInfo])

    return (  
        <>  
            {showAppInfo ? 
            <WorkerAppointmentInfo 
            appID={appID} 
            setShowAppInfo={setShowAppInfo}
            paidAppointment={paidAppointment}/> :
             <></>}
            <div className="dashboard-page">
                <section className="dashboard-upcoming-container">
                    <h2>Upcoming Appointments</h2>
                    <div className="dashboard-list-container">
                        <table className="dashboard-list-table">
                            <thead className="dashboard-thead">
                                <tr>
                                    <th className="dashboard-th">Client</th>
                                    <th className="dashboard-th">Date</th>
                                    <th className="dashboard-th">Time</th>
                                    <th className="dashboard-th">Appointment</th>
                                    <th className="dashboard-th">Payment</th>
                                </tr>
                            </thead>
                            <tbody>
                            {appointments.map((data, index) => (
                                <tr 
                                key={index} 
                                className="dashboard-tbody-tr"
                                onClick={(e) => {
                                    showAppointment(data._id)}}>
                                    <td className="dashboard-tbody-td">{data.customerName}</td>
                                    <td className="dashboard-tbody-td">{data.scheduledDate.replaceAll('-', '/')}</td>
                                    <td className="dashboard-tbody-td">{data.scheduledTime}</td>
                                    <td className="dashboard-tbody-td ">
                                        <div className={`dashboard-status 
                                        ${String(data.appointmentStatus).toLowerCase()}`}>
                                            {data.appointmentStatus}
                                        </div>
                                    </td>
                                    <td className="dashboard-tbody-td ">
                                        <div className={`dashboard-status 
                                        ${String(data.paymentStatus).toLowerCase()}`}>
                                            {data.paymentStatus}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </>
    );
}
 
export default WorkerAppointments;