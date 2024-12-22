import {useState, useEffect} from "react";
import {regions, provinces, cities, barangays} from "select-philippines-address";
import SVGIcons from "../../SVGIcons";
import SigningPanel from "../../components/SigningPanel";
import axios from 'axios';
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
import { Link } from "react-router-dom";

const SignupPanel = () => {
    const [regionData, setRegionData] = useState([]);
    const [provinceData, setProvinceData] = useState([]);
    const [municipalData, setMunicipalData] = useState([]);
    const [barangayData, setBarangayData] = useState([]);

    //Fetches Region Data everytime the page is loaded/refereshed.
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

    //Fetches all Provinces
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

    //Fetches Municipality based on Province
    const listMunicipalities = (province) => {
        const code = province.slice(0,4)
        // console.log(code);
        cities(code).then((res) => {
            setMunicipalData(res);
        });
    }

    //Fetches Barangay based on Municipality
    const listBarangays = (municipal) => {
        const code = municipal.slice(0,6)
        // console.log(code);
        barangays(code).then((res) => {
            setBarangayData(res);
        });
    }

    const [isMoved, setIsMoved] = useState(false);

    const handleMove = () => {
        setIsMoved((prev) => !prev)
    }

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

    const handleSignUp = (e) => {
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

    const handleSignUpSubmission = async (e) => {
        e.preventDefault();

        try {
            const updatedSignUpData = {
                ...signUpData,
                address: {
                    ...signUpData.address,
                    province: signUpData.address.province.slice(4),  
                    municipal: signUpData.address.municipal.slice(6)
                }
            };

            const response = await axios.post('http://localhost:5000/api/auth/signup', updatedSignUpData, {
                headers: { 'Content-Type': 'application/json' }
              });

            const result = await response.json();
            console.log("Passed Data: ", signUpData);
            console.log("SignUp Completed:", result);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    }
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
                                value={signUpData.address.province}
                                data={provinceData} 
                                selection={listMunicipalities}
                                onChange={handleSignUp}/>
                            <Municipality 
                                value={signUpData.address.municipal}
                                data={municipalData} 
                                selection={listBarangays}
                                onChange={handleSignUp}/>
                            <Barangay
                                value={signUpData.address.barangay}
                                onChange={handleSignUp}
                                data={barangayData}/>
                        </div>
                        {/* BUTTONS HERE */}
                        <div className="buttons">
                            <button className="prompt-btn" type="submit">Sign Up</button>
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
