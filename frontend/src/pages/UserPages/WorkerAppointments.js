// Import Statements --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
import AppointmentInfo from "../../components/AppointmentInfo";
import RatingBox from "../../components/RatingBox";
// --- Other/React Import/s
import { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";
import axios from "axios";


const WorkerAppointments = () => {
    const [upcomingData, setUpcomingData] = useState([]);
    const [showAppInfo, setShowAppInfo] = useState(false);
    const [showRating, setShowRating] = useState(false);
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
            console.log(response.data.data)
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
            {showAppInfo ? 
            <AppointmentInfo 
            appID={appID} 
            setShowAppInfo={setShowAppInfo}
            setShowRating={setShowRating}
            cancelAppointment={cancelAppointment}
            completeAppointment={completeAppointment}/> : 
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
                                    <th className="dashboard-th">Appointment Status</th>
                                    <th className="dashboard-th">Payment Status</th>
                                </tr>
                            </thead>
                            <tbody>
                            {upcomingData.map((data, index) => (
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