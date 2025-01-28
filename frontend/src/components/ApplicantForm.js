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
            const response = await axios.get(`http://localhost:5000/api/appointment/getSpecificService/${service}`, {
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

export {PersonalInfo, ServiceInfo /*, FileSubmission*/};