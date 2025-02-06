import {useState, useEffect } from "react";
import SVGIcons from "../../SVGIcons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import LoadingScreen3 from "../../components/LoadingScreen3";

const AdminAppointments = () => {
    const [isLoading, setIsLoading] =useState(true);

    const navigate = useNavigate();
    
    const [AppointmentList, setAppointmentList] = useState([]);
    const [currentList, setCurrentList] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);

    const [searchWord, setSearchWord] = useState('');

    const fetchAllAppointments = async (page, size, search) => {
        setIsLoading(true);
            console.log("Page: ", page);
            console.log("Size: ", size);
            console.log("Search: ", search);
        try {
            const response = await axios.get(`https://cleanez-api.vercel.app/api/admin/getAppointments`,
                {params: { 
                    page: page, 
                    pageSize: size ,
                    keyword: search}
                }
            );

            setAppointmentList(response.data.appointmentList);
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
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
        fetchAllAppointments(1, 10, searchWord);
    }, []);

    useEffect(() => {
        console.log(AppointmentList);
        setCurrentList(AppointmentList);
    }, [AppointmentList])

    useEffect(() => {
        console.log("Current List: ", currentList)
    }, [currentList])

    useEffect(() => {
        fetchAllAppointments(1, 10, searchWord);
    }, [searchWord])

    useEffect(() => {
        fetchAllAppointments(currentPage, 10, searchWord);
    }, [currentPage])

    const handleCancelAppt = async (id) => {
        try {
            const response = await axios.put(`https://cleanez-api.vercel.app/api/admin/markAppointmentAsCancelled/${id}`);

            console.log(response);
        } catch (e) {
            console.log(e)
        } finally {
            fetchAllAppointments(1, 10, searchWord);
        }
    }

    const handleCompleteAppt = async (id) => {
        try {
            const response = await axios.put(`https://cleanez-api.vercel.app/api/admin/markAppointmentAsComplete/${id}`);

            console.log(response);
        } catch (e) {
            console.log(e)
        } finally {
            fetchAllAppointments(1, 10, searchWord);
        }
    }

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
                            
                        {isLoading ? 
                        <tr>
                            <td colSpan="6"><LoadingScreen3/></td> 
                        </tr>
                         :
                        currentList?.map((appt, index) => (
                            <tr 
                            key={index} 
                            className="dashboard-tbody-tr"
                            onClick={(e) => {
                                navigate(appt.appointmentId);
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
                                {(appt.appointmentStatus === "Scheduled" && appt.paymentStatus === "Pending") ?
                                    <div className="check-cross-actions">
                                        <SVGIcons 
                                        selected="circleCheck"
                                        size="20px"
                                        color="#06E36D"
                                        onClick={(e) => handleCompleteAppt(appt.appointmentId)}/>
                                        <SVGIcons 
                                        selected="circleCross"
                                        size="20px"
                                        color="#CC3363"
                                        onClick={(e) => handleCancelAppt(appt.appointmentId)}/>
                                    </div> :
                                    <></>
                                }
                                </td>
                            </tr> 
                        ))
                        }
                       
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