import {useState, useEffect } from "react";
import SVGIcons from "../../SVGIcons";
import axios from "axios";

const AdminUsers = () => {
    const [allUserList, setAllUserList] = useState([]);
    const [currentList, setCurrentList] = useState([])
    
    const fetchAllUsers = async (page, size) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/admin/findAllUsers`, 
                {params: { 
                    page: page, 
                    pageSize: size }
                }
            );

            setAllUserList(response.data.userList)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchAllUsers(1, 10);
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
    
    const handleDeleteButton = async (id) => {
        console.log(id);
        try {
            const response = await axios.delete(`http://localhost:5000/api/admin/deleteUser/${id}`);

            console.log(response);

            fetchAllUsers(1, 10);
        } catch (e) {
            console.log(e);
        }
    }

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
                                <th className="dashboard-th tb-left">Name</th>
                                <th className="dashboard-th tb-left">Address</th>
                                <th className="dashboard-th tb-center">Status</th>
                                <th className="dashboard-th tb-center">Verified</th>
                                <th className="dashboard-th tb-center">Last Logged In</th>
                                <th className="dashboard-th tb-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {currentList.map((user, index) => (
                            <tr 
                            key={index} 
                            className="dashboard-tbody-tr"
                            onClick={(e) => {}}>
                                <td className="dashboard-tbody-td tb-left">
                                    {user.firstname} {user.lastName}
                                </td>
                                <td className="dashboard-tbody-td tb-left">
                                    {user.address.barangay}, {user.address.municipal}, {user.userId.province} 
                                </td>
                                <td className="dashboard-tbody-td tb-center">
                                    <div className={`dashboard-status 
                                    ${String(user.status).toLowerCase()}`}>
                                        {user.status}
                                    </div>
                                </td>
                                    
                                <td className="dashboard-tbody-td tb-center">
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
                                <td className="dashboard-tbody-td tb-center">
                                    {user.lastLogin.replace(", ", " ")}
                                </td>
                                <td className="dashboard-tbody-td tb-center">
                                    <SVGIcons 
                                    selected="trash"
                                    size="24px"
                                    color="#CC3363"
                                    onClick={(e) => {handleDeleteButton(user.userId)}}/>
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