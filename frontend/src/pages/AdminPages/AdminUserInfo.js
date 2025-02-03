import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SVGIcons from '../../SVGIcons'

const AdminUserInfo = () => {
    // --- Convert Binary Data to Profile URL
    const profileConvert = (data) => {

        const binaryData = new Uint8Array(data);
        const base64String = btoa(String.fromCharCode(...binaryData));

        return `data:image/jpeg;base64,${base64String}`;
    }

    let { id } = useParams();
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState(null);
    const [newUserInfo, setNewUserInfo] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [profileURL, setProfileURL] = useState(null);
    const [profileFile, setProfileFile] = useState({});

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

    useEffect(() => {
        if (userInfo) {
            setProfileURL(profileConvert(userInfo.profilePicture.data.data));
            console.log(userInfo.role)
        }
    }, [userInfo])

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
        setProfileURL(profileConvert(userInfo.profilePicture.data.data));
        setNewUserInfo(null);
        setEditMode(false);
    }

    const updateData = async (accInfo, profile) => {
        const form = new FormData();
        form.append("accInfo", JSON.stringify(accInfo))
        
        if(profile){
            form.append("profile", profile)
        }
        
        console.log(accInfo);
        console.log(profile);

        return form;
    }

    const handleSave = async (id) => {
        try {
            setIsSubmitting(true);

            const formData = await updateData(newUserInfo, profileFile);

            const response = await axios.put(`http://localhost:5000/api/admin/editUserInfo/${id}`, formData);

            console.log(response);

            setEditMode(false);
            setNewUserInfo(null);
            fetchUserInfo();
        } catch (e) {
            console.log(e)
        } finally {
            setIsSubmitting(false);
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
                <div className="title-profile">
                    <div className="title-button">
                        <h2>User Data</h2>
                        {(userInfo.role !== "Worker") ?
                            <button 
                            type="button"
                            className="act-btn complete"
                            onClick={(e) => {navigate(`/admin/users/new-worker/${userInfo.userId}`)}}>
                                Turn user into a Worker
                            </button> :
                            <button 
                            type="button"
                            className="act-btn complete activated"
                            disabled>
                                User is already a Worker
                            </button> 
                        }
                    </div>

                    <div className="profile-image-container">
                        <img src={profileURL} alt="" className="profile-image"/>
                        {editMode ? (
                            <input type="file" 
                            accept="image/jpeg"
                            onChange={(e) => {
                                const file = e.target.files[0]
                                setProfileURL(URL.createObjectURL(file));
                                setProfileFile(file)
                            }}/>
                        ):(
                            <></>
                        )}
                    </div>
                </div>
                
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