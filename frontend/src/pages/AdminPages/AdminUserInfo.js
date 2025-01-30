import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SVGIcons from '../../SVGIcons'

const AdminUserInfo = () => {
    let { id } = useParams();
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState(null);
    const [newUserInfo, setNewUserInfo] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editMode, setEditMode] = useState(false);

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

    const handleEditMode = () => {
        setNewUserInfo({
            email: userInfo.email,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            address: {
                block: userInfo.address.block,
                province: userInfo.address.province,
                municipal: userInfo.address.municipal,
                barangay: userInfo.address.barangay
            },
            phoneNumber: userInfo.phoneNumber,
            gender: userInfo.gender,
            birthDate: userInfo.birthDate 
        });
        setEditMode(true);
    }

    const handleCancel = () => {
        setNewUserInfo(null);
        setEditMode(false);
    }

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
            setEditMode(false);
            fetchUserInfo();
        } catch (e) {
            console.log(e)
        }
    }

    const showActionButtons = () => {
        if (editMode) {
            return (
                <>
                    <button 
                    className="act-btn cancel"
                    onClick={handleCancel}>
                        Cancel
                    </button>
                    <button 
                    className="act-btn complete"
                    onClick={(e) => handleSave(userInfo.userId)}>
                        Save
                    </button>
                </>
            )
        } else {
            return (
                <button 
                    className="act-btn complete"
                    onClick={handleEditMode}>
                        Edit
                    </button>
            )
        }
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
                        disabled={!editMode}
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
                        disabled={!editMode}
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
                        value={userInfo.birthDate}
                        disabled/>
                    </div>
                                       
                    {/* GENDER */}
                    <div className="profile-input-container">
                        <label className="profile-label" >
                            Gender
                        </label>
                        <input 
                        className="input" 
                        type="text" 
                        value={userInfo.gender}
                        disabled/>
                    </div>
                                       
                    {/* PHONE NUMBER */}
                    <div className="profile-input-container">
                        <label className="profile-label" >
                            Phone Number
                        </label>
                        <input 
                        className="input" 
                        type="text" 
                        value={userInfo.phoneNumber}
                        disabled/>
                    </div>
                                     
                    {/* EMAIL */}
                    <div className="profile-input-container">
                        <label className="profile-label" >
                            Email Address
                        </label>
                        <input 
                        className="input" 
                        type="text" 
                        value={userInfo.email}
                        disabled/>
                    </div>
                                  
                    {/* BLOCK */}
                    <div className="profile-input-container">
                        <label className="profile-label" >
                            Block / No. / Street
                        </label>
                        <input 
                        className="input" 
                        type="text" 
                        value={userInfo.address.block}
                        disabled/>
                    </div>
                    
                    {/* PROVINCE */}
                    <div className="profile-input-container">
                        <label className="profile-label" >
                            Province
                        </label>
                        <input 
                        className="input" 
                        type="text" 
                        value={userInfo.address.province}
                        disabled/>
                    </div>

                    {/* MUNICIPALITY */}
                    <div className="profile-input-container">
                        <label className="profile-label" >
                            Municipality
                        </label>
                        <input 
                        className="input" 
                        type="text" 
                        value={userInfo.address.municipal}
                        disabled/>
                    </div>

                    {/* BARANGAY */}
                    <div className="profile-input-container">
                        <label className="profile-label" >
                            Barangay
                        </label>
                        <input 
                        className="input" 
                        type="text" 
                        value={userInfo.address.barangay}
                        disabled/>
                    </div>
                </div>
                <div className="appointment-buttons">
                    <button 
                    type="button"
                    className="appointment-return"
                    onClick={(e) => {navigate('/admin/users');}}>
                        <SVGIcons
                        selected="previousArrow"
                        size="36px"
                        color="#222222"/>
                    </button>
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
 
export default AdminUserInfo;