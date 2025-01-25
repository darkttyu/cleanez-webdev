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
import { useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
// --- Other/React Import/s
import {regions, provinces, cities, barangays} from "select-philippines-address";
import axios from "axios";


// Personal Info Page Component --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
const PersonalInfo = ({bookingInfo, setBookingInfo, setIsInfoComplete}) => {
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
            if (p.province_name === bookingInfo.address.province) {
                const provinceValue = p.province_code + p.province_name;
                listMunicipalities(provinceValue);
                setBookingInfo({
                    ...bookingInfo, 
                    address: {
                        ...bookingInfo.address, 
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
            if (m.city_name === bookingInfo.address.municipal) {
                const municipalValue = m.city_code + m.city_name;
                listBarangays(municipalValue);
                setBookingInfo({
                    ...bookingInfo, 
                    address: {
                        ...bookingInfo.address, 
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
            if (b.brgy_name === bookingInfo.address.barangay) {
                const barangayValue = b.brgy_code + b.brgy_name;
                setBookingInfo({
                    ...bookingInfo, 
                    address: {
                        ...bookingInfo.address, 
                        barangay: barangayValue.slice(9)
                    }
                });
                setSelectedBrgy(barangayValue);
            }
        })
    }, [barangayData]);

    //Verifies Booking Info
    useEffect(() => {
        if (!(bookingInfo.customerFirstName === '') &&
            !(bookingInfo.customerLastName === '') &&
            !(bookingInfo.phoneNumber === '') &&
            !(bookingInfo.address.block === '') &&
            !(bookingInfo.address.province === '0' || bookingInfo.address.province === '') &&
            !(bookingInfo.address.municipal === '0' || bookingInfo.address.municipal === '') &&
            !(bookingInfo.address.barangay === '0' || bookingInfo.address.barangay === '')
        ) {
            console.log("Personal Information is Complete")
            console.log(bookingInfo);
            setIsInfoComplete(true);
        } else {
            console.log("Failed to retrieve Personal Information")
            setIsInfoComplete(false);
        }
    }, [bookingInfo]);

    // Page Render --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    return (  
        <div className="booking-page" id="personal-booking-page">
            <h2>Personal Information</h2>
            <div className="booking-grid col-three">
                <FirstName 
                    value={bookingInfo.customerFirstName}
                    onChange={e => {
                        setBookingInfo({
                            ...bookingInfo, 
                            customerFirstName: e.target.value
                        })
                    }}    
                />
                <LastName 
                    value={bookingInfo.customerLastName}
                    onChange={e => {
                        setBookingInfo({
                            ...bookingInfo, 
                            customerLastName: e.target.value
                        })
                    }}   
                />
                <Phone 
                    value={bookingInfo.phoneNumber}
                    onChange={e => {
                        setBookingInfo({
                            ...bookingInfo, 
                            phoneNumber: e.target.value
                        })
                    }}   
                />
            </div>
            <h2>Address</h2>
            <div className="booking-grid col-two">
                <Address 
                    value={bookingInfo.address.block}
                    onChange={e => {
                        setBookingInfo({
                            ...bookingInfo, 
                            address: {
                                ...bookingInfo.address, 
                                block: e.target.value
                            }
                        })
                    }}   
                />
                <Province
                    value={selectedProv}
                    data={provinceData} 
                    onChange={e => {
                        setBookingInfo({
                            ...bookingInfo, 
                            address: {
                                ...bookingInfo.address, 
                                province: e.target.value.slice(4), 
                                municipal:'0', 
                                barangay:'0'
                            }
                        })
                        listMunicipalities(e.target.value);
                        setSelectedProv(e.target.value);
                    }}/>
                <Municipality 
                    value={selectedCity}
                    data={municipalData} 
                    selection={listBarangays}
                    onChange={e => {
                        setBookingInfo({
                            ...bookingInfo, 
                            address: {
                                ...bookingInfo.address, 
                                municipal: e.target.value.slice(6),
                                barangay:'0'
                            }
                        })
                        listBarangays(e.target.value);
                        setSelectedCity(e.target.value);
                    }}/>
                <Barangay 
                    value={selectedBrgy}
                    data={barangayData}
                    onChange={e => {
                        setBookingInfo({
                            ...bookingInfo, 
                            address: {
                                ...bookingInfo.address,
                                barangay: e.target.value.slice(9)
                            }
                        })
                        setSelectedBrgy(e.target.value);
                    }}/>
            </div>
        </div>
    );
}

// Service Booking Page Component --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
const ServiceBooking = ({bookingInfo, setBookingInfo, serviceList, setIsInfoComplete}) => {
    // Variables Initialization --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    // --- Service Details Variables
    const [areaList, setAreaList] = useState([]);
    const [workerNumbers, setWorkerNumbers] = useState([]);
    const [priceList, setPriceList] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState(0);
    const [windowNumber, setWindowNumber] = useState(1);

    // Functions --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    // Handles auto-fill
    useEffect(() => {
        const service = bookingInfo.serviceDetails.serviceCategory;
        serviceList.forEach((s, index) => {
            if (s.serviceName === service) {
                fetchAreaAndWorkers(s._id);
            }
        })
    }, [])

    useEffect(() => {
        const area = bookingInfo.serviceDetails.sizeOfArea;
        areaList.forEach((a, index) => {
            if (a.sizeOfArea === area) {
                setSelectedPrice(priceList[index]);
            }
        })
    }, [areaList])

    useEffect(() => {
        setBookingInfo({
            ...bookingInfo,
            serviceCost: parseInt(selectedPrice * windowNumber)
        })
    }, [selectedPrice])

    useEffect(() => {
        localStorage.setItem("windowNumber", windowNumber);
    }, [windowNumber])

    // Fetch Area and Workers for selected Service
    const fetchAreaAndWorkers = async (service) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/appointment/getSpecificService/${service}`, {
                headers: { 
                    'Content-Type': 'application/json',
                }
            });
            setAreaList(response.data.data.areaDetails);
            setWorkerNumbers(response.data.data.numberOfWorkers);
            setPriceList(response.data.data.price);
        // --- --- Failed Fetching
        } catch (error) {
            console.error(error);
        }
    }

    // Acts on selection of service
    const onServiceSelect = (service) => {
        setAreaList([]);
        setWorkerNumbers([]);
        setPriceList([]);
        setSelectedPrice(0);
        setWindowNumber(1);

        serviceList.forEach((s, index) => {
            if (s.serviceName === service) {
                fetchAreaAndWorkers(s._id);
            }
        })

        setBookingInfo({
            ...bookingInfo,
            serviceDetails: {
                serviceCategory: service,
                sizeOfArea: '0',
                numberOfWorkers: 0
            },
            serviceCost: 0
        })
    }

    // Acts on selection of area
    const onAreaSelect = (area) => {
        setSelectedPrice(0)
        areaList.forEach((a, index) => {
            if (a.sizeOfArea === area) {
                setSelectedPrice(priceList[index]);
            }
        })

        setBookingInfo({
            ...bookingInfo,
            serviceDetails: {
                ...bookingInfo.serviceDetails,
                sizeOfArea: area
            }
        })
    }

    //Acts on selection of workers
    const onWorkersSelect = (workers) => {
        setBookingInfo({
            ...bookingInfo,
            serviceDetails: {
                ...bookingInfo.serviceDetails,
                numberOfWorkers: workers
            }
        })
    }

    //Acts on change of window number
    const onWindowChange = (number) => {
        setWindowNumber(number);
        setBookingInfo({
            ...bookingInfo,
            serviceCost: parseInt(selectedPrice * number)
        })
    }

    // --- Pass Service Booking Information to Parent
    useEffect(() => {
        if (!(bookingInfo.serviceDetails.serviceCategory === '0') &&
            !(bookingInfo.serviceDetails.sizeOfArea === '0') &&
            !(bookingInfo.serviceDetails.numberOfWorkers == 0) &&
            !(bookingInfo.serviceCost === 0)
        ) { 
            console.log("Service Information and Pricing is Complete");
            console.log(bookingInfo);
            setIsInfoComplete(true);
        } else {
            console.log("Failed to Retrieve Service Information and Pricing");
            setIsInfoComplete(false);
        }
    }, [bookingInfo]);


    // Page Render --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    return (
        <div className="booking-page" id="service-booking-page">
            <h2>Service</h2>
            <p className="subheading">
                    Estimated Price: <strong>Php {
                        bookingInfo.serviceCost
                    }.00</strong>
            </p>
            <div className="booking-grid col-three">
                <ServiceType  
                data={serviceList} 
                onChange={onServiceSelect}
                value={bookingInfo.serviceDetails.serviceCategory}
                />
                <AreaSize  
                data={areaList} 
                onChange={onAreaSelect}
                value={bookingInfo.serviceDetails.sizeOfArea}
                />
                <WorkerNumbers  
                data={workerNumbers} 
                onChange={onWorkersSelect}
                value={bookingInfo.serviceDetails.numberOfWorkers}
                />
                {(bookingInfo.serviceDetails.serviceCategory === "Window Cleaning")?
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
const Schedule = ({bookingInfo, setBookingInfo, serviceList, setIsInfoComplete}) => {
    const [timeList, setTimeList] = useState([]);
    const [newTimeList, setNewTimeList] = useState([]);
    const [dateLimit, setDateLimit] = useState({
        minDate: '',
        maxDate: ''
    });

    // --- Sets the Current Date min and max input of date
    const getDateLimits = () => {
        const today = new Date();

        //Min Date
        const minDateObj = new Date(today);
        minDateObj.setDate(today.getDate() + 1); 
        const minYear = minDateObj.getFullYear();
        const minMonth = String(minDateObj.getMonth() + 1).padStart(2, '0');
        const minDay = String(minDateObj.getDate()).padStart(2, '0');
        const minDate = `${minYear}-${minMonth}-${minDay}`;

        //Max Date
        const maxDateObj = new Date(today);
        maxDateObj.setMonth(today.getMonth() + 6);
        const maxYear = maxDateObj.getFullYear();
        const maxMonth = String(maxDateObj.getMonth() + 1).padStart(2, '0');
        const maxDay = String(maxDateObj.getDate()).padStart(2, '0');
        const maxDate = `${maxYear}-${maxMonth}-${maxDay}`;

        setDateLimit({minDate, maxDate});

        if (bookingInfo.scheduleDetails.date === '') {
            setBookingInfo({
                ...bookingInfo, 
                scheduleDetails: {
                    ...bookingInfo.scheduleDetails,
                    date: minDate
                }
            });
        }
    }

    const setSelectedTime = (sTime) => {
        const buttons = document.querySelectorAll(".time-booking-button");
        
        const formattedTimes = Array.from(buttons).map((button) => button.textContent);
        const convertedTimes = formattedTimes.map((fTime) => {
            const [time, meridien] = fTime.split(' ');
            const [hour, min] = time.split(':');

            if (meridien === "PM") {
                return `${parseInt(hour)+12}${min}`;
            } else {
                return `${hour}${min}`;
            }
        })

        convertedTimes.forEach((cTime, index) => {
            if (cTime === sTime) {
                buttons[index].classList.add('active');
            }
        })
    }

    useEffect(() => {
        try {
            getDateLimits();
        } catch (e) {
            console.log(e);
        }
    }, []);

    // --- Lists all Area of a Selected Service
    useEffect(() => {
        ResetButtons();
        const selectedService = serviceList.find(
            (service) => service.serviceName === bookingInfo.serviceDetails.serviceCategory
        );
    
        if (selectedService) {
            const filteredArea = selectedService.areaDetails.find(
                (area) => area.sizeOfArea === bookingInfo.serviceDetails.sizeOfArea
            );
            setTimeList(filteredArea ? filteredArea.startTime || [] : []);
        }
    }, [bookingInfo.serviceDetails]);

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

    useEffect(() => {
        if (bookingInfo.scheduleDetails.startTime !== ''){
            setSelectedTime(bookingInfo.scheduleDetails.startTime)
        }   
    },[newTimeList]);

    // --- Handles Date Input
    const handleDateInput = (value) => {
        setBookingInfo({
            ...bookingInfo, 
            scheduleDetails: {
                ...bookingInfo.scheduleDetails,
                date: value
            }
        })
    }

    // --- Handles Selection of Time
    const ResetButtons = () => {
        const buttons = document.querySelectorAll(".time-booking-button");
        buttons.forEach((button) => button.classList.remove('active'));
    }

    const handleTimeButtonClick = (e, value) => {
        setBookingInfo({
            ...bookingInfo,
            scheduleDetails: {
                ...bookingInfo.scheduleDetails,
                startTime: value
            }
        })
        ResetButtons();
        e.target.classList.add('active');
    }
    
    // --- Pass Scheduling Information to Parent
    useEffect(() => {
        if (!(bookingInfo.scheduleDetails.date === '') &&
            !(bookingInfo.scheduleDetails.startTime === '')
        ){
            console.log("Service Information and Pricing is Complete");
            console.log(bookingInfo);
            setIsInfoComplete(true);
        } else {
            console.log("Failed to retrieve Schedule Booking");
            setIsInfoComplete(false);
        }
            
    }, [bookingInfo])


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
                    value = {bookingInfo.scheduleDetails.date}
                    className="input" 
                    type="date" 
                    name="bookDate" 
                    onChange={(e) => handleDateInput(e.target.value)}
                    id="bookdate-input" 
                    min={dateLimit.minDate} 
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
const AvailableCleaners = ({bookingInfo, setBookingInfo, setIsInfoComplete}) => {
    const [workersList, setWorkersList] = useState([]);
    const [responseSuccess, setResponseSuccess] = useState(false);
    const [workerNumbers, setWorkerNumbers] = useState(0);
    const [selectedWorkers, setSelectedWorkers] = useState([]);
    const [errorMessage, setErrorMessage] = useState({
        status: '',
        message: ''
    })
    const [workerIdentifier, setWorkerIdentifier] = useState({
        address: {
            block: '',
            province: '',
            municipal: '',
            barangay: ''
        },
        serviceDetails: {
            serviceCategory: '',
            sizeOfArea: ''
        },
        scheduleDetails: {
            date: '',
            startTime: ''
        }
    })


    // Function --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    //Sets the only needed data for fetching workers
    useEffect(() => {
        setWorkerIdentifier({
            address: {
                block: bookingInfo.address.block,
                province: bookingInfo.address.province,
                municipal: bookingInfo.address.municipal,
                barangay: bookingInfo.address.barangay
            },
            serviceDetails: {
                serviceCategory: bookingInfo.serviceDetails.serviceCategory,
                sizeOfArea: bookingInfo.serviceDetails.sizeOfArea
            },
            scheduleDetails: {
                date: bookingInfo.scheduleDetails.date,
                startTime: bookingInfo.scheduleDetails.startTime
            }
        })

        console.log(bookingInfo);
    }, [bookingInfo])
    // --- Fetches Available Worker
    useEffect(() => {
        setWorkerNumbers(parseInt(bookingInfo.serviceDetails.numberOfWorkers));
        
        const fetchAvailableWorkers = async () => {
            // --- --- Successfull Fetching
            try {
                const response = await axios.post(`http://localhost:5000/api/appointment/getAvailableWorkers`, workerIdentifier, {
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
            workerIdentifier.serviceDetails.serviceCategory &&
            workerIdentifier.serviceDetails.sizeOfArea &&
            workerIdentifier.scheduleDetails.date &&
            workerIdentifier.scheduleDetails.startTime
        ) {
            fetchAvailableWorkers();
        }
    }, [workerIdentifier])

    useEffect(() => {
        if (bookingInfo.assignedWorkers) {
            setSelectedWorkers(bookingInfo.assignedWorkers);
        }
    }, [workersList])

    const workerSelect = (worker, isSelected) => {
        if (isSelected) {
            setSelectedWorkers(selectedWorkers.filter((w) => w !== worker._id))
        }  else if (selectedWorkers.length != workerNumbers) {
            setSelectedWorkers([...selectedWorkers, worker._id]);
        }
    }

    useEffect(() => {
        if (selectedWorkers.length == workerNumbers){
            setBookingInfo({
                ...bookingInfo,
                assignedWorkers: selectedWorkers
            })
            setIsInfoComplete(true);
        } else {
            setIsInfoComplete(false);
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
                            className={`avail-worker-container ${(isSelected) ? 'selected' : ''}`}
                            key={index}
                            onClick={() => workerSelect(worker, isSelected)}
                            >
                                <div className="information">
                                    <p className="name">{`
                                    ${worker.userDetails.firstName} ${worker.userDetails.lastName}
                                    `}</p>
                                    <p className="location">Location: {`
                                    ${worker.userDetails.address.barangay}, ${worker.userDetails.address.municipal}, ${worker.userDetails.address.province}
                                    `}</p>
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
 
const Review = ({bookingInfo}) => {
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
                        <p>{bookingInfo.customerFirstName} {bookingInfo.customerLastName}</p>
                    </div>
                </div>
                <div className="review-info-line">
                    <p className="title">Phone Number</p>
                    <div className="data">
                        <p>{bookingInfo.phoneNumber}</p>
                    </div>
                </div>
                <div className="review-info-line">
                    <p className="title">Address</p>
                    <div className="data">
                        <p>{bookingInfo.address.block}</p>
                        <p>{bookingInfo.address.barangay}, {bookingInfo.address.municipal}, {bookingInfo.address.province}</p>
                    </div>
                </div>
            </section>
            <h2>Appointment Details</h2>
            <section className="review-information-container">
                <div className="review-info-line">
                    <p className="title">Date</p>
                    <div className="data">
                        <p>{bookingInfo.scheduleDetails.date}</p>
                    </div>
                </div>
                <div className="review-info-line">
                    <p className="title">Time</p>
                    <div className="data">
                        <p>{bookingInfo.scheduleDetails.startTime}</p>
                    </div>
                </div>
                <div className="review-info-line">
                    <p className="title">Workers</p>
                    <div className="data">
                        {bookingInfo.assignedWorkers.map((worker, index) => (
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
                        <p>{bookingInfo.serviceDetails.serviceCategory}</p>
                    </div>
                </div>
                <div className="review-info-line">
                    <p className="title">Size of Area</p>
                    <div className="data">
                        <p>{bookingInfo.serviceDetails.sizeOfArea}</p>
                    </div>
                </div>
                <hr />
                <div className="review-info-line price">
                    <p className="title">Total Cost</p>
                    <div className="data">
                        <p>&#8369;{bookingInfo.serviceCost}</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export {PersonalInfo, ServiceBooking, Schedule, AvailableCleaners, Review};