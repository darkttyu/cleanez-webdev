import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SVGIcons from '../../SVGIcons'

const AdminAppointmentInfo = () => {
    let { id } = useParams();

    const navigate = useNavigate();

    const [appointmentInfo, setAppointmentInfo] = useState(null);

    const fetchAppointmentInfo = async () => {
        try {
            const response = await axios.get(`https://cleanez-api.vercel.app/api/admin/getAppointment/${id}`);

            console.log(response.data.appointment);
            setAppointmentInfo(response.data.appointment);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchAppointmentInfo();
    }, [])

    return (  
        <div className="schedule-page">
        {appointmentInfo ? 
            <>
                <section className="schedule-container">
                    <h2>Appointment Details</h2>
                    <div className="appointment-container" id="service-inputs">
                        <div className="appointment-inputs grid-3">
                            {/* FIRST NAME */}
                            <div className="basic-input-container">
                                <label className="basic-label compact" >
                                    First Name
                                </label>
                                <input 
                                className="input-bar no-logo" 
                                type="text"  
                                value={appointmentInfo.customerFirstName}
                                disabled/>
                            </div>
                            
                            {/* LAST NAME */}
                            <div className="basic-input-container">
                                <label className="basic-label compact" >
                                    Last Name
                                </label>
                                <input 
                                className="input-bar no-logo" 
                                type="text"  
                                value={appointmentInfo.customerLastName}
                                disabled/>
                            </div>
                            
                            {/* PHONE NUMBER */}
                            <div className="basic-input-container">
                                <label className="basic-label compact" >
                                    Phone Number
                                </label>
                                <input 
                                className="input-bar no-logo" 
                                type="text"  
                                value={`+63 ${appointmentInfo.phoneNumber}`}
                                disabled/>
                            </div>
                            
                            {/* SERVICE CATEGORY */}
                            <div className="basic-input-container">
                                <label className="basic-label compact" >
                                    Service Category
                                </label>
                                <input 
                                className="input-bar no-logo " 
                                type="text"  
                                value={appointmentInfo.serviceCategory}
                                disabled/>
                            </div>
                            
                            {/* AREA ASSIGNED */}
                            <div className="basic-input-container">
                                <label className="basic-label compact" >
                                    Area Assigned
                                </label>
                                <input 
                                className="input-bar no-logo" 
                                type="text"  
                                value={appointmentInfo.areaAssigned}
                                disabled/>
                            </div>
                            
                            {/* SERVICE COST */}
                            <div className="basic-input-container">
                                <label className="basic-label compact" >
                                    Service Cost
                                </label>
                                <input 
                                className="input-bar no-logo" 
                                type="text"  
                                value={appointmentInfo.serviceCost}
                                disabled/>
                            </div>
                        </div>
                        <div className="appointment-inputs grid-2">
                            {/* DATE */}
                            <div className="basic-input-container">
                                <label className="basic-label compact" >
                                    Date
                                </label>
                                <input 
                                className="input-bar no-logo" 
                                type="text"  
                                value={appointmentInfo.appointmentDate}
                                disabled/>
                            </div>
                            
                            {/* TIME */}
                            <div className="basic-input-container">
                                <label className="basic-label compact" >
                                    Time
                                </label>
                                <input 
                                className="input-bar no-logo" 
                                type="text"  
                                value={appointmentInfo.appointmentTime}
                                disabled/>
                            </div>
                            
                            {/* BLOCK */}
                            <div className="basic-input-container">
                                <label className="basic-label compact" >
                                    Block / No. / Street
                                </label>
                                <input 
                                className="input-bar no-logo" 
                                type="text"  
                                value={appointmentInfo.address.block}
                                disabled/>
                            </div>
                            
                            {/* BARANGAY */}
                            <div className="basic-input-container">
                                <label className="basic-label compact" >
                                    Barangay
                                </label>
                                <input 
                                className="input-bar no-logo" 
                                type="text"  
                                value={appointmentInfo.address.barangay}
                                disabled/>
                            </div>
                            
                            {/* MUNICIPALITY */}
                            <div className="basic-input-container">
                                <label className="basic-label compact" >
                                    Municipality
                                </label>
                                <input 
                                className="input-bar no-logo" 
                                type="text"  
                                value={appointmentInfo.address.municipal}
                                disabled/>
                            </div>
                            
                            {/* PROVINCE */}
                            <div className="basic-input-container">
                                <label className="basic-label compact" >
                                    Province
                                </label>
                                <input 
                                className="input-bar no-logo" 
                                type="text"  
                                value={appointmentInfo.address.province}
                                disabled/>
                            </div>
                        </div>      
                    </div>
                </section>
                <section className="schedule-container">
                    <h2>Assigned Workers</h2>
                    <table className="dashboard-list-table">
                        <thead className="dashboard-thead">
                            <tr>
                                <th className="dashboard-th tb-left">Name</th>
                            </tr>
                        </thead>
                        <tbody>
                        {appointmentInfo.assignedWorkers.map((worker, index) => (
                            <tr 
                            key={index} 
                            className="dashboard-tbody-tr">
                                <td className="dashboard-tbody-td tb-left">
                                    {worker}
                                </td>
                            </tr> 
                        ))}
                            
                    
                        </tbody>
                    </table>
                </section>
                <div className="appointment-buttons">
                    <button 
                    type="button"
                    className="appointment-return"
                    onClick={(e) => {navigate('/admin/appointments');}}>
                        <SVGIcons
                        selected="previousArrow"
                        size="36px"
                        color="#222222"/>
                    </button>                    
                </div>
            </> : 
            <></>
        }
            
        </div>
    );
}
 
export default AdminAppointmentInfo;