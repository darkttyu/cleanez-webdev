import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {regions, provinces, cities, barangays} from "select-philippines-address";
import axios from "axios";
import SVGIcons from '../../SVGIcons'


const AdminUserNew = () => {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        birthDate: "",
        gender: "0",
        address: {
            block: "",
            province: "0",
            municipal: "0",
            barangay: "0"
        }
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isInfoEmpty,setIsInfoEmpty] = useState(true);

    const [regionData, setRegionData] = useState([]);
    const [provinceData, setProvinceData] = useState([]);
    const [municipalData, setMunicipalData] = useState([]);
    const [barangayData, setBarangayData] = useState([]);

    const [selectedProv, setSelectedProv] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedBrgy, setSelectedBrgy] = useState('0');

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
        setSelectedProv(province);
        setSelectedCity("0");
        setSelectedBrgy("0");
        setBarangayData([]);
        const code = province.slice(0,4)
        cities(code).then((res) => {
            setMunicipalData(res);
        });
    }
    // --- --- Barangays
    const listBarangays = (municipal) => {
        setSelectedCity(municipal);
        setSelectedBrgy("0");
        const code = municipal.slice(0,6)
        barangays(code).then((res) => {
            setBarangayData(res);
        });
    }

    useEffect(() => {
        if (userInfo.email.trim() !== '' &&
            userInfo.firstName.trim() !== '' &&
            userInfo.lastName.trim() !== '' &&
            userInfo.phoneNumber.trim() !== '' &&
            userInfo.birthDate.trim() !== '' &&
            userInfo.gender !== '0' &&
            userInfo.address.block.trim() !== '' &&
            selectedProv !== '0' &&
            selectedCity !== '0' &&
            selectedBrgy !== '0'
        ) {
            setIsInfoEmpty(false);
        } else {
            setIsInfoEmpty(true);
        }
    }, [userInfo])

    const areInputsValid = () => {
        const isFNameValid = /^[A-Za-z\s]+$/.test(userInfo.firstName);
        const isLNameValid = /^[A-Za-z\s]+$/.test(userInfo.lastName);
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email);
        const isPhoneValid = /^[0-9]{11}$/.test(userInfo.phoneNumber);

        return isFNameValid && isLNameValid && isEmailValid && isPhoneValid;
    }

    const handleCreate = async () => {
        try {
            setIsSubmitting(true);
            if (areInputsValid()){
                const response = await axios.post('http://localhost:5000/api/admin/addUser', userInfo);

                console.log(response);
            } else {
                throw new Error('Invalid Format of Inputs: Please check if the following prompts are in the correct format.');
            }     
        } catch (e) {
            console.log(e);
            setErrMessage(`${e.message? e.message : ''} Would you like to try again?`);
            setShowErrorModal(true);
        } finally {
            setIsSubmitting(true);
            setTimeout(() => {
                handleReset();
            })
        }
    }

    const handleReset = () => {
        setUserInfo({
            email: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            birthDate: "",
            gender: "0",
            address: {
                block: "",
                province: "0",
                municipal: "0",
                barangay: "0"
            }
        });
        setSelectedProv('0');
        setSelectedCity('0');
        setSelectedBrgy('0');
        setMunicipalData([]);
        setBarangayData([]);
    }

    const showActionButtons = () => {
        return (
            <>
                <button 
                className="act-btn cancel"
                onClick={handleReset}>
                    Reset
                </button>
                <button 
                className="act-btn complete"
                onClick={handleCreate}>
                    Save
                </button>
            </>
        )
    }

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errMessage, setErrMessage] = useState("");

    const handleContinue = () => {
        setShowErrorModal(false);
        setErrMessage(true);
    }

    const handleCancel = () => {
        navigate(`/admin/users`);
    }

    return (  
        <div className="schedule-page">
            {showErrorModal? 
                <PopupError 
                errTitle="Unable to Create a New User"
                errMessage={errMessage}
                buttons={[
                    {func: handleCancel, text: "Cancel", className: "red"},
                    {func: handleContinue, text: "Continue", className: "green"},
                ]}/> :
                <></>
            }
            <div className="schedule-container">
                <h2>Create a new User Data</h2>
                <div className="schedule-inputs" id="service-inputs">
                    {/* FIRST NAME */}
                    <div className="basic-input-container">
                        <label className="basic-label compact" htmlFor="firstname-input">
                            First Name
                        </label>
                        <input 
                        className="input-bar no-logo" 
                        type="text" 
                        placeholder="First Name" 
                        name="firstName" 
                        value={userInfo.firstName}
                        onChange={(e) => {
                            setUserInfo({
                                ...userInfo,
                                firstName: e.target.value
                            })
                        }}
                        id="firstname-input" />
                    </div>

                    {/* LAST NAME */}
                    <div className="basic-input-container">
                        <label className="basic-label compact" htmlFor="lastname-input">
                            Last Name
                        </label>
                        <input 
                        className="input-bar no-logo" 
                        type="text" 
                        placeholder="Last Name" 
                        name="lastName" 
                        value={userInfo.lastName}
                        onChange={(e) => {
                            setUserInfo({
                                ...userInfo,
                                lastName: e.target.value
                            })
                        }}
                        id="lasttname-input"/>
                    </div>
                                                
                    {/* BIRTHDAY */}
                    <div className="basic-input-container">
                        <label className="basic-label compact" htmlFor="birthdate-input">
                            Birthdate
                        </label>
                        <input 
                        className="input-bar no-logo" 
                        type="date" 
                        placeholder="Birthdate" 
                        name="birthDate" 
                        value={userInfo.birthDate}
                        onChange={(e) => {
                            setUserInfo({
                                ...userInfo,
                                birthDate: e.target.value
                            })
                         }}
                        id="birthdate-input" 
                        min="1860-01-01" 
                        max="2025-12-30"/>
                    </div>
                                       
                    {/* GENDER */}
                    <div className="basic-input-container">
                        <label className="basic-label compact" htmlFor="gender-input">
                            Gender
                        </label>
                        <SVGIcons 
                        className="select-arrow"
                        selected="inputArrow"
                        size="14px"
                        color="var(--monoc4-50)"/>
                        <select 
                        className="input-bar no-logo" 
                        name="gender" 
                        value = {userInfo.gender}
                        id="gender-input" 
                        onChange={(e) => { 
                            setUserInfo({
                                ...userInfo,
                                gender: e.target.value
                            })
                        }}
                        >
                            {/* SELECT OPTIONS */}
                            <option value="0">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Disclosed">Rather Not Say</option>
                        </select>
                    </div>
                                       
                    {/* PHONE NUMBER */}
                    <div className="basic-input-container">
                        <label className="basic-label compact" htmlFor="sms-input">
                            Phone Number
                        </label>
                        <SVGIcons 
                        className="input-logo"
                        selected="inputPhone"
                        size="20px"
                        color="var(--monoc4-50)"/>
                        <input 
                        className="input-bar with-logo" 
                        type="text" 
                        placeholder="Phone Number" 
                        name="phoneNumber"
                        value={userInfo.phoneNumber}
                        onChange={(e) => {
                            setUserInfo({
                                ...userInfo,
                                phoneNumber: e.target.value.trim()
                            })
                        }} 
                        id="sms-input"/>
                    </div>
                                     
                    {/* EMAIL */}
                    <div className="basic-input-container">
                        <label className="basic-label compact" htmlFor="mail-input">
                            Email Address
                        </label>
                        <SVGIcons 
                        className="input-logo"
                        selected="inputMail"
                        size="20px"
                        color="var(--monoc4-50)"/>
                        <input 
                        className="input-bar with-logo" 
                        type="text" 
                        placeholder="Email" 
                        name="email" 
                        value={userInfo.email}
                        onChange={(e) => { 
                            setUserInfo({
                                ...userInfo,
                                email: e.target.value.trim()
                            })
                        }}
                        id="mail-input"/>
                    </div>
                                  
                    {/* BLOCK */}
                    <div className="basic-input-container">
                        <label className="basic-label compact" htmlFor="address-input">
                            Block / No. / Street
                        </label>
                        <input 
                        className="input-bar no-logo" 
                        type="text" 
                        placeholder="Block / No. / Street" 
                        name="block"
                        value={userInfo.address.block} 
                        onChange={(e) => {
                            setUserInfo({
                                ...userInfo,
                                address: {
                                    ...userInfo.address,
                                    block: e.target.value
                                }
                            })
                        }}
                        id="address-input" />
                    </div>
                    
                    {/* PROVINCE */}
                    <div className="basic-input-container">
                        <label className="basic-label compact" htmlFor="province-input">
                            Province
                        </label>
                        <SVGIcons 
                        className="select-arrow"
                        selected="inputArrow"
                        size="14px"
                        color="var(--monoc4-50)"/>
                        <select 
                        className="input-bar no-logo" 
                        name="province" 
                        value = {selectedProv}
                        id="province-input" 
                        onChange={(e) => {
                            listMunicipalities(e.target.value)
                            setUserInfo({
                                ...userInfo,
                                address: {
                                    ...userInfo.address,
                                    province: e.target.value.slice(4)
                                }
                            })
                         }}>

                            <option value="0">Select Province</option>
                            {provinceData.map((p, index) => (
                            <option 
                            key={index} 
                            value={p.province_code + p.province_name}>
                                {p.province_name}
                            </option>
                            ))}

                        </select>
                    </div>

                    {/* MUNICIPALITY */}
                    <div className="basic-input-container">
                        <label className="basic-label compact" htmlFor="municipality-input">
                            Municipality
                        </label>
                        <SVGIcons 
                        className="select-arrow"
                        selected="inputArrow"
                        size="14px"
                        color="var(--monoc4-50)"/>
                        <select 
                        className="input-bar no-logo" 
                        type="text" 
                        name="municipal"
                        value= {selectedCity}
                        id="municipality-input"
                        onChange={(e) => { 
                            listBarangays(e.target.value)
                            setUserInfo({
                                ...userInfo,
                                address: {
                                    ...userInfo.address,
                                    municipal: e.target.value.slice(6)
                                }
                            })
                        }}>

                            <option value="0">Select Municipality</option>
                            {municipalData.map((m, index) => (
                            <option 
                            key={index} 
                            value={m.city_code + m.city_name}>
                                {m.city_name}
                            </option>
                            ))}

                        </select>
                    </div>

                    {/* BARANGAY */}
                    <div className="basic-input-container">
                        <label className="basic-label compact" htmlFor="barangay-input">
                            Barangay
                        </label>
                        <SVGIcons 
                        className="select-arrow"
                        selected="inputArrow"
                        size="14px"
                        color="var(--monoc4-50)"/>
                        <select 
                        className="input-bar no-logo" 
                        type="text" 
                        name="barangay" 
                        value={selectedBrgy}
                        id="barangay-input"
                        onChange={(e) => {
                            setSelectedBrgy(e.target.value);
                            setUserInfo({
                                ...userInfo,
                                address: {
                                    ...userInfo.address,
                                    barangay: (e.target.value.slice(9))
                                }
                            })
                        }}>

                            <option value="0">Select Barangay</option>
                            {barangayData.map((b, index) => (
                            <option 
                            key={index} 
                            value={b.brgy_code + b.brgy_name}>
                                {b.brgy_name}
                            </option>
                            ))}

                        </select>
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
                    {isInfoEmpty ?
                        <></> :
                        <div className="appointment-actions">
                            {showActionButtons()}
                        </div>
                    }
                    
                </div>
            </div> 
        </div>
    );
}
 
export default AdminUserNew;