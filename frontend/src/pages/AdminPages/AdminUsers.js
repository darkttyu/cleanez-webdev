import {useState, useEffect } from "react";
import SVGIcons from "../../SVGIcons";
import axios from "axios";

const AdminUsers = () => {
    const [allUserList, setAllUserList] = useState([]);
    const [currentList, setCurrentList] = useState([])
    
    const fetchAllUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/admin/findAllUsers`, 
                {params: { 
                    page: 1, 
                    pageSize: 10 }
                }
            );

            setAllUserList(response.data.userList)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchAllUsers();
    }, [])

    useEffect(() => {
        console.log("All User List: ", allUserList);
        setCurrentList(allUserList);
    }, [allUserList])

    useEffect(() => {
        console.log("Current List: ", currentList)
    }, [currentList])

    const handleSearch = (search) => {
        setCurrentList(allUserList.filter((user) => 
            user.firstname.toLowerCase().includes(search.toLowerCase()) || 
        user.lastName.toLowerCase().includes(search.toLowerCase())
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
                                <th className="dashboard-th">Name</th>
                                <th className="dashboard-th">Address</th>
                                <th className="dashboard-th">Status</th>
                                <th className="dashboard-th">Verified</th>
                                <th className="dashboard-th">Last Logged In</th>
                                <th className="dashboard-th">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {currentList.map((user, index) => (
                            <tr 
                            key={index} 
                            className="dashboard-tbody-tr"
                            onClick={(e) => {}}>
                                <td className="dashboard-tbody-td">
                                    {user.firstname} {user.lastName}
                                </td>
                                <td className="dashboard-tbody-td">
                                    {user.address.barangay}, {user.address.municipal}, {user.userId.province} 
                                </td>
                                <td className="dashboard-tbody-td">
                                    <div className={`dashboard-status 
                                    ${String(user.status).toLowerCase()}`}>
                                        {user.status}
                                    </div>
                                </td>
                                    
                                <td className="dashboard-tbody-td">
                                {(user.isVerified) ? 
                                    <SVGIcons 
                                    selected="badgeVerified"
                                    size="24px"
                                    color="#06E36D"/> :
                                    <SVGIcons 
                                    selected="badgeNotVerified"
                                    size="24px"
                                    color="#CC3363"/>
                                }
                                </td>
                                <td className="dashboard-tbody-td">
                                    {user.lastLogin.replace(", ", " ")}
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
 
export default AdminUsers;