import {useState, useEffect } from "react";
import SVGIcons from "../../SVGIcons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminAppointments = () => {
    const navigate = useNavigate();
    
    const [AppointmentList, setAppointmentList] = useState([]);
    const [currentList, setCurrentList] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);

    const [searchWord, setSearchWord] = useState('');

    const fetchAllAppointments = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/admin/getAppointments`);

            setAppointmentList(response.data.appointmentList);
        } catch (e) {
            console.log(e);
        }
        
    }

    const handlePages = (destination) => {
        if (destination === "next" && !(currentList.length === 0 || currentList.length < 10)) {
            setCurrentPage(currentPage + 1)
        } else if (destination === "prev" && currentPage != 1) {
            setCurrentPage( currentPage - 1)
        }
    }

    useEffect(() => {
        fetchAllAppointments();
    }, []);

    useEffect(() => {
        setCurrentList(AppointmentList);
    }, [AppointmentList])

    return (  
        <div className="dashboard-page">
            <section className="dashboard-upcoming-container">
                <div className="admin-searchbar-container">
                    <input 
                    type="text" 
                    placeholder="Search"
                    className="dashboard-searchbar"
                    name="dashboard-searchbar" 
                    id="dashboard-searchbar" 
                    onChange={(e) => setSearchWord(e.target.value)}/>
                </div>
                <div className="dashboard-list-container">
                    <table className="dashboard-list-table">
                        <thead className="dashboard-thead">
                            <tr>
                                <th className="dashboard-th tb-left">Customer</th>
                                <th className="dashboard-th tb-left">Service Category</th>
                                <th className="dashboard-th tb-center">Schedule</th>
                                <th className="dashboard-th tb-center">Appointment</th>
                                <th className="dashboard-th tb-center">Payment</th>
                                <th className="dashboard-th tb-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {currentList?.map((appt, index) => (
                            <tr 
                            key={index} 
                            className="dashboard-tbody-tr"
                            onClick={(e) => {
                                // navigate(worker.userId._id)
                                // console.log("userId._id: ", worker.userId._id)
                                // console.log("_id: ", worker._id)
                            }}>
                                <td className="dashboard-tbody-td tb-left">{appt.customerName}</td>
                                <td className="dashboard-tbody-td tb-left">{appt.serviceName}</td>
                                <td className="dashboard-tbody-td tb-center">{appt.date}</td>
                                <td className="dashboard-tbody-td tb-center">
                                    <div className={`dashboard-status 
                                        ${String(appt.appointmentStatus).toLowerCase()}`}>
                                            {appt.appointmentStatus}
                                    </div>
                                </td>
                                <td className="dashboard-tbody-td tb-center">
                                    <div className={`dashboard-status 
                                        ${String(appt.paymentStatus).toLowerCase()}`}>
                                            {appt.paymentStatus}
                                    </div>
                                </td>
                                <td className="dashboard-tbody-td tb-center">
                                    <SVGIcons 
                                    selected="trash"
                                    size="24px"
                                    color="#CC3363"
                                    onClick={(e) => {handleDeleteButton(worker.userId._id)}}/>
                                </td>
                            </tr> 
                        ))}
                            
                       
                        </tbody>
                    </table>
                    <div className="dashboard-list-navigation">
                        <SVGIcons 
                        selected="previousArrow"
                        size="32px"
                        color="#222222"
                        onClick={(e) => handlePages("prev")}/>
                        <h2>{currentPage}</h2>
                        <SVGIcons 
                        selected="forwardArrow"
                        size="32px"
                        color="#222222"
                        onClick={(e) => handlePages("next")}/>
                    </div>
                </div>
            </section>
        </div>
    );
}
 
export default AdminAppointments;