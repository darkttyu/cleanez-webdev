import { useEffect, useState } from "react";
import axios from "axios";

const AdminApplicants = () => {
    const [allApplicantList, setAllApplicantList] = useState([]);
    const [currentList, setCurrentList] = useState([])
    
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
                    className="question-searchbar"
                    name="question-searchbar" 
                    id="question-searchbar" 
                    onChange={(e) => handleSearch(e.target.value)}/>
                </div>
                <div className="dashboard-list-container">
                    <table className="dashboard-list-table">
                        <thead className="dashboard-thead">
                            <tr>
                                <th className="dashboard-th">First Name</th>
                                <th className="dashboard-th">Last Name</th>
                                <th className="dashboard-th">Resume</th>
                                <th className="dashboard-th">Status</th>
                                <th className="dashboard-th">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {currentList.map((applicant, index) => (
                            <tr 
                            key={index} 
                            className="dashboard-tbody-tr"
                            onClick={(e) => {}}>
                                <td className="dashboard-tbody-td">{applicant.firstName}</td>
                                <td className="dashboard-tbody-td">{applicant.lastName}</td>
                                <td className="dashboard-tbody-td">
                                    
                                </td>
                                <td className="dashboard-tbody-td">
                                    <div className={`dashboard-status 
                                        ${String(applicant.applicationDetails.applicationStatus).toLowerCase()}`}>
                                            {applicant.applicationDetails.applicationStatus}
                                    </div>
                                </td>
                                <td className="dashboard-tbody-td">

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