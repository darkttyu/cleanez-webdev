// Import Statements --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
import UserAppointmentInfo from "../../components/UserAppointmentInfo";
import RatingBox from "../../components/RatingBox";
// --- Other/React Import/s
import { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";
import axios from "axios";


import LoadingScreen2 from "../../components/LoadingScreen2";


const UserDashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    const [upcomingData, setUpcomingData] = useState({
        completeAppointmentCount: 0,
        userAppointmentCount: 0,
        upcomingAppointment: []
    });
    const [showAppInfo, setShowAppInfo] = useState(false);
    const [showRating, setShowRating] = useState(false);
    const [appID, setAppID] = useState('');

    const fetchAppointments = async () => {
        try {
            const token = localStorage.getItem("token");
            
            const response = await axios.get(`http://localhost:5000/api/user/getAllUserAppointments`,
                {
                    headers: { 
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            console.log(response.data.data);
            setUpcomingData(response.data.data);
        } catch (e) {
            console.log(e);
        }
    }

    const cancelAppointment = async (id) => {
        try {
            const repsonse = await axios.put(`http://localhost:5000/api/user/cancelAppointment/${id}`);
            console.log(repsonse);

            setShowAppInfo(false);
            fetchAppointments();
        } catch (e) {
            console.log(e);
        }
    }

    const completeAppointment = async (id) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/user/setAppointmentAsCompleted/${id}`);
            console.log(response);

            setShowAppInfo(false);
            fetchAppointments();
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        document.title = 'CleanEZ | Dashboard'
        fetchAppointments();
    }, [])

    
    useEffect(() => {
        const page = document.querySelector('.account-page-right');

        const loadResources = async () => {
            
            await document.fonts.ready;

            setTimeout(() => {
                setFadeOut(true);

                setTimeout(() => {
                    setIsLoading(false);

                }, 500);
            }, 3000);

            
        };


        if (upcomingData) {
            loadResources();
        }
    }, [fetchAppointments])

    const showAppointment = (id) => {
        setShowAppInfo(true);
        setAppID(id);
    }

    useEffect(() => {
        console.log(showAppInfo);
    }, [showAppInfo])


    return (  
        <>
            {isLoading? 
            <LoadingScreen2 fadeOut={fadeOut}/> :
            <>
            </>
            }

            {showRating ?
            <RatingBox
            appID={appID}
            setShowRating={setShowRating}
            fetchAppointments={fetchAppointments}/> :
            <></>
            }
            {showAppInfo ? 
            <UserAppointmentInfo 
            appID={appID} 
            setShowAppInfo={setShowAppInfo}
            setShowRating={setShowRating}
            cancelAppointment={cancelAppointment}
            completeAppointment={completeAppointment}/> : 
            <></>}
            <div className="dashboard-page">
                <div className="dashboard-header">
                    <section className="dashboard-total-container">
                        <h2>Total No. of Appointments</h2>
                        <p className="dashboard-total">{upcomingData.userAppointmentCount}</p>
                    </section>
                    <section className="dashboard-total-container">
                        <h2>Total No. of Completed Appointments</h2>
                        <p className="dashboard-total">{upcomingData.completeAppointmentCount}</p>
                    </section>
                </div>
                <section className="dashboard-upcoming-container">
                    <h2>Upcoming Appointments</h2>
                    <div className="dashboard-list-container">
                        <table className="dashboard-list-table">
                            <thead className="dashboard-thead">
                                <tr>
                                    <th className="dashboard-th">Service</th>
                                    <th className="dashboard-th">Date</th>
                                    <th className="dashboard-th">Time</th>
                                    <th className="dashboard-th">Rating</th>
                                    <th className="dashboard-th">Appointment</th>
                                    <th className="dashboard-th">Payment</th>
                                </tr>
                            </thead>
                            <tbody>
                            {upcomingData.upcomingAppointment.map((data, index) => (
                                !(data.appointmentStatus === "Cancelled") ? 
                                    <tr 
                                    key={index} 
                                    className="dashboard-tbody-tr"
                                    onClick={(e) => {
                                        showAppointment(data._id)}}>
                                        <td className="dashboard-tbody-td">{data.serviceDetails}</td>
                                        <td className="dashboard-tbody-td">{data.scheduledDate.replaceAll('-', '/')}</td>
                                        <td className="dashboard-tbody-td">{data.scheduledTime}</td>
                                        <td className="dashboard-tbody-td">{data.rating}</td>
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
                                    </tr> :
                                    <>
                                    </>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </>
        
    );
}
 
export default UserDashboard;