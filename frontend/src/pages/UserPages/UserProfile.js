import { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";
import header from "../../images/assets/bg-signing-nograin.svg"
import {regions, provinces, cities, barangays} from "select-philippines-address";
import axios from "axios";

const UserProfile = () => {
    const { user, setUser } = useAuth();
    
    const [userChanges, setUserChanges] = useState({...user})

    const [profileURL, setProfileURL] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    // --- Address Variables
    const [regionData, setRegionData] = useState([]);
    const [provinceData, setProvinceData] = useState([]);
    const [municipalData, setMunicipalData] = useState([]);
    const [barangayData, setBarangayData] = useState([]);
    
    const [selectedProv, setSelectedProv] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedBrgy, setSelectedBrgy] = useState('0');
    
    useEffect(() => {
        console.log(user);
        const dataType = user.profilePicture.contentType
        const binaryData = new Uint8Array(user.profilePicture.data.data);
        const base64String = btoa(String.fromCharCode(...binaryData));

        setProfileURL(`data:${dataType};base64,${base64String}`)
        
    }, [user])

    // Functions --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    // --- Fetches Region Data everytime the page is loaded/refereshed.
    useEffect(() => {
        const fetchRegion = async () => {
            try {
                const response = await regions();
                setRegionData(response);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        }
        fetchRegion();
    }, []);

    // --- Fetches all Provinces
    useEffect(() => {
        const listAllProvince = async () => {
            const allProvinces = []
    
            for (const item of regionData) {
                try {
                    const provincesForRegion = await provinces(item.region_code);
                    allProvinces.push(...provincesForRegion);
                } catch (error) {
                    console.error(`Error fetching provinces for ${item.region_name}`, error);
                }
            }
            allProvinces.sort((a,b) => a.province_name.localeCompare(b.province_name));

            setProvinceData(allProvinces);
        };

        if (regionData.length > 0) {
            listAllProvince();
        }
    }, [regionData]); 

    // --- Fetches Municipality based on Province on Change
    const listMunicipalities = (province) => {
        const code = province.slice(0,4)
        cities(code).then((res) => {
            setMunicipalData(res);
        });
    }
    // --- Fetches Barangay based on Municipality on Change
    const listBarangays = (municipal) => {
        const code = municipal.slice(0,6)
        barangays(code).then((res) => {
            setBarangayData(res);
        });
    }

    // --- Sets Autofill of Province, Municipal and Barangay on DOM Load
    // --- --- Province
    useEffect(() => {
        provinceData.forEach((p, index) => {
            if (p.province_name === user.address.province) {
                const provinceValue = p.province_code + p.province_name;
                listMunicipalities(provinceValue);
                setSelectedProv(provinceValue);
                setUserChanges({
                    ...userChanges,
                    address: {
                        ...userChanges.address,
                        province: p.province_name
                    }
                });
            }
        })
    }, [provinceData]);
    // --- --- Municipal
    useEffect(() => { 
        setSelectedCity('0');
        setSelectedBrgy('0');
        setBarangayData([]);

        municipalData.forEach((m, index) => {
            if (m.city_name === user.address.municipal) {
                const municipalValue = m.city_code + m.city_name;
                listBarangays(municipalValue);
                setSelectedCity(municipalValue);
                setUserChanges({
                    ...userChanges,
                    address: {
                        ...userChanges.address,
                        municipal: m.city_name
                    }
                });
            }
        })
  
    }, [municipalData]);
    // --- --- Barangay
    useEffect(() => {
        barangayData.forEach((b, index) => {
            if (b.brgy_name === user.address.barangay) {
                const barangayValue = b.brgy_code + b.brgy_name;
                setSelectedBrgy(barangayValue);
                setUserChanges({
                    ...userChanges,
                    address: {
                        ...userChanges.address,
                        barangay: b.brgy_name
                    }
                });
            }
        })
    }, [barangayData]);
    
    const editProfile = () => {
        setIsDisabled(!isDisabled);
    }

    const updateAccountInformation = async () => {
        try {
            const updateResponse = await axios.put(`http://localhost:5000/api/auth/editAccountInformation`, userChanges, {
                headers: { 'Content-Type': 'application/json' }
              });

            console.log(updateResponse)
            
        // --- --- Failed Update Account Information
        } catch (error) {
            console.log(error)
        }
        
    }

    const saveProfile = (option) => {
        setIsDisabled(!isDisabled);

        if (option === 1) {
            console.log("cancelled");
            setUserChanges({...user});
        } else if (option == 2) {
            updateAccountInformation();
        }
    }

    return (  
        <div className="profile-page">
            <img src={header} alt="" className="profile-header"/>

            <div className="profile-main">
                <div className="profile-image-text">
                    <img src={profileURL} alt="" className="profile-image"/>
                    <div className="profile-text">
                        <p className="profile-name">{user.firstName} {user.lastName}</p>
                        <div className="profile-edit-options">
                        {isDisabled ? (
                            <button 
                            className="profile-edit"
                            onClick={editProfile}>
                                Edit Profile
                            </button>
                        ):(
                            <>
                                <button
                                className="profile-cancel"
                                onClick={(e) => saveProfile(1)}>
                                    Cancel
                                </button>
                                <button
                                className="profile-save"
                                onClick={(e) => saveProfile(2)}>
                                    Save
                                </button>
                            </>
                        )}
                        </div>
                    </div>
                </div>
                
                <hr />

                <section className="profile-information">
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
                        value={userChanges.birthDate.slice(0, 10)}
                        onChange={(e) => {
                            setUserChanges({
                                ...userChanges,
                                birthDate: e.target.value
                            })
                        }}
                        disabled={isDisabled}
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
                        value = {userChanges.gender}
                        id="gender-input" 
                        onChange={(e) => {
                            setUserChanges({
                                ...userChanges,
                                gender: e.target.value
                            })
                        }}
                        disabled={isDisabled}
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
                        value={userChanges.phoneNumber}
                        onChange={(e) => {
                            setUserChanges({
                                ...userChanges,
                                phoneNumber: e.target.value
                            })
                        }}
                        disabled={isDisabled}
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
                        value={userChanges.email}
                        onChange={(e) => {
                            setUserChanges({
                                ...userChanges,
                                email: e.target.value
                            })
                        }}
                        disabled={isDisabled}
                        id="email-input" />
                    </div> 

                    {/* Block No. */}
                    <div className="profile-input-container">
                        {/* LABEL HERE */}
                        <label 
                        className="profile-label" 
                        htmlFor="address-input">
                            Block / No. / Street
                        </label>
                        {/* INPUT HERE */}
                        <input 
                        className="input" 
                        type="text" 
                        placeholder="Block / No. / Street" 
                        name="block"
                        value={userChanges.address.block} 
                        onChange={(e) => {
                            setUserChanges({
                                ...userChanges,
                                address: {
                                    ...userChanges.address,
                                    block: e.target.value
                                }
                            })
                        }}
                        disabled={isDisabled}
                        id="address-input" />
                    </div> 

                    {/* Province */}
                    <div className="profile-input-container">
                        <label className="profile-label" htmlFor="address-input">
                            Province
                        </label>
                        <select 
                            className="input" 
                            name="province" 
                            value = {selectedProv}
                            id="province-input" 
                            onChange={(e) => {
                                listMunicipalities(e.target.value)
                                setUserChanges({
                                    ...userChanges,
                                    address: {
                                        ...userChanges.address,
                                        province: e.target.value.slice(0, 4)
                                    }
                                })    
                            }}
                            disabled={isDisabled}
                        >
                            {/* SELECT OPTIONS */}
                            <option value="0">Select Province</option>
                            {provinceData.map((p, index) => (
                                <option 
                                    key={index} 
                                    value={p.province_code + p.province_name}
                                >
                                    {p.province_name}
                                </option>
                            ))}
                        </select>
                    </div> 

                    {/* Municipality */}
                    <div className="profile-input-container">
                        {/* LABEL HERE */}
                        <label 
                        className="profile-label" 
                        htmlFor="address-input">
                            Municipal
                        </label>
                        {/* INPUT HERE */}
                        <select 
                        className="input" 
                        type="text" 
                        name="municipal"
                        value= {selectedCity}
                        id="municipality-input"
                        onChange={(e) => {
                            listBarangays(e.target.value)
                            setUserChanges({
                                ...userChanges,
                                address: {
                                    ...userChanges.address,
                                    municipality: e.target.value.slice(0, 6)
                                }
                            })   
                        }}
                        disabled={isDisabled}
                        >
                            {/* SELECT OPTIONS */}
                            <option value="0">Select Municipality</option>
                            {municipalData.map((m, index) => (
                                <option 
                                key={index} 
                                value={m.city_code + m.city_name}
                            >
                                {m.city_name}
                            </option>
                            ))}
                        </select>
                    </div> 

                    {/* Barangay */}
                    <div className="profile-input-container">
                        {/* LABEL HERE */}
                        <label 
                        className="profile-label" 
                        htmlFor="address-input">
                            Barangay
                        </label>
                        {/* INPUT HERE */}
                        <select 
                        className="input" 
                        type="text" 
                        name="barangay" 
                        value={selectedBrgy}
                        id="barangay-input"
                        onChange={(e) => {
                            setUserChanges({
                                ...userChanges,
                                address: {
                                    ...userChanges.address,
                                    barangay: e.target.value.slice(0, 9)
                                }
                            })   
                        }}
                        disabled={isDisabled}
                        >
                            {/* SELECT OPTIONS */}
                            <option value="0">Select Barangay</option>
                            {barangayData.map((b, index) => (
                                <option 
                                    key={index} 
                                    value={b.brgy_code + b.brgy_name}
                                >
                                    {b.brgy_name}
                                </option>
                            ))}
                        </select>
                    </div> 
                </section>
            </div>
        </div>
    );
}
 
export default UserProfile;