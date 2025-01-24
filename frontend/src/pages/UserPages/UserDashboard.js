// Import Statements --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
// --- Other/React Import/s
import { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";
import axios from "axios";


const UserDashboard = () => {
    const [upcomingData, setUpcomingData] = useState({
        completeAppointmentCount: 0,
        userAppointmentCount: 0,
        upcomingAppointment: []
    });

    useEffect(() => {
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

                setUpcomingData(response.data.data);
            } catch (e) {
                console.log(e);
            }
        }

        fetchAppointments();
    }, [])

    const showAppointment = (status) => {
        
    }


    return (  
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
                                <th className="dashboard-th">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {upcomingData.upcomingAppointment.map((data, index) => (
                            <tr key={index} className="dashboard-tbody-tr">
                                <td className="dashboard-tbody-td">{data.serviceDetails}</td>
                                <td className="dashboard-tbody-td">{data.scheduledDate.replaceAll('-', '/')}</td>
                                <td className="dashboard-tbody-td">{data.scheduledTime}</td>
                                <td className="dashboard-tbody-td">{data.rating}</td>
                                <td className="dashboard-tbody-td">{data.appointmentStatus}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
 
export default UserDashboard;