import {useState, useEffect } from "react";
import SVGIcons from "../../SVGIcons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminAppointments = () => {
    const navigate = useNavigate();
    
    const [allAppointmentList, setAppointmentList] = useState([]);
    const [currentList, setCurrentList] = useState([]);

    const fetchAllAppointments = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/admin/getAppointments`);

            console.log(response)
        } catch (e) {
            console.log(e);
        }
        
    }

    useEffect(() => {
        fetchAllAppointments();
    }, []);

    return (  
        <>
        </>
    );
}
 
export default AdminAppointments;