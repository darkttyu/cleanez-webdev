import {useState, useEffect} from "react";
import {regions, provinces, cities, barangays} from "select-philippines-address";
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
    const listMunicipalities = (code) => {
        cities(code).then((res) => {
            setMunicipalData(res);
        });
    }

    //Fetches Barangay based on Municipality
    const listBarangays = (code) => {
        barangays(code).then((res) => {
            setBarangayData(res);
        })
    }

    const [isMoved, setIsMoved] = useState(false);

    const handleMove = () => {
        setIsMoved((prev) => !prev)
    }

    return (  
        <form className="prompt" method="POST" action="">
            {/* TOP HALF PROMPTS */}
            <div className="main-prompt">
                <div className={`prompt-pages ${isMoved ? 'moved':''}`}>
                    <div className="page">
                        <h2>SIGN UP</h2>
                        {/* INPUTS HERE */}
                        <div className="inputs">
                            <FirstName/>
                            <LastName/>
                            <Email/>
                            <Phone/>
                            <Password/> 
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
                            <Birthdate/>
                            <h3>GENDER</h3>
                            <Gender/>
                            <h3>ADDRESS</h3>
                            <Address/>
                            <Province 
                            data={provinceData} 
                            selection={listMunicipalities}/>
                            <Municipality 
                            data={municipalData} 
                            selection={listBarangays}/>
                            <Barangay 
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
                <p className="description">Already have an account? <a className="prompt-link" href="">Login.</a></p>
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
