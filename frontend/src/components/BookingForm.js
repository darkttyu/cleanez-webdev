// Import Statements --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
// --- Component Import/s
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
// --- React Import/s
import { useState, useEffect } from "react";
// --- Other/React Import/s
import {regions, provinces, cities, barangays} from "select-philippines-address";


// Personal Info Page Component --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
const PersonalInfo = ({user}) => {
    // Variables Initialization --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    // --- Address Variables
    const [regionData, setRegionData] = useState([]);
    const [provinceData, setProvinceData] = useState([]);
    const [municipalData, setMunicipalData] = useState([]);
    const [barangayData, setBarangayData] = useState([]);
    const [fullPersonalInfo, setFullPersonalInfo] = useState({
        customerFirstName: user.firstName,
        customerLastName: user.lastName,
        phoneNumber: user.phoneNumber,
        address: {
            block: user.address.block,
            province: '0',
            municipal: '0',
            barangay: '0'
        }
    })
    // --- Selected Address Variables

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
                setFullPersonalInfo({...fullPersonalInfo, address: {...fullPersonalInfo.address, province: provinceValue}});
            }
        })

    }, [provinceData]);
    // --- --- Municipal
    useEffect(() => { 
        municipalData.forEach((m, index) => {
            if (m.city_name === user.address.municipal) {
                const municipalValue = m.city_code + m.city_name;
                listBarangays(municipalValue);
                setFullPersonalInfo({...fullPersonalInfo, address: {...fullPersonalInfo.address, municipal: municipalValue}});
            }
        })
    }, [municipalData]);
    // --- --- Barangay
    useEffect(() => {
        barangayData.forEach((b, index) => {
            if (b.brgy_name === user.address.barangay) {
                const barangayValue = b.brgy_code + b.brgy_name;
                setFullPersonalInfo({...fullPersonalInfo, address: {...fullPersonalInfo.address, barangay: barangayValue}});
            }
        })
    }, [barangayData]);


    /* // Info Testing
    useEffect(() => {
        console.log(fullPersonalInfo);
    }, [fullPersonalInfo]);
    */

    // Page Render --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    return (  
        <div className="booking-page" id="personal-booking-page">
            <h2>Personal Information</h2>
            <div className="booking-grid col-three">
                <FirstName 
                    value={fullPersonalInfo.customerFirstName}
                    onChange={e => {
                        setFullPersonalInfo({...fullPersonalInfo, 
                                                customerFirstName: e.target.value})
                    }}    
                />
                <LastName 
                    value={fullPersonalInfo.customerLastName}
                    onChange={e => {
                        setFullPersonalInfo({...fullPersonalInfo, 
                                                customerLastName: e.target.value})
                    }}   
                />
                <Phone 
                    value={fullPersonalInfo.phoneNumber}
                    onChange={e => {
                        setFullPersonalInfo({...fullPersonalInfo, 
                                                phoneNumber: e.target.value})
                    }}   
                />
            </div>
            <h2>Address</h2>
            <div className="booking-grid col-two">
                <Address 
                    value={fullPersonalInfo.address.block}
                    onChange={e => {
                        setFullPersonalInfo({...fullPersonalInfo, 
                                                address: {...fullPersonalInfo.address, block: e.target.value}})
                    }}   
                />
                <Province
                    value={fullPersonalInfo.address.province}
                    data={provinceData} 
                    onChange={e => {
                        setFullPersonalInfo({...fullPersonalInfo, 
                            address: {...fullPersonalInfo.adress, province: e.target.value, municipal:'0', barangay:'0'}})
                        listMunicipalities(e.target.value);
                    }}/>
                <Municipality 
                    value={fullPersonalInfo.address.municipal}
                    data={municipalData} 
                    selection={listBarangays}
                    onChange={e => {
                        setFullPersonalInfo({...fullPersonalInfo, 
                            address: {...fullPersonalInfo.address, municipal: e.target.value, barangay:'0'}})
                        listBarangays(e.target.value);
                    }}/>
                <Barangay 
                    value={fullPersonalInfo.address.barangay}
                    data={barangayData}
                    onChange={e => {
                        setFullPersonalInfo({...fullPersonalInfo, 
                            address: {...fullPersonalInfo.address, barangay: e.target.value}})
                    }}/>
            </div>
        </div>
    );
}

// Service Booking Page Component --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
const ServiceBooking = ({retrieveServiceBooking, serviceList, user}) => {
    // Variables Initialization --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    // --- Service Details Variables
    const [areaDetails, setAreaDetails] = useState([]);
    const [workerNumbers, setWorkerNumbers] = useState([]);
    const [serviceBookingInfo, setServiceBookingInfo] = useState({
        serviceCategory: '0',
        sizeOfArea: '0',
        numberOfWorkers: '0'
    });

    // Functions --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    // --- Changes Other Inputs based on Selected Service Type
    const onServiceSelect = (type) => {
        setServiceBookingInfo({serviceCategory: type, sizeOfArea: '0', numberOfWorkers: '0'});
        // --- Resets both Area and Worker before proceeding
        setAreaDetails([]);
        setWorkerNumbers([]);
        
        if (type == 0) {
            return;
        }

        serviceList.forEach((service, index) => {
            if (service._id == type) {
                setAreaDetails(service.areaDetails);
                setWorkerNumbers(service.numberOfWorkers);
            }
        })
    }

    // --- Handles Area Size Selection
    const onAreaSelect = (type) => {
        setServiceBookingInfo({...serviceBookingInfo, sizeOfArea: type});
    }
    // --- Handles Worker Number Selection
    const onWorkersSelect = (type) => {
        setServiceBookingInfo({...serviceBookingInfo, numberOfWorkers: type});
    }

    // --- Pass Service Booking Information to Parent
    useEffect(() => {
        retrieveServiceBooking(serviceBookingInfo);
    }, [serviceBookingInfo]);


    // Page Render --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    return (
        <div className="booking-page" id="service-booking-page">
            <h2>Service</h2>
            <div className="booking-grid col-three">
                <ServiceType  
                data={serviceList} 
                onChange={onServiceSelect}
                value={serviceBookingInfo.serviceCategory}
                />
                <AreaSize  
                data={areaDetails} 
                onChange={onAreaSelect}
                value={serviceBookingInfo.sizeOfArea}
                />
                <WorkerNumbers  
                data={workerNumbers} 
                onChange={onWorkersSelect}
                value={serviceBookingInfo.numberOfWorkers}
                />
                {(serviceBookingInfo.serviceCategory === "677632fc3b59c8d153f11476")?
                (
                    <div className="text-container">
                        {/* INPUTS HERE */}
                        <input 
                        className="input" 
                        type="number" 
                        placeholder="Number of Windows" 
                        name="windowNumber" 
                        id="windownumber-input" />
                        {/* LABEL HERE */}
                        <label 
                        className="text-label" 
                        htmlFor="windownumber-input">
                            Number of Windows
                        </label>
                    </div> 
                ):
                (<></>)}
            </div>
        </div>
    )
}

// Schedule Booking Page Component --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
const Schedule = ({retrieveScheduleBooking, serviceBookingInfo, serviceList, user}) => {
    const [areaList, setAreaList] = useState([]);
    const [timeList, setTimeList] = useState([]);
    const [newTimeList, setNewTimeList] = useState([]);
    const [dateLimit, setDateLimit] = useState({
        minDate: '',
        maxDate: ''
    });
    const [scheduleBookingInfo, setScheduleBookingInfo] = useState({
        date: '',
        startTime: ''
    })

    // --- Sets the Current Date min and max input of date
    useEffect(() => {
        try {
            const today = new Date();

            const year = today.getFullYear();
            const month = String(today.getMonth()+1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            const max_year = String(today.getFullYear()+1);

            const minDate = `${year}-${month}-${day}`;
            const maxDate = `${max_year}-${month}-${day}`;

            setDateLimit({minDate: minDate, maxDate: maxDate});
            setScheduleBookingInfo({...this, date:minDate});
        } catch (e) {
            console.log(e);
        }
    }, []);

    // --- Lists all Area of a Selected Service
    useEffect(() => {
        ResetButtons();
        serviceList.forEach((service) => {
            if (service._id == serviceBookingInfo.serviceCategory) {
                setAreaList(service.areaDetails);
            }
        })
    }, [serviceBookingInfo.serviceCategory]);

    // --- Lists all Time of a Selected Area
    useEffect(() => {
        ResetButtons();
        areaList.forEach((area) => {
            if (area._id == serviceBookingInfo.sizeOfArea) {
                setTimeList(area.startTime);
            }
        })
    }, [serviceBookingInfo.sizeOfArea]);

    // --- Converts all Time to Readable Format
    useEffect(() => {
        const convertedTimeList = timeList.map((time) => {
            const hour = time.slice(0, 2);
            const minute = time.slice(2, 4);
            
            if (hour == 12) {
                return `${hour}:${minute} PM`;
            } else if (hour == 24) {
                return `${String((hour-12)).padStart(2,0)}:${minute} AM`;
            } else if (hour < 12) {
                return `${hour}:${minute} AM`;
            } else if (hour > 12) {
                return `${String((hour-12)).padStart(2,0)}:${minute} PM`;
            }
        })
        setNewTimeList(convertedTimeList);
    }, [timeList])

    // --- Handles Date Input
    const handleDateInput = (value) => {
        setScheduleBookingInfo({...scheduleBookingInfo, date: value})
    }

    // --- Handles Selection of Time
    const ResetButtons = () => {
        const buttons = document.querySelectorAll(".time-booking-button");
        buttons.forEach((button) => button.classList.remove('active'));
    }

    const handleTimeButtonClick = (e, value) => {
        setScheduleBookingInfo({...scheduleBookingInfo, startTime: value})
        ResetButtons();
        e.target.classList.add('active');
    }
    
    // --- Pass Scheduling Information to Parent
    useEffect(() => {
        retrieveScheduleBooking(scheduleBookingInfo)
    }, [scheduleBookingInfo])


    return (
        <div className="booking-page" id="schedule-booking-page">
            <h2>Schedule Your Appointment</h2>
            <div className="booking-grid col-three">
                <div className="input-container">
                    {/* LABEL HERE */}
                    <p className="basic-label">
                        Date
                    </p>
                    {/* INPUT HERE */}
                    <input 
                    value = {scheduleBookingInfo.date}
                    className="input" 
                    type="date" 
                    name="bookDate" 
                    onChange={(e) => handleDateInput(e.target.value)}
                    id="bookdate-input" 
                    min={dateLimit.minDate} 
                    max={dateLimit.maxDate}/>
                </div> 
                {(serviceBookingInfo.serviceCategory != 0 && serviceBookingInfo.sizeOfArea != 0) ?
                (<div className="time-input-container">
                    {/* LABEL HERE */}
                    <p className="basic-label">
                        Time 
                    </p>
                    <div className="time-booking-container">
                        {newTimeList.map((time, index) => (
                            <button 
                            type="button"
                            key={index} 
                            className="time-booking-button"
                            onClick={(e) => handleTimeButtonClick(e, timeList[index])}>
                                {time}
                            </button>
                        ))}
                    </div>
                </div>) : 
                (<></>)}
                
            </div>
        </div>
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