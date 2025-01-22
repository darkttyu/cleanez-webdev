import { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";
import header from "../../images/assets/bg-signing-nograin.svg"

const UserProfile = () => {
    const { user, setUser } = useAuth();
    
    const [profileURL, setProfileURL] = useState('');
    
    useEffect(() => {
        console.log(user);
        const dataType = user.profilePicture.contentType
        const binaryData = new Uint8Array(user.profilePicture.data.data);
        const base64String = btoa(String.fromCharCode(...binaryData));

        setProfileURL(`data:${dataType};base64,${base64String}`)
        
    }, [user])

    return (  
        <div>
            <img src={header} alt="" />
            <img src={profileURL} alt="" />
            <p>{user.firstName} {user.LastName}</p>
            
            {/* Birthday */}
            <div className="profile-input-container">
                {/* LABEL HERE */}
                <label 
                className="profile-label"
                htmlFor="birthdate-input">
                    Birthday
                </label>
                {/* INPUT HERE */}
                <input 
                className="input" 
                type="date" 
                placeholder="Birthdate" 
                name="birthDate" 
                value={user.birthDate.slice(0, 10)}
                onChange={(e) => {}}
                id="birthdate-input" 
                min="1860-01-01" 
                max="2025-12-30"/>
            </div> 
            {/* Gender */}
            <div className="profile-input-container">
                <label className="profile-label" htmlFor="gender-input">
                    Gender
                </label>
                <select 
                    className="input" 
                    name="gender" 
                    value = {user.gender}
                    id="gender-input" 
                    onChange={(e) => {}}
                >
                    {/* SELECT OPTIONS */}
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Discolsed">Rather Not Say</option>
                </select>
            </div> 
            {/* Phone Number */}
            <div className="profile-input-container">
                {/* LABEL HERE */}
                <label 
                className="profile-label"
                htmlFor="phone-input">
                    Phone Number
                </label>
                {/* INPUT HERE */}
                <input 
                className="input" 
                type="text" 
                placeholder="Phone Number" 
                name="phone" 
                value={user.phoneNumber}
                onChange={(e) => {}}
                id="phone-input" />
            </div> 
            {/* Email */}
            <div className="profile-input-container">
                {/* LABEL HERE */}
                <label 
                className="profile-label"
                htmlFor="email-input">
                    Email
                </label>
                {/* INPUT HERE */}
                <input 
                className="input" 
                type="email" 
                placeholder="Email" 
                name="email" 
                value={user.email}
                onChange={(e) => {}}
                id="email-input" />
            </div> 
        </div>
    );
}
 
export default UserProfile;