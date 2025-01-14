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
import SVGIcons from "../SVGIcons";
import errorLogo from "../images/logos/Logo-Error.svg"
// --- React Import/s
import { useState, useEffect, use} from "react";
import { useNavigate } from "react-router-dom";
// --- Other/React Import/s
import {regions, provinces, cities, barangays} from "select-philippines-address";
import axios from "axios";


// Personal Info Page Component --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
const PersonalInfo = ({retrievePersonalInfo, user}) => {
    // Variables Initialization --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    const navigate = useNavigate();
    // --- Address Variables
    const [regionData, setRegionData] = useState([]);
    const [provinceData, setProvinceData] = useState([]);
    const [municipalData, setMunicipalData] = useState([]);
    const [barangayData, setBarangayData] = useState([]);
    const [fullPersonalInfo, setFullPersonalInfo] = useState({
        customerFirstName: '',
        customerLastName: '',
        phoneNumber: '',
        address: {
            block: '',
            province: '0',
            municipal: '0',
            barangay: '0'
        }
    })
    // --- Selected Address Variables

    // Functions --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    // --- Checks if person is logged-in
    useEffect(() => {
        const validateAndRedirect = () => {
            try {
                if (
                    user.firstName 
                ) {
                    setFullPersonalInfo({
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
                } else {
                    throw new Error("Missing required fields");
                }
            } catch (e) {
                console.log("Validation failed, User not signed in: ", e.message);
                navigate('/login');
            }
        }

        validateAndRedirect();
    }, [])

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

    useEffect(() => {
        if (!(fullPersonalInfo.customerFirstName === '') &&
            !(fullPersonalInfo.customerLastName === '') &&
            !(fullPersonalInfo.phoneNumber === '') &&
            !(fullPersonalInfo.address.block === '') &&
            !(fullPersonalInfo.address.province === '0') &&
            !(fullPersonalInfo.address.municipal === '0') &&
            !(fullPersonalInfo.address.barangay === '0')
        ) {
            console.log("Succesfully Retrieved Personal Information")
            retrievePersonalInfo(fullPersonalInfo)
        } else {
            console.log("Failed to retrieve Personal Information")
        }
    }, [fullPersonalInfo]);

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
const ServiceBooking = ({retrieveServiceBooking, retrieveFinalPrice, serviceList, user}) => {
    // Variables Initialization --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    // --- Service Details Variables
    const [areaDetails, setAreaDetails] = useState([]);
    const [workerNumbers, setWorkerNumbers] = useState([]);
    const [servicePrices, setServicePrices] = useState([]);
    const [windowNumber, setWindowNumber] = useState(1);
    const [basePrice, setBasePrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    const [serviceBookingInfo, setServiceBookingInfo] = useState({
        serviceCategory: '0',
        sizeOfArea: '0',
        numberOfWorkers: 0
    });

    // Functions --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    // --- Changes Other Inputs based on Selected Service Type
    const onServiceSelect = (type) => {
        setServiceBookingInfo({serviceCategory: type, sizeOfArea: '0', numberOfWorkers: 0});
        // --- Resets both Area and Worker before proceeding
        setServicePrices([])
        setAreaDetails([]);
        setWorkerNumbers([]);
        setBasePrice(0);
        setFinalPrice(0)
        setWindowNumber(1);
        
        if (type == 0) {
            return;
        }

        serviceList.forEach((service, index) => {
            if (service.serviceName == type) {
                setServicePrices(service.price);
                setAreaDetails(service.areaDetails);
                setWorkerNumbers(service.numberOfWorkers);
            }
        })
    }

    // --- Handles Area Size Selection
    const onAreaSelect = (type) => {
        setBasePrice(0);
        setFinalPrice(0)
        setWindowNumber(1);
        
        if (type == 0) {
            setBasePrice('0')
        }
        
        areaDetails.forEach((area, index) => {
            if (area.sizeOfArea === type) {
                setBasePrice(servicePrices[index]);
                setFinalPrice(servicePrices[index]);
            }
        })

        setServiceBookingInfo({...serviceBookingInfo, sizeOfArea: type});
    }
    // --- Handles Worker Number Selection
    const onWorkersSelect = (type) => {
        const convertedType = parseInt(type);
        setServiceBookingInfo({...serviceBookingInfo, numberOfWorkers: convertedType});
    }
    // --- Handles Window Number Change
    const onWindowChange = (value) => {
        setWindowNumber(value);
    }
    useEffect(() => {
        setFinalPrice(basePrice*windowNumber);
    }, [windowNumber])

    // --- Pass Service Booking Information to Parent
    useEffect(() => {
        if (!(serviceBookingInfo.serviceCategory === '0') &&
            !(serviceBookingInfo.sizeOfArea === '0') &&
            !(serviceBookingInfo.numberOfWorkers === 0)
        ) { 
            console.log("Successfully Retrieved Service Information")
            retrieveServiceBooking(serviceBookingInfo);
        } else {
            console.log("Failed to Retrieve Service Information")
        }
    }, [serviceBookingInfo]);

    // --- Pass Final Price to Parent
    useEffect(() => {
        retrieveFinalPrice(finalPrice);
    }, [finalPrice])


    // Page Render --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    return (
        <div className="booking-page" id="service-booking-page">
            <h2>Service</h2>
            <p className="subheading">
                    Estimated Price: <strong>Php {
                        finalPrice 
                    }.00</strong>
            </p>
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
                {(serviceBookingInfo.serviceCategory === "Window Cleaning")?
                (
                    <div className="text-container">
                        {/* INPUTS HERE */}
                        <input 
                        className="input" 
                        type="number" 
                        value={windowNumber}
                        placeholder="Number of Windows" 
                        name="windowNumber" 
                        id="windownumber-input" 
                        min="1"
                        onChange={(e) => {onWindowChange(e.target.value)}}/>
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
            const day = String(today.getDate()+1).padStart(2, '0');
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
        const selectedService = serviceList.find(
            (service) => service.serviceName === serviceBookingInfo.serviceCategory
        );
    
        if (selectedService) {
            const filteredArea = selectedService.areaDetails.find(
                (area) => area.sizeOfArea === serviceBookingInfo.sizeOfArea
            );
            setAreaList(selectedService.areaDetails || []);
            setTimeList(filteredArea ? filteredArea.startTime || [] : []);
        }
    }, [serviceBookingInfo]);
    
    useEffect(() => {
        console.log("Area of Size Changed!")
    }, [serviceBookingInfo.sizeOfArea])

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
        if (!(scheduleBookingInfo.date === '') &&
            !(scheduleBookingInfo.startTime === '')
        ){
            retrieveScheduleBooking(scheduleBookingInfo);
        } else {
            console.log("Failed to retrieve Schedule Booking");
        }
            
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
                    // min={dateLimit.minDate} 
                    max={dateLimit.maxDate}/>
                </div> 
                {(timeList.length > 0) ?
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
 
// Cleaners Booking Page Component --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
const AvailableCleaners = ({retrieveCleanersBooking, availWorkerIdentifier, user}) => {
    const [workersList, setWorkersList] = useState([]);
    const [responseSuccess, setResponseSuccess] = useState(false);
    const [workerNumbers, setWorkerNumbers] = useState('0');
    const [selectedWorkers, setSelectedWorkers] = useState([]);
    const [errorMessage, setErrorMessage] = useState({
        status: '',
        message: ''
    })

    // --- Fetches Available Worker
    useEffect(() => {
        setWorkerNumbers(parseInt(availWorkerIdentifier.serviceDetails.numberOfWorkers));
        setSelectedWorkers([]);
        
        const fetchAvailableWorkers = async () => {
            // --- --- Successfull Fetching
            try {
                const response = await axios.post(`http://localhost:5000/api/appointment/getAvailableWorkers`, availWorkerIdentifier, {
                    headers: { 'Content-Type': 'application/json' }
                  });
                  
                if (response.status == 200) {
                    setWorkersList(response.data.workers);
                    setResponseSuccess(true);
                }
            // --- --- Failed Fetching
            } catch (error) {
                setResponseSuccess(false);
                if(error.response.status == 404 || error.response.status == 400){
                    setErrorMessage({
                        status: `Error ${error.response.status}`,
                        message: String(error.response.data.message)
                    })
                } else {
                    setErrorMessage({
                        status: 'Unknown Error',
                        message: 'Sorry for the inconvenience, an unknown error has occured. Please try again later.'
                    })
                }
            }
        }

        if (
            availWorkerIdentifier.serviceDetails.serviceCategory &&
            availWorkerIdentifier.serviceDetails.sizeOfArea &&
            availWorkerIdentifier.scheduleDetails.date &&
            availWorkerIdentifier.scheduleDetails.startTime
        ) {
            fetchAvailableWorkers();
        }
    }, [availWorkerIdentifier])

    const workerSelect = (workerId, isSelected) => {
        if (isSelected) {
            setSelectedWorkers(selectedWorkers.filter((worker) => worker !== workerId))
        }  else if (selectedWorkers.length != workerNumbers) {
            setSelectedWorkers([...selectedWorkers, workerId]);
        }
    }

    useEffect(() => {
        if (selectedWorkers.length == workerNumbers){
            retrieveCleanersBooking(selectedWorkers);
        }
    }, [selectedWorkers])
    
    return (
        <div className="booking-page" id="cleaners-booking-page">
            <h2>Available Cleaners Need You</h2>
            <p className='subheading'>Please Choose [ <strong>{selectedWorkers.length}</strong> / <strong>{workerNumbers}</strong> ] Workers</p>
            <div className="avail-workers-list">
                {responseSuccess 
                    ? workersList.map((worker, index) => {
                        const isSelected = selectedWorkers.includes(worker._id);
                        return (
                            <div 
                            className={`avail-worker-container ${isSelected ? "selected" : ""}`}
                            key={index}
                            value={index}
                            onClick={() => workerSelect(worker._id, isSelected)}
                            >
                                <div className="information">
                                    <p className="name">{worker.userId}</p>
                                    <p className="location">Location: {}</p>
                                </div>
                                <div className="rating">
                                    <SVGIcons 
                                    selected="startRatingSolid" 
                                    size="24" 
                                    color="#06E36D"/>
                                    <p className="rating-number">{worker.rating}</p>
                                </div>
                                {!isSelected ? (
                                    <SVGIcons 
                                    selected="addButtonSolid" 
                                    size="24" 
                                    color="#60c36f"
                                    clipRule="evenodd"
                                    fillRule="evenodd"/>
                                ):(
                                    <SVGIcons 
                                    selected="removeButtonSolid" 
                                    size="24" 
                                    color="#4b4b4b"
                                    clipRule="evenodd"
                                    fillRule="evenodd"/>
                                )}
                                
                            </div>
                        );   
                    }) : (
                    <div className="worker-error-container">
                        <img className="worker-error-logo" src={errorLogo} alt="" />
                        <p className="worker-error-message">{errorMessage.status}: {errorMessage.message}</p>
                    </div>
                    )
                }
                
            </div>
        </div>
    )
}
 
const Review = ({bookingAppointmentInfo}) => {
    const [info, setInfo] = useState({
        customerFirstName: '',
        customerLastName: '',
        phoneNumber: '',
        address: {
            block: '',
            province: '',
            municipal: '',
            barangay: ''
        },
        serviceDetails: {
            serviceCategory: '',
            sizeOfArea: '',
            numberOfWorkers: 0
        },
        scheduleDetails: {
            date: '',
            startTime: ''
        },
        assignedWorkers: [],
        serviceCost: 0
    });

    useEffect(() => {
        try {
            if (bookingAppointmentInfo.address.block) {
                setInfo({...bookingAppointmentInfo});
            }
        } catch (e) {
            console.log(e);
        }
    }, [bookingAppointmentInfo]);

    return (
        <div className="booking-page" id="review-booking-page">
            <h2>Review and Confirm your Information</h2>
            <p className="subheading">
                By confirming, you will schedule the cleaning appointment in the system. Please ensure all information is accurate before proceeding.
            </p>
            <section className="review-information-container">
                <div className="review-info-line">
                    <p className="title">Full Name</p>
                    <div className="data">
                        <p>{info.customerFirstName} {info.customerLastName}</p>
                    </div>
                </div>
                <div className="review-info-line">
                    <p className="title">Phone Number</p>
                    <div className="data">
                        <p>{info.phoneNumber}</p>
                    </div>
                </div>
                <div className="review-info-line">
                    <p className="title">Address</p>
                    <div className="data">
                        <p>{info.address.block}</p>
                        <p>{info.address.barangay}, {info.address.municipal}, {info.address.province}</p>
                    </div>
                </div>
            </section>
            <h2>Appointment Details</h2>
            <section className="review-information-container">
                <div className="review-info-line">
                    <p className="title">Date</p>
                    <div className="data">
                        <p>{info.scheduleDetails.date}</p>
                    </div>
                </div>
                <div className="review-info-line">
                    <p className="title">Time</p>
                    <div className="data">
                        <p>{info.scheduleDetails.startTime}</p>
                    </div>
                </div>
                <div className="review-info-line">
                    <p className="title">Workers</p>
                    <div className="data">
                        {info.assignedWorkers.map((worker, index) => (
                            <p key={index}>{worker}</p>
                        ))}
                    </div>
                </div>
            </section>
            <h2>Service Details</h2>
            <section className="review-information-container">
                <div className="review-info-line">
                    <p className="title">Service</p>
                    <div className="data">
                        <p>{info.serviceDetails.serviceCategory}</p>
                    </div>
                </div>
                <div className="review-info-line">
                    <p className="title">Size of Area</p>
                    <div className="data">
                        <p>{info.serviceDetails.sizeOfArea}</p>
                    </div>
                </div>
                <hr />
                <div className="review-info-line price">
                    <p className="title">Total Cost</p>
                    <div className="data">
                        <p>&#8369;{info.serviceCost}</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export {PersonalInfo, ServiceBooking, Schedule, AvailableCleaners, Review};