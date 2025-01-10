import {
    FirstName,
    LastName,
    Phone,
    Address,
    Province,
    Municipality,
    Barangay,
    ServiceType,
    AreaSize,
    WorkerNumbers
} from "../components/inputs/index"
import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import {regions, provinces, cities, barangays} from "select-philippines-address";
import axios from "axios";

const PersonalInfo = () => {
    const {user} = useAuth();

    const [regionData, setRegionData] = useState([]);
    const [provinceData, setProvinceData] = useState([]);
    const [municipalData, setMunicipalData] = useState([]);
    const [barangayData, setBarangayData] = useState([]);

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
    // --- Fetches Municiplaity on DOM Load
    useEffect(() => {
        let province = "";
        provinceData.forEach((p, index) => {
            if (p.province_name == user.address.province){
                province = p.province_code + p.province_name;
                listMunicipalities(province);
            }
        })
    }, [provinceData])
    // --- Fetches Barangay on DOM Load
    useEffect(() => {
        let municipal = "";
        municipalData.forEach((m, index) => {
            if (m.city_name == user.address.municipal){
                municipal = m.city_code + m.city_name;
                listBarangays(municipal);
            }
        })
    }, [municipalData]);

    return (  
        <div className="booking-page">
            <h2>Personal Information</h2>
            <div className="booking-grid col-three">
                <FirstName value={user.firstName}/>
                <LastName value={user.lastName}/>
                <Phone value={user.phoneNumber}/>
            </div>
            <h2>Address</h2>
            <div className="booking-grid col-two">
                <Address value={user.address.block}/>
                <Province 
                    data={provinceData} 
                    selection={listMunicipalities}
                    onChange={e => {}}
                    selected={user.address.province}/>
                <Municipality 
                    data={municipalData} 
                    selection={listBarangays}
                    onChange={e => {}}
                    selected={user.address.municipal}/>
                <Barangay 
                    data={barangayData}
                    onChange={e => {}}
                    selected={user.address.barangay}/>
            </div>
        </div>
    );
}

const ServiceBooking = () => {
    const {user} = useAuth();

    const [serviceData, setServiceData] = useState([]);
    const [areaDetails, setAreaDetails] = useState([]);
    const [workerNumbers, setWorkerNumbers] = useState([]);

    // Fetches all Service Type Data
    useEffect(() => {
        const fetchServicesData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/appointment/getServices`, {
                    headers: { 'Content-Type': 'application/json' }
                });

                setServiceData(response.data.services);
            // --- --- Failed Login
            } catch (error) {
                console.error(error);
            }
        }

        fetchServicesData();
    }, []);

    // Sets Other Selection Options based on Service Type
    const onServiceSelect = (serviceType) => {
        if (serviceType == 0) {
            setAreaDetails([]);
            setWorkerNumbers([]);
        }

        serviceData.forEach((service) => {
            if (service._id === serviceType) {
                setAreaDetails(service.areaDetails);
                setWorkerNumbers(service.numberOfWorkers);
            }
        })

    }

    return (
        <div className="booking-page">
            <h2>Service</h2>
            <div className="booking-grid col-three">
                <ServiceType  
                data={serviceData} 
                selection={onServiceSelect}
                onChange={e => {}}
                />
                <AreaSize  
                data={areaDetails} 
                selection={e => {}}
                onChange={e => {}}
                />
                <WorkerNumbers  
                data={workerNumbers} 
                selection={e => {}}
                onChange={e => {}}
                />
            </div>
        </div>
    )
}
 
const Schedule = () => {
    return (
        <>
        </>
    )
}
 
const AvailableCleaners = () => {
    return (
        <>
        </>
    )
}
 
const Billing = () => {
    return (
        <>
        </>
    )
}
 

export {PersonalInfo, ServiceBooking, Schedule, AvailableCleaners, Billing};