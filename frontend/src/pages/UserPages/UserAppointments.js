// Import Statements --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
import UserAppointmentInfo from "../../components/UserAppointmentInfo";
import RatingBox from "../../components/RatingBox";
// --- Other/React Import/s
import { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";
import axios from "axios";


import LoadingScreen2 from "../../components/LoadingScreen2";

const UserAppointments = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    const [appointments, setAppointments] = useState([]);
    const [showAppInfo, setShowAppInfo] = useState(false);
    const [showRating, setShowRating] = useState(false);
    const [appID, setAppID] = useState('');

    const fetchAppointments = async () => {
        try {
            const token = localStorage.getItem("token");
            
            const response = await axios.get(`https://cleanez-api.vercel.app/api/user/viewAppointmentHistory`,
                {
                    headers: { 
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            console.log(response)

            setAppointments(response.data.appointments);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        document.title = 'CleanEZ | Profile'
        fetchAppointments();
    }, [])

    useEffect(() => {
        const loadResources = async () => {
            
            await document.fonts.ready;

            setTimeout(() => {
                setFadeOut(true);

                setTimeout(() => {
                    setIsLoading(false);

                }, 500);
            }, 3000);

            
        };

        if (appointments) {
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
            setShowRating={setShowRating}/> : 
            <></>
            }

            <div className="dashboard-page">
                <section className="dashboard-upcoming-container">
                    <h2>Appointments History</h2>
                    <div className="dashboard-list-container">
                        <table className="dashboard-list-table">
                            <thead className="dashboard-thead">
                                <tr>
                                    <th className="dashboard-th">Service</th>
                                    <th className="dashboard-th">Date</th>
                                    <th className="dashboard-th">Rating</th>
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
                                    <td className="dashboard-tbody-td">{data.serviceDetails}</td>
                                    <td className="dashboard-tbody-td">{data.scheduledDate.replaceAll('-', '/')}</td>
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
 
export default UserAppointments;