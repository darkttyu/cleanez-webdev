import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminApplicants = () => {
    const [allApplicantList, setAllApplicantList] = useState([]);
    const [currentList, setCurrentList] = useState([])

    const navigate = useNavigate();

    const fetchAllApplicants = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/admin/getAllApplicants`);

            setAllApplicantList(response.data.applicants)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchAllApplicants();
    }, [])

    useEffect(() => {
        console.log("All Applicant List: ", allApplicantList);
        setCurrentList(allApplicantList);
    }, [allApplicantList])

    useEffect(() => {
        console.log("Current List: ", currentList)
    }, [currentList])

    const handleSearch = (search) => {
        setCurrentList(allApplicantList.filter((applicant) => 
            applicant.firstName.toLowerCase().includes(search.toLowerCase()) || 
            applicant.lastName.toLowerCase().includes(search.toLowerCase())
        ));
    };


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
                    onChange={(e) => handleSearch(e.target.value)}/>
                </div>
                <div className="dashboard-list-container">
                    <table className="dashboard-list-table">
                        <thead className="dashboard-thead">
                            <tr>
                                <th className="dashboard-th tb-left">First Name</th>
                                <th className="dashboard-th tb-left">Last Name</th>
                                <th className="dashboard-th tb-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {currentList.map((applicant, index) => (
                            <tr 
                            key={index} 
                            className="dashboard-tbody-tr"
                            onClick={(e) => {navigate(`${applicant._id}`)}}>
                                <td className="dashboard-tbody-td tb-left">{applicant.firstName}</td>
                                <td className="dashboard-tbody-td tb-left">{applicant.lastName}</td>
                                <td className="dashboard-tbody-td tb-center">
                                    <div className={`dashboard-status 
                                        ${String(applicant.applicationDetails.applicationStatus).toLowerCase()}`}>
                                            {applicant.applicationDetails.applicationStatus}
                                    </div>
                                </td>
                            </tr> 
                        ))}
                            
                       
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
 
export default AdminApplicants;