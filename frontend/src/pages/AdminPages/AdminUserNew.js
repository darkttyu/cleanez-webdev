import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SVGIcons from '../../SVGIcons'


const AdminUserNew = () => {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState(null);
    const [newUserInfo, setNewUserInfo] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchUserInfo = async () => {
        try {
            console.log(id);
            const response = await axios.get(`http://localhost:5000/api/admin/clickedUser/${id}`)

            console.log(response.data.user);
            setUserInfo(response.data.user);
        } catch (e) {
            console.log(e)
            navigate('/admin/users');
        }
    }
    
    useEffect(() => {
        fetchUserInfo();
    }, [])

    const handleSave = async (id) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/admin/editUserInfo/${id}`,
                newUserInfo,
                {
                    headers: {'Content-Type': 'application/json'}
                }
            );

            console.log(response);

            setNewUserInfo(null);
            fetchUserInfo();
        } catch (e) {
            console.log(e)
        }
    }

    const showActionButtons = () => {
        return (
            <>
                <button 
                className="act-btn cancel"
                onClick={(e) => {navigate('/admin/users')}}>
                    Cancel
                </button>
                <button 
                className="act-btn complete"
                onClick={(e) => handleSave(userInfo.userId)}>
                    Save
                </button>
            </>
        )
    }

    return (  
        <div className="schedule-page">
        {userInfo ? 
            <div className="schedule-container">
                <h2>User Data</h2>
                <div className="schedule-inputs" id="service-inputs">
                    {/* FIRST NAME */}
                    <div className="profile-input-container">
                        <label className="profile-label" >
                            First Name
                        </label>
                        <input 
                        className="input" 
                        type="text"  
                        value={(newUserInfo) ? newUserInfo.firstName : userInfo.firstName}
                        onChange={(e) => {
                            setNewUserInfo({
                                ...newUserInfo,
                                firstName: e.target.value
                            })
                        }}/>
                    </div>

                    {/* LAST NAME */}
                    <div className="profile-input-container">
                        <label className="profile-label" >
                            Last Name
                        </label>
                        <input 
                        className="input" 
                        type="text" 
                        value={(newUserInfo) ? newUserInfo.lastName : userInfo.lastName}
                        onChange={(e) => {
                            setNewUserInfo({
                                ...newUserInfo,
                                lastName: e.target.value
                            })
                        }}/>
                    </div>
                                                
                    {/* BIRTHDAY */}
                    <div className="profile-input-container">
                        <label className="profile-label" >
                            Birthdate
                        </label>
                        <input 
                        className="input" 
                        type="text" 
                        value={userInfo.birthDate}/>
                    </div>
                                       
                    {/* GENDER */}
                    <div className="profile-input-container">
                        <label className="profile-label" >
                            Gender
                        </label>
                        <input 
                        className="input" 
                        type="text" 
                        value={userInfo.gender}/>
                    </div>
                                       
                    {/* PHONE NUMBER */}
                    <div className="profile-input-container">
                        <label className="profile-label" >
                            Phone Number
                        </label>
                        <input 
                        className="input" 
                        type="text" 
                        value={userInfo.phoneNumber}/>
                    </div>
                                     
                    {/* EMAIL */}
                    <div className="profile-input-container">
                        <label className="profile-label" >
                            Email Address
                        </label>
                        <input 
                        className="input" 
                        type="text" 
                        value={userInfo.email}/>
                    </div>
                                  
                    {/* BLOCK */}
                    <div className="profile-input-container">
                        <label className="profile-label" >
                            Block / No. / Street
                        </label>
                        <input 
                        className="input" 
                        type="text" 
                        value={userInfo.address.block}/>
                    </div>
                    
                    {/* PROVINCE */}
                    <div className="profile-input-container">
                        <label className="profile-label" >
                            Province
                        </label>
                        <input 
                        className="input" 
                        type="text" 
                        value={userInfo.address.province}/>
                    </div>

                    {/* MUNICIPALITY */}
                    <div className="profile-input-container">
                        <label className="profile-label" >
                            Municipality
                        </label>
                        <input 
                        className="input" 
                        type="text" 
                        value={userInfo.address.municipal}/>
                    </div>

                    {/* BARANGAY */}
                    <div className="profile-input-container">
                        <label className="profile-label" >
                            Barangay
                        </label>
                        <input 
                        className="input" 
                        type="text" 
                        value={userInfo.address.barangay}/>
                    </div>
                </div>
                <div className="appointment-buttons">
                    {isSubmitting ?
                        <></> :
                        <div className="appointment-actions">
                            {showActionButtons()}
                        </div>
                    }
                    
                </div>
            </div> :
            <></>
        }
                

        </div>
    );
}
 
export default AdminUserNew;