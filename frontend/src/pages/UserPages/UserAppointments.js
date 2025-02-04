// Import Statements --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
import UserAppointmentInfo from "../../components/UserAppointmentInfo";
import RatingBox from "../../components/RatingBox";
// --- Other/React Import/s
import { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";
import axios from "axios";


const UserAppointments = () => {
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
        fetchAppointments();
    }, [])

    
    const showAppointment = (id) => {
        setShowAppInfo(true);
        setAppID(id);
    }

    useEffect(() => {
        console.log(showAppInfo);
    }, [showAppInfo])

    return (  
        <>  
            {showRating ?
            <RatingBox
            appID={appID}
            setShowRating={setShowRating}
            fetchAppointments={fetchAppointments}/> :
            <></>
            }
            {showAppInfo ? <UserAppointmentInfo appID={appID} setShowAppInfo={setShowAppInfo}/> : <></>}
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