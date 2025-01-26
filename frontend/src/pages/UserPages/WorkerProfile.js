// Import Statements --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
// --- Component Import/s
import header from "../../images/assets/bg-signing-nograin.svg"
// --- Other/React Import/s
import { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";
import {regions, provinces, cities, barangays} from "select-philippines-address";
import axios from "axios";


// Main Page Component --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
const WorkerProfile = () => {
    // --- Convert Binary Data to Profile URL
    const profileConvert = (profile) => {

        const binaryData = new Uint8Array(profile.data.data);
        const base64String = btoa(String.fromCharCode(...binaryData));

        return `data:image/jpeg;base64,${base64String}`;
    }

    // Variables Initialization --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    // --- Context Authenticator
    const { user, setUser } = useAuth();
    // --- Account Information
    const [accountInfo, setAccountInfo] = useState({...user})
    // --- Profile URL for loading current Profile Picture
    const [profileURL, setProfileURL] = useState(profileConvert(user.profilePicture));
    // --- Profile File Information
    const [profileFile, setProfileFile] = useState({});
    // --- Editing Mode Toggler
    const [isDisabled, setIsDisabled] = useState(true);
    // --- Address Variables
    const [regionData, setRegionData] = useState([]);
    const [provinceData, setProvinceData] = useState([]);
    const [municipalData, setMunicipalData] = useState([]);
    const [barangayData, setBarangayData] = useState([]);
    
    const [selectedProv, setSelectedProv] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedBrgy, setSelectedBrgy] = useState('0');
    
    
    // Functions  --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
    // --- Updates Profile Information on Load
    useEffect(() => {
        setAccountInfo({ ...user });
    }, [user]);
    

    // --- Fetches Address Data
    // --- --- Regions
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
    // --- --- Provinces
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
    // --- --- Municipalities
    const listMunicipalities = (province) => {
        const code = province.slice(0,4)
        cities(code).then((res) => {
            setMunicipalData(res);
        });
    }
    // --- --- Barangays
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
                setAccountInfo({
                    ...accountInfo,
                    address: {
                        ...accountInfo.address,
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
                setAccountInfo({
                    ...accountInfo,
                    address: {
                        ...accountInfo.address,
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
                setAccountInfo({
                    ...accountInfo,
                    address: {
                        ...accountInfo.address,
                        barangay: b.brgy_name
                    }
                });
            }
        })
    }, [barangayData]);
    
    // --- Toggles Editing Mode on Button Click
    const editProfile = () => {
        setIsDisabled(!isDisabled);
    }

    // --- Save or Cancel Profile Information on Button Click
    const saveProfile = (option) => {
        if (option === 1) {
            console.log("cancelled");
            setAccountInfo({...user});
            setProfileURL(profileConvert(user.profilePicture))
            setIsDisabled(!isDisabled);
        } else if (option === 2) {
            updateAccountInformation();
        }
    }

    // --- Creates Form
    const updateData = async (accInfo, profile) => {
        const form = new FormData();
        console.log(accInfo);

        form.append("accInfo", JSON.stringify(accInfo))
        
        if(profile){
            form.append("profile", profile)
        }
        
        return form;
    }

    // --- Updates Account Information
    const updateAccountInformation = async () => {
        try {
            const token = localStorage.getItem("token");
            
            const formData = await updateData(accountInfo, profileFile);

            const updateResponse = await 
            axios.put(`http://localhost:5000/api/worker/editWorkerAccountInformation`, 
                formData, 
                {
                    headers: { 
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            console.log(updateResponse);
            
            const getResponse = await axios.get(`http://localhost:5000/api/worker/getWorkerAccountInformation`,
                {
                    headers: { 
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            console.log(getResponse);
            setUser(getResponse.data.user);

            setIsDisabled(!isDisabled);
        // --- --- Failed Update Account Information
        } catch (error) {
            console.log(error)
        }
    }


    // Page Render --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    return (  
        <div className="profile-page">
            <img src={header} alt="" className="profile-header"/>

            <div className="profile-main">
                <div className="profile-image-text">
                    <div className="profile-image-container">
                        <img src={profileURL} alt="" className="profile-image"/>
                        {!isDisabled ? (
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
                        value={accountInfo.birthDate.slice(0, 10)}
                        onChange={(e) => {
                            setAccountInfo({
                                ...accountInfo,
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
                        value = {accountInfo.gender}
                        id="gender-input" 
                        onChange={(e) => {
                            setAccountInfo({
                                ...accountInfo,
                                gender: e.target.value
                            })
                        }}
                        disabled={isDisabled}
                        >
                            {/* SELECT OPTIONS */}
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Disclosed">Rather Not Say</option>
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
                        value={accountInfo.phoneNumber}
                        onChange={(e) => {
                            setAccountInfo({
                                ...accountInfo,
                                phoneNumber: e.target.value
                            })
                        }}
                        disabled={true}
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
                        value={accountInfo.email}
                        onChange={(e) => {
                            setAccountInfo({
                                ...accountInfo,
                                email: e.target.value
                            })
                        }}
                        disabled={true}
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
                        value={accountInfo.address.block} 
                        onChange={(e) => {
                            setAccountInfo({
                                ...accountInfo,
                                address: {
                                    ...accountInfo.address,
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
                                setAccountInfo({
                                    ...accountInfo,
                                    address: {
                                        ...accountInfo.address,
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
                            setAccountInfo({
                                ...accountInfo,
                                address: {
                                    ...accountInfo.address,
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
                            setAccountInfo({
                                ...accountInfo,
                                address: {
                                    ...accountInfo.address,
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
 
export default WorkerProfile;