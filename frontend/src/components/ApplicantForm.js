import {
    FirstName,
    LastName,
    Email,
    Phone,
    Address,
    Province,
    Municipality,
    Barangay,
    ServiceType,
    AreaSize,
} from "../components/inputs/index"
import SVGIcons from "../SVGIcons";
import errorLogo from "../images/logos/Logo-Error.svg"
// --- React Import/s
import { useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
// --- Other/React Import/s
import {regions, provinces, cities, barangays} from "select-philippines-address";
import axios from "axios";


const PersonalInfo = ({applicantInfo, setApplicantInfo, setIsInfoComplete}) => {
    // Variables Initialization --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    // --- Address Variables
    const [regionData, setRegionData] = useState([]);
    const [provinceData, setProvinceData] = useState([]);
    const [municipalData, setMunicipalData] = useState([]);
    const [barangayData, setBarangayData] = useState([]);

    const [selectedProv, setSelectedProv] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedBrgy, setSelectedBrgy] = useState('0');

    
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
            if (p.province_name === applicantInfo.address.province) {
                const provinceValue = p.province_code + p.province_name;
                listMunicipalities(provinceValue);
                setApplicantInfo({
                    ...applicantInfo, 
                    address: {
                        ...applicantInfo.address, 
                        province: p.province_name
                    }
                });   
                setSelectedProv(provinceValue);
            }
        })

    }, [provinceData]);
    // --- --- Municipal
    useEffect(() => { 
        setSelectedCity('0');
        setSelectedBrgy('0');
        setBarangayData([]);

        municipalData.forEach((m, index) => {
            if (m.city_name === applicantInfo.address.municipal) {
                const municipalValue = m.city_code + m.city_name;
                listBarangays(municipalValue);
                setApplicantInfo({
                    ...applicantInfo, 
                    address: {
                        ...applicantInfo.address, 
                        municipal: m.city_name
                    }
                });
                setSelectedCity(municipalValue);
            }
        })
  
    }, [municipalData]);
    // --- --- Barangay
    useEffect(() => {
        barangayData.forEach((b, index) => {
            if (b.brgy_name === applicantInfo.address.barangay) {
                const barangayValue = b.brgy_code + b.brgy_name;
                setApplicantInfo({
                    ...applicantInfo, 
                    address: {
                        ...applicantInfo.address, 
                        barangay: barangayValue.slice(9)
                    }
                });
                setSelectedBrgy(barangayValue);
            }
        })
    }, [barangayData]);

    //Verifies Booking Info
    useEffect(() => {
        if (!(applicantInfo.firstName === '') &&
            !(applicantInfo.lastName === '') &&
            !(applicantInfo.phoneNumber === '') &&
            !(applicantInfo.address.block === '') &&
            !(applicantInfo.address.province === '0' || applicantInfo.address.province === '') &&
            !(applicantInfo.address.municipal === '0' || applicantInfo.address.municipal === '') &&
            !(applicantInfo.address.barangay === '0' || applicantInfo.address.barangay === '')
        ) {
            console.log("Personal Information is Complete")
            console.log(applicantInfo);
            setIsInfoComplete(true);
        } else {
            console.log("Failed to retrieve Personal Information")
            setIsInfoComplete(false);
        }
    }, [applicantInfo]);

    // Page Render --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    return (  
        <div className="booking-page" id="personal-booking-page">
            <h2>Personal Information</h2>
            <div className="booking-grid col-two">
                <FirstName 
                    value={applicantInfo.firstName}
                    onChange={e => {
                        setApplicantInfo({
                            ...applicantInfo, 
                            firstName: e.target.value
                        })
                    }}    
                    disabled = {true}
                />
                <LastName 
                    value={applicantInfo.lastName}
                    onChange={e => {
                        setApplicantInfo({
                            ...applicantInfo, 
                            lastName: e.target.value
                        })
                    }}   
                    disabled = {true}
                />
                <Email
                    value={applicantInfo.email}
                    onChange={e => {
                        setApplicantInfo({
                            ...applicantInfo, 
                            email: e.target.value
                        })
                    }} 
                    disabled = {true}
                />
                <Phone 
                    value={applicantInfo.phoneNumber}
                    onChange={e => {
                        setApplicantInfo({
                            ...applicantInfo, 
                            phoneNumber: e.target.value
                        })
                    }}  
                    disabled = {true} 
                />
            </div>
            <h2>Address</h2>
            <div className="booking-grid col-two">
                <Address 
                    value={applicantInfo.address.block}
                    onChange={e => {
                        setApplicantInfo({
                            ...applicantInfo, 
                            address: {
                                ...applicantInfo.address,
                                block: e.target.value
                            }
                        });
                    }}   
                    disabled = {true}
                />
                <Province
                    value={selectedProv}
                    data={provinceData} 
                    onChange={e => {
                        setApplicantInfo({
                            ...applicantInfo, 
                            address: {
                                ...applicantInfo.address,
                                province: e.target.value.slice(4),
                                municipal: '0',
                                barangay:'0'
                            }
                            
                        })
                        listMunicipalities(e.target.value);
                        setSelectedProv(e.target.value);
                    }}
                    disabled = {true}
                    />
                <Municipality 
                    value={selectedCity}
                    data={municipalData} 
                    onChange={e => {
                        setApplicantInfo({
                            ...applicantInfo, 
                            address: {
                                ...applicantInfo.address, 
                                municipal: e.target.value.slice(6),
                                barangay:'0'
                            }
                        })
                        listBarangays(e.target.value);
                        setSelectedCity(e.target.value);
                    }}
                    disabled = {true}
                    />
                <Barangay 
                    value={selectedBrgy}
                    data={barangayData}
                    onChange={e => {
                        setApplicantInfo({
                            ...applicantInfo, 
                            address: {
                                ...applicantInfo.address,
                                barangay: e.target.value.slice(9)
                            }
                        })
                        setSelectedBrgy(e.target.value);
                    }}
                    disabled = {true}
                    />
            </div>
        </div>
    );
}
 
const ServiceInfo = ({applicantInfo, setApplicantInfo, setIsInfoComplete, serviceList}) => {
// Variables Initialization --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    // --- Service Details Variables
    const [areaList, setAreaList] = useState([]);

    // Functions --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    // Handles auto-fill
    useEffect(() => {
        const service = applicantInfo.serviceCategory;
        serviceList.forEach((s, index) => {
            if (s.serviceName === service) {
                fetchArea(s._id);
            }
        })
    }, [])


    // Fetch Area and Workers for selected Service
    const fetchArea = async (service) => {
        try {
            const response = await axios.get(`https://cleanez-api.vercel.app/api/appointment/getSpecificService/${service}`, {
                headers: { 
                    'Content-Type': 'application/json',
                }
            });
            setAreaList(response.data.data.areaDetails);
        // --- --- Failed Fetching
        } catch (error) {
            console.error(error);
        }
    }

    // Acts on selection of service
    const onServiceSelect = (service) => {
        setAreaList([]);

        serviceList.forEach((s, index) => {
            if (s.serviceName === service) {
                fetchArea(s._id);
            }
        })

        setApplicantInfo({
            ...applicantInfo,
            serviceCategory: service, 
            areaAssigned: '0'
        })
    }

    // Acts on selection of area
    const onAreaSelect = (area) => {
        setApplicantInfo({
            ...applicantInfo,
            areaAssigned: area
        })
    }

    // --- Pass Service Booking Information to Parent
    useEffect(() => {
        if (!(applicantInfo.serviceCategory === '0') &&
            !(applicantInfo.areaAssigned === '0') 
        ) { 
            console.log("Service Information and Pricing is Complete");
            console.log(applicantInfo);
            setIsInfoComplete(true);
        } else {
            console.log("Failed to Retrieve Service Information and Pricing");
            setIsInfoComplete(false);
        }
    }, [applicantInfo]);


    // Page Render --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    return (
        <div className="booking-page" id="service-booking-page">
            <h2>Service</h2>
            <div className="booking-grid col-two">
                <ServiceType  
                data={serviceList} 
                onChange={onServiceSelect}
                value={applicantInfo.serviceCategory}
                />
                <AreaSize  
                data={areaList} 
                onChange={onAreaSelect}
                value={applicantInfo.areaAssigned}
                />
            </div>
        </div>
    );
}

const FileSubmission = ({selectedFiles, setSelectedFiles, setIsInfoComplete}) => {
    // Variables Initialization --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    // --- Input Reference
    const inputRef = useRef();
     
    // --- Handle File Upload
    const handleOnChange = (event) => {
        const filesArray = Array.from(event.target.files);

        if (filesArray.length !== 3) {
            alert("You need to only select 3 files.");
            return;
        }
        
        let newFiles = { resume: null, ID1: null, ID2: null };

        filesArray.forEach((file) => {
            if (file.type === 'application/pdf' && !newFiles.resume) {
                newFiles.resume = file;
            } else if (
                (file.type === 'image/jpeg' || file.type === 'image/png') &&
                !newFiles.ID1
            ) {
                newFiles.ID1 = file;
            } else if (
                (file.type === 'image/jpeg' || file.type === 'image/png') &&
                !newFiles.ID2
            ) {
                newFiles.ID2 = file;
            }
        });

        console.log("New Files: ", newFiles);

        if (newFiles.resume && newFiles.ID1 && newFiles.ID2) {
            setSelectedFiles(newFiles);
        } else {
            alert("Please upload 1 PDF resume and 2 valid ID images (JPG/PNG).");
            setSelectedFiles({ resume: null, ID1: null, ID2: null });
        }
    }

    // --- File Reference
    const onChooseFile = () => {
        inputRef.current.click();
    }

    // --- File Type Icon Renderer
    const setFileTypeIcon = (type) => {
        const fileType = String(type);
        if (fileType === "application/pdf") {
            return (
                <SVGIcons 
                selected="filetypePDF"
                size="24px"
                color="#CC3363"/>
            )
            
        } else if (fileType === "image/png") {
            return (
                <SVGIcons 
                selected="filetypePNG"
                size="24px"
                color="#931FBE"/>
            )
        } else if (fileType === "image/jpeg") {
            return (
                <SVGIcons 
                selected="filetypeJPG"
                size="24px"
                color="#F9A024"/>
            )
        }
    }

    useEffect(() => {
        if (selectedFiles.resume && selectedFiles.ID1 && selectedFiles.ID2) {
            console.log("File Uploads are Complete")
            console.log(selectedFiles);
            setIsInfoComplete(true);
        } else {
            console.log("Failed to retrieve File Uploads")
            setIsInfoComplete(false);
        }
    }, [selectedFiles])

    return (
        <div className="booking-page" id="service-booking-page">
            <h2>Resume and Valid IDs</h2>
            <div className="booking-grid col-one">
                {/* Hidden Input Element */}
                <input 
                type="file" 
                ref={inputRef} 
                style={{display: "none"}} 
                accept="image/png, image/jpeg, application/pdf"
                onChange={handleOnChange} 
                multiple/>

                <button 
                className="application-file-btn" 
                type="button" 
                onClick={onChooseFile}>
                    <SVGIcons 
                    selected="uploadFile"
                    size="100px"
                    color="#06E36D"/>
                    <p><span>Click here</span> to upload your resume and (2) valid IDs or drag and drop your files.</p>
                    <p>Supported Format: PDF, JPG, PNG (maximum of 10 mb each)</p>
                </button>

                <div className="application-files">
                    {selectedFiles.resume ?
                        <div className="selected-file">
                            <div className="file-icon">
                                {setFileTypeIcon(selectedFiles.resume.type)}
                            </div>
                            <div className="file-text">
                                <p>{selectedFiles.resume.name}</p>
                                <p>{(selectedFiles.resume.size/(1024*1024)).toFixed(2)} mb</p>
                            </div>
                        </div> :
                        <></>
                    }
                    {selectedFiles.ID1 ?
                        <div className="selected-file">
                            <div className="file-icon">
                                {setFileTypeIcon(selectedFiles.ID1.type)}
                            </div>
                            <div className="file-text">
                                <p>{selectedFiles.ID1.name}</p>
                                <p>{(selectedFiles.ID1.size/(1024*1024)).toFixed(2)} mb</p>
                            </div>  
                        </div> :
                        <></>
                    }
                    {selectedFiles.ID2 ?
                        <div className="selected-file">
                            <div className="file-icon">
                                {setFileTypeIcon(selectedFiles.ID2.type)}
                            </div>
                            <div className="file-text">
                                <p>{selectedFiles.ID2.name}</p>
                                <p>{(selectedFiles.ID2.size/(1024*1024)).toFixed(2)} mb</p>
                            </div>
                            
                        </div> :
                        <></>
                    }
                </div>
            </div>
        </div>
    )
}

export {PersonalInfo, ServiceInfo, FileSubmission};