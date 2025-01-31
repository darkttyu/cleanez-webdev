import { useEffect, useState } from "react";
import SVGIcons from "../../SVGIcons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminApplicants = () => {
    const navigate = useNavigate();

    const [allApplicantList, setAllApplicantList] = useState([]);
    const [currentList, setCurrentList] = useState([])

    const [currentPage, setCurrentPage] = useState(1);

    const [searchWord, setSearchWord] = useState('');

    const fetchAllApplicants = async (page, size = 10, search = '') => {
        try {
            const response = await axios.get(`http://localhost:5000/api/admin/getAllApplicants`,
                {params: { 
                    page: page, 
                    pageSize: size ,
                    keyword: search}
                }
            );

            setAllApplicantList(response.data.applicants);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchAllApplicants(1, 10, searchWord);
    }, [])

    useEffect(() => {
        // console.log("All Applicant List: ", allApplicantList);
        setCurrentList(allApplicantList);
    }, [allApplicantList])

    useEffect(() => {
        // console.log("Current List: ", currentList)
    }, [currentList])

    const handlePages = (destination) => {
        if (destination === "next" && !(currentList.length === 0 || currentList.length < 10)) {
            setCurrentPage(currentPage + 1)
        } else if (destination === "prev" && currentPage != 1) {
            setCurrentPage( currentPage - 1)
        }
    }

    useEffect(() => {
        fetchAllApplicants(1, 10, searchWord);
    }, [searchWord])

    useEffect(() => {
        fetchAllApplicants(currentPage, 10, searchWord);
    }, [currentPage])


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
 
export default AdminApplicants;