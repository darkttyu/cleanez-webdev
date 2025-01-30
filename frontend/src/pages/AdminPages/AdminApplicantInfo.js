import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SVGIcons from '../../SVGIcons'

const AdminApplicantInfo = () => {
    let { id } = useParams();
    const navigate = useNavigate();

    const fetchApplicantInfo = async () => {
        try {
            console.log(id);
            const response = await axios.get(`http://localhost:5000/api/admin/getApplicant/${id}`)

            console.log(response.data);
        } catch (e) {
            console.log(e)
            navigate('/admin/applicants');
        }
    }
    
    useEffect(() => {
        fetchApplicantInfo();
    }, [])
    
    return (  
        <></>
    );
}
 
export default AdminApplicantInfo;