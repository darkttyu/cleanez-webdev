// Import Statements --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
// --- Component Import/s
import header from "../../images/assets/bg-signing-nograin.svg"
import SVGIcons from "../../SVGIcons";
// --- Other/React Import/s
import { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../AuthContext";
import {regions, provinces, cities, barangays} from "select-philippines-address";
import axios from "axios";

import PopupError from "../../components/PopupError";


import LoadingScreen2 from "../../components/LoadingScreen2";

// Main Page Component --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
const UserProfile = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    const inputRef = useRef();

    // Variables Initialization --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    // --- Account Information
    const [accountInfo, setAccountInfo] = useState(null)
    // --- Profile URL for loading current Profile Picture
    const [profileURL, setProfileURL] = useState(null);
    // --- Profile File Information
    const [profileFile, setProfileFile] = useState(null);
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
    

    const profileConvert = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        bytes.forEach(byte => binary += String.fromCharCode(byte));
        
        return `data:image/jpeg;base64,${btoa(binary)}`;
    };

    const fetchUserInfo = async () => {
        try {
            const token = localStorage.getItem("token");

            const getResponse = await 
            axios.get(`http://localhost:5000/api/user/getAccountInformation`, 
                {
                    headers: { 
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            setAccountInfo(getResponse.data.user);
        } catch (e) {

        }
    }

    // Loads Data on DOM Load
    useEffect(() => {
        document.title = 'CleanEZ | Profile'
        fetchUserInfo();
    }, [])
    
    useEffect(() => {
        const loadResources = async () => {
            await document.fonts.ready;

            const imageUrls = [header];
            const imagePromises = imageUrls.map((src) => {
                return new Promise((resolve) => {
                const img = new Image();
                img.src = src;
                img.onload = resolve;
                });
            });

            await Promise.all(imagePromises);

            setTimeout(() => {
                setFadeOut(true);

                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            }, 3000);

            
        };


        if (accountInfo && profileURL && regionData) {
            loadResources();
        }
    }, [accountInfo, profileURL, regionData])

    // Tracks Account Info Changes
    useEffect(() => {
        if (accountInfo) {
            setProfileURL(profileConvert(accountInfo.profilePicture.data.data));
            provinceAuto();
            municipalAuto();
            barangayAuto();
            console.log("UPDATED ACCOUNT INFO:", accountInfo);
        }
    }, [accountInfo])

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
        setSelectedCity('0');
        setSelectedBrgy('0');
        setBarangayData([]);
        const code = province.slice(0,4)
        cities(code).then((res) => {
            setMunicipalData(res);
        });
    }
    // --- --- Barangays
    const listBarangays = (municipal) => {
        setSelectedBrgy('0');
        const code = municipal.slice(0,6)
        barangays(code).then((res) => {
            setBarangayData(res);
        });
    }

    // --- Sets Autofill of Province, Municipal and Barangay on DOM Load
    const provinceAuto = () => {
        provinceData.forEach((p, index) => {
            if (p.province_name === accountInfo?.address.province) {
                const provinceValue = p.province_code + p.province_name;
                // console.log("Province Value: ", provinceValue);
                listMunicipalities(provinceValue);
                setSelectedProv(provinceValue);
            }
        })
    }

    const municipalAuto = () => {
        municipalData.forEach((m, index) => {
            if (m.city_name === accountInfo?.address.municipal) {
                const municipalValue = m.city_code + m.city_name;
                // console.log("Municipal Value: ", municipalValue);
                listBarangays(municipalValue);
                setSelectedCity(municipalValue);
            }
        })
    }

    const barangayAuto = () => {
        barangayData.forEach((b, index) => {
            if (b.brgy_name === accountInfo?.address.barangay) {
                const barangayValue = b.brgy_code + b.brgy_name;
                // console.log("Barangay Value: ", barangayValue);
                setSelectedBrgy(barangayValue);
            }
        })
    }

    // --- --- Province
    useEffect(() => {
        provinceAuto();
    }, [provinceData]);
    // --- --- Municipal
    useEffect(() => { 
        municipalAuto();
    }, [municipalData]);
    // --- --- Barangay
    useEffect(() => {
        barangayAuto();
    }, [barangayData]);

    
    const handleProfileClick = () => {
        inputRef.current.click()
    }

    const handleProfileChange = (event) => {
        const file = event.target.files[0]

        const imageURL = URL.createObjectURL(file);

        setProfileURL(imageURL);
        setProfileFile(file)
        
    }

    // --- Toggles Editing Mode on Button Click
    const editProfile = () => {
        setIsDisabled(!isDisabled);
    }

    // --- Cancel Button
    const handleCancel = () => {
        fetchUserInfo();
        setProfileURL(profileConvert(accountInfo.profilePicture.data.data))
        setProfileFile(null);
        setIsDisabled(!isDisabled);
        provinceAuto();
        municipalAuto();
        barangayAuto();

        if (inputRef.current) {
            inputRef.current.value = '';
        }

        setShowErrorModal(false);
        setErrMessage("");
    }

    const updateData = async (accInfo, profile) => {
        const form = new FormData();
        form.append("accInfo", JSON.stringify(accInfo))
        
        if(profile){
            form.append("profile", profile)
        }
        
        return form;
    }

    // -- Save Button
    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");
            const formData = await updateData(accountInfo, profileFile);

            if (accountInfo.address.province == "0" ||
                accountInfo.address.municipal == "0" ||
                accountInfo.address.barangay == "0" ||
                accountInfo.address.province == "" ||
                accountInfo.address.municipal == "" ||
                accountInfo.address.barangay == "") {
                    throw new Error("Empty prompts detected: Please fill out everything on the form.");
            }

            const updateResponse = await 
            axios.put(`http://localhost:5000/api/user/editAccountInformation`, 
                formData, 
                {
                    headers: { 
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            fetchUserInfo();
            setIsDisabled(!isDisabled);
        } catch (e) {
            console.log(e);
            setErrMessage(`${e.message? e.message : ''} Would you like to continue editing?`);
            setShowErrorModal(true);
        }
    }


    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errMessage, setErrMessage] = useState("");

    const handleContinue = () => {
        setShowErrorModal(false);
        setErrMessage("");
    }

    // Page Render --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    return (  
        <div className="profile-page">
            {showErrorModal? 
                <PopupError 
                errTitle="Unable to Save Profile"
                errMessage={errMessage}
                buttons={[
                    {func: handleCancel, text: "Cancel", className: "red"},
                    {func: handleContinue, text: "Continue", className: "green"},
                ]}/> :
                <></>
            }

            {isLoading? 
            <LoadingScreen2 fadeOut={fadeOut}/> :
            <>
            </>
            }

            {accountInfo ?
            <>
                <img src={header} alt="" className="profile-header"/>

                <div className="profile-main">
                    <div className="profile-image-text">
                        <div className="profile-image-container">
                            <input type="file" 
                            className="profile-upload-input"
                            accept="image/jpeg"
                            style={{display: "none"}} 
                            ref={inputRef}
                            onChange={handleProfileChange}/>
                            <img src={profileURL} alt="" className="profile-image"/>
                            {!isDisabled ? (
                                <button
                                className="profile-upload-button" 
                                type="button"
                                onClick={handleProfileClick}>
                                    <SVGIcons 
                                    selected="profileButton"
                                    size="60px"
                                    color="white"/>
                                </button>  
                            ):(
                                <></>
                            )}
                        </div>
                        <div className="profile-text">
                            <p className="profile-name">{accountInfo.firstName} {accountInfo.lastName}</p>
                            <div className="profile-edit-options">
                            {isDisabled ? (
                                <button 
                                className="profile-edit"
                                onClick={editProfile}>
                                    Edit Profile
                                    <SVGIcons 
                                    selected="buttonEdit"
                                    size="20px"
                                    color="var(--monoc4)"/>
                                </button>
                            ):(
                                <>
                                    <button
                                    className="profile-cancel"
                                    onClick={handleCancel}>
                                        Cancel
                                    </button>
                                    <button
                                    className="profile-save"
                                    onClick={handleSave}>
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
                        <div className="basic-input-container">
                            {/* LABEL HERE */}
                            <label 
                            className="basic-label compact"
                            htmlFor="birthdate-input">
                                Birthday
                            </label>
                            {/* INPUT HERE */}
                            <input 
                            className="input-bar no-logo" 
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
                        <div className="basic-input-container">
                            {/* LABEL HERE */}
                            <label 
                            className="basic-label compact"
                            htmlFor="phone-input">
                                Phone Number
                            </label>
                            {/* INPUT HERE */}
                            <input 
                            className="input-bar no-logo" 
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
                        <div className="basic-input-container">
                            {/* LABEL HERE */}
                            <label 
                            className="basic-label compact"
                            htmlFor="email-input">
                                Email
                            </label>
                            {/* INPUT HERE */}
                            <input 
                            className="input-bar no-logo" 
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
                        <div className="basic-input-container">
                            {/* LABEL HERE */}
                            <label 
                            className="basic-label compact" 
                            htmlFor="address-input">
                                Block / No. / Street
                            </label>
                            {/* INPUT HERE */}
                            <input 
                            className="input-bar no-logo" 
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
                        <div className="basic-input-container">
                            <label className="basic-label compact" htmlFor="address-input">
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
                                    setSelectedProv(e.target.value);
                                    listMunicipalities(e.target.value) 
                                    setAccountInfo({
                                        ...accountInfo,
                                        address: {
                                            ...accountInfo.address,
                                            province: e.target.value.slice(4),
                                            municipal: "0",
                                            barangay: "0"
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
                        <div className="basic-input-container">
                            {/* LABEL HERE */}
                            <label 
                            className="basic-label compact" 
                            htmlFor="address-input">
                                Municipal
                            </label>
                            <SVGIcons 
                            className="select-arrow"
                            selected="inputArrow"
                            size="14px"
                            color="var(--monoc4-50)"/>
                            {/* INPUT HERE */}
                            <select 
                            className="input-bar no-logo" 
                            type="text" 
                            name="municipal"
                            value= {selectedCity}
                            id="municipality-input"
                            onChange={(e) => {
                                setSelectedCity(e.target.value);
                                listBarangays(e.target.value)
                                setAccountInfo({
                                    ...accountInfo,
                                    address: {
                                        ...accountInfo.address,
                                        municipal: e.target.value.slice(6),
                                        barangay: "0"
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
                        <div className="basic-input-container">
                            {/* LABEL HERE */}
                            <label 
                            className="basic-label compact" 
                            htmlFor="address-input">
                                Barangay
                            </label>
                            <SVGIcons 
                            className="select-arrow"
                            selected="inputArrow"
                            size="14px"
                            color="var(--monoc4-50)"/>
                            {/* INPUT HERE */}
                            <select 
                            className="input-bar no-logo" 
                            type="text" 
                            name="barangay" 
                            value={selectedBrgy}
                            id="barangay-input"
                            onChange={(e) => {
                                setSelectedBrgy(e.target.value);
                                setAccountInfo({
                                    ...accountInfo,
                                    address: {
                                        ...accountInfo.address,
                                        barangay: e.target.value.slice(9)
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
            </> :
            <></>
            }
            
        </div>
    );
}
 
export default UserProfile;