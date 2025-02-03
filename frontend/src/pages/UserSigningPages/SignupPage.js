// Import Statements --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
// --- Component Import/s
import SVGIcons from "../../SVGIcons";
import SigningPanel from "../../components/SigningPanel";
import {
    FirstName,
    LastName,
    Email,
    Phone,
    Password,
    Birthdate,
    Gender,
    Address,
    Province,
    Municipality,
    Barangay,
} from "../../components/inputs";
// --- Other/React Import/s
import {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import {regions, provinces, cities, barangays} from "select-philippines-address";
import axios from "axios";
import { useAuth } from "../../AuthContext";

// Main Page Component --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
const SignupPanel = () => {
    // Variables Initialization --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    // --- Context Authenticator
    const {login} = useAuth();  
    // --- Navigation Variable 
    const navigate = useNavigate();
    // --- Address Variables
    const [regionData, setRegionData] = useState([]);
    const [provinceData, setProvinceData] = useState([]);
    const [municipalData, setMunicipalData] = useState([]);
    const [barangayData, setBarangayData] = useState([]);
    // --- Sign Up Data
    const [signUpData, setSignUpData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        birthDate: '',
        gender: '',
        address: {
            block:'',
            province: '',
            municipal: '',
            barangay: '',
        }
    });
    // --- Page Mover
    const [isMoved, setIsMoved] = useState(false);
    // --- Submit Button Disabler
    const [isDisabled, setIsDisabled] = useState(true);
    // --- Error Message Shower
    const [existingEmail, setExistingEmail] = useState("")
    // --- Empty Error Messages Array
    const [emptyErrorMessages, setEmptyErrorMessages] = useState("");


    // Functions  --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    // --- Fetches Region Data everytime the page is loaded/refereshed.
    useEffect(() => {
        const fetchRegion = async () => {
            try {
                const response = await regions();
                setRegionData(response);
                // console.log(setRegionData);
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
    // --- Fetches Municipality based on Province
    const listMunicipalities = (province) => {
        const code = province.slice(0,4)
        // console.log(code);
        cities(code).then((res) => {
            setMunicipalData(res);
        });
    }
    // --- Fetches Barangay based on Municipality
    const listBarangays = (municipal) => {
        const code = municipal.slice(0,6)
        // console.log(code);
        barangays(code).then((res) => {
            setBarangayData(res);
        });
    }
    // --- Checks if Inputs are Empty
    const areInputsEmpty = () => {
        const emptyErrors = [];

        const isFNameEmpty = signUpData.firstName.trim() === "" 
        const isLNameEmpty = signUpData.lastName.trim() === "";
        const isEmailEmpty = signUpData.email.trim() === "";
        const isPhoneEmpty = signUpData.phoneNumber.trim() === "";
        const isPasswordEmpty = signUpData.password.trim () === "";
        const isBirthdateEmpty = signUpData.birthDate.trim() === "";
        const isGenderEmpty = signUpData.gender.trim() === "";
        const isBlockEmpty = signUpData.address.block.trim() === "";
        const isProvinceEmpty = signUpData.address.province.trim() === "" || signUpData.address.province == 0;
        const isCityEmpty = signUpData.address.municipal.trim() === "" || signUpData.address.municipal == 0;
        const isBrgyEmpty = signUpData.address.barangay.trim() === "" || signUpData.address.barangay == 0;

        if (isFNameEmpty) emptyErrors.push("First Name");
        if (isLNameEmpty) emptyErrors.push("Last Name");
        if (isEmailEmpty) emptyErrors.push("E-mail");
        if (isPhoneEmpty) emptyErrors.push("Phone Number");
        if (isPasswordEmpty) emptyErrors.push("Password");
        if (isBirthdateEmpty) emptyErrors.push("Birthdate");
        if (isGenderEmpty) emptyErrors.push("Gender");
        if (isBlockEmpty) emptyErrors.push("Block/ No./ Street");
        if (isProvinceEmpty) emptyErrors.push("Province");
        if (isCityEmpty) emptyErrors.push("Municipality");
        if (isBrgyEmpty) emptyErrors.push("Barangay");

        setEmptyErrorMessages(emptyErrors.join(', '));
        
        return isFNameEmpty || isLNameEmpty || isEmailEmpty || isPhoneEmpty || isPasswordEmpty || isBirthdateEmpty || isGenderEmpty || isBlockEmpty || isProvinceEmpty || isCityEmpty || isBrgyEmpty;
    }
    // --- Checks if Inputs are Valid
    const areInputsValid = () => {
        const isFNameValid = /^[A-Za-z\s]+$/.test(signUpData.firstName);
        const isLNameValid = /^[A-Za-z\s]+$/.test(signUpData.lastName);
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpData.email);
        const isPhoneValid = /^[0-9]{11}$/.test(signUpData.phoneNumber);
        const isPasswordValid = (
            /^(?=.*[a-z]).*$/.test(signUpData.password) && 
            /^(?=.*[A-Z]).*$/.test(signUpData.password) &&
            /^(?=.*\d).*$/.test(signUpData.password) &&
            /^(?=.*[\W_]).*$/.test(signUpData.password) &&
            (signUpData.password.length >= 8)
        );

        return isFNameValid && isLNameValid && isEmailValid && isPhoneValid && isPasswordValid;
    }
    // --- Disables Button based on Inputs (Empty/Valid)
    useEffect(() => {
        setIsDisabled(!(!areInputsEmpty() && areInputsValid()));
    }, [signUpData]);
    // --- Moves Pages
    const handleMove = () => {
        setIsMoved((prev) => !prev)
    }
    // --- Saves Signup Data in each Input
    const handleSignUp = (e) => {
        setExistingEmail("");
        const {name, value} = e.target;
        if(name in signUpData.address) {
            setSignUpData({
                ...signUpData,
                address:{
                    ...signUpData.address,
                    [name]: value
                }
            });
        } else {
            setSignUpData({
                ...signUpData,
                [name]: value
            });
        }
    }

    // --- Verifies Signup Data after Submission
    const handleSignUpSubmission = async (e) => {
        e.preventDefault();
        // --- --- Successfull Login
        try {
            const updatedSignUpData = {
                ...signUpData,
                address: {
                    ...signUpData.address,
                    province: signUpData.address.province.slice(4),  
                    municipal: signUpData.address.municipal.slice(6),
                    barangay: signUpData.address.barangay.slice(9)
                }
            };
            const response = await axios.post('http://localhost:5000/api/auth/signup', updatedSignUpData, {
                headers: { 'Content-Type': 'application/json' }
              });

            // For Data Checking, Comment when Deploying
            console.log("Passed Data: ", signUpData); 
            console.log("SignUp Completed:", response.data);
            if (response.status === 201)  {
                login(response.data.user)
                navigate(`/signup/verify-email`);
            }    
        // --- --- Failed Login
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            if (error.response.status == 400)  {
                setIsMoved(false);
                setTimeout(() => {
                    setExistingEmail("show-error")
                }, 1000);
                
            }         
        }
    }

    
    // Page Render --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    return (  
        <form className="prompt" method="POST" onSubmit={handleSignUpSubmission}>
            {/* TOP HALF PROMPTS */}
            <div className="main-prompt">
                <div className={`prompt-pages ${isMoved ? 'moved':''}`}>
                    <div className="page">
                        <h2>SIGN UP</h2>
                        {/* INPUTS HERE */}
                        <div className="inputs">
                            <FirstName value={signUpData.firstName} onChange={handleSignUp}/>
                            <LastName value={signUpData.lastName} onChange={handleSignUp}/>
                            <Email value={signUpData.email} onChange={handleSignUp}/>
                            <Phone value={signUpData.phoneNumber} onChange={handleSignUp}/>
                            <Password value={signUpData.password} onChange={handleSignUp}/> 
                        </div>
                        {/* ERROR MESSAGES HERE */}
                        <p className={`${existingEmail} error-message`}>The email you have entered already exist. Please try a different one</p>
                        {/* NAVIGATION HERE */}
                        <a
                        className="next-btn right" 
                        onClick={handleMove}>
                            <p>Next</p>
                            <SVGIcons 
                            selected="forwardArrow" 
                            size="28"
                            color="#4B4B4B"/>
                        </a>
                    </div>
                    <div className="page">
                        {/* NAVIGATION HERE */}
                        <a
                        className="next-btn left" 
                        onClick={handleMove}>
                            <SVGIcons 
                            selected="previousArrow" 
                            size="28"
                            color="#4B4B4B"/>
                            <p>Go Back</p>
                        </a>
                        {/* INPUTS HERE */}
                        <div className="inputs">
                            <h3>BIRTHDATE</h3>
                            <Birthdate value={signUpData.birthDate} onChange={handleSignUp}/>
                            <h3>GENDER</h3>
                            <Gender value={signUpData.gender} onChange={handleSignUp}/>
                            <h3>ADDRESS</h3>
                            <Address value={signUpData.address.block} onChange={handleSignUp}/>
                            <Province 
                                value={(signUpData.address.province) ? signUpData.address.province : '0'}
                                data={provinceData} 
                                onChange={(e) => {
                                    listMunicipalities(e.target.value);
                                    handleSignUp(e);
                                }}/>
                            <Municipality 
                                value={signUpData.address.municipal}
                                data={municipalData} 
                                onChange={(e) => {
                                    listBarangays(e.target.value);
                                    handleSignUp(e);
                                }}/>
                            <Barangay
                                value={signUpData.address.barangay}
                                data={barangayData}
                                onChange={handleSignUp}
                                />
                        </div>
                        {/* BUTTONS HERE */}
                        <div className="buttons">
                            <button className="prompt-btn sign-up" type="submit" disabled={isDisabled}>Sign Up
                            </button>
                            <div className="empty-box">
                                <p>Please fill the following entry fields:</p>
                                <p>{emptyErrorMessages}</p>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* BOTTOM HALF PROMPTS */}
            <div className="external-prompt">
                <p className="description">Already have an account? <Link to="/login" className="prompt-link">Login.</Link></p>
            </div>
            
        </form>
    );
}

const SignupPage = () => {
    return (  
        <SigningPanel inputPanel={<SignupPanel/>}/>
    );
}
 
export default SignupPage;
