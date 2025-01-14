// Import Statements --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
import {Link} from 'react-router-dom';
import { useAuth } from '../AuthContext';
import NavLogo from '../images/logos/nav-logo.png'
import '../styles/BookingPage.css';
import SVGIcons from "../SVGIcons";
import {PersonalInfo, ServiceBooking, Schedule, AvailableCleaners, Review} from "../components/BookingForm";
import { useState, useEffect } from 'react';
import axios from 'axios';

const BookingPage = () => {
    // Variables Initialization --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    // --- Context Authenticator
    const {user} = useAuth();
    // --- Main Information Variables
    const [serviceList, setServicesList] = useState([]);
    const [personalInfo, setPersonalInfo] = useState({});
    const [serviceBookingInfo, setServiceBookingInfo] = useState({});
    const [scheduleBookingInfo, setScheduleBookingInfo] = useState({});
    const [finalPrice, setFinalPrice] = useState(0);
    const [selectedCleaners, setSelectedCleaners] = useState([]);
    const [availWorkerIdentifier, setAvailWorkerIdentifier] = useState({
        serviceDetails: {
            serviceCategory: '',
            sizeOfArea:  '',
            numberOfWorkers: ''
        },
        scheduleDetails: {
            date: '',
            startTime: ''
        }
    });
    const [bookingAppointmentInfo, setBookingAppointmentInfo] = useState({
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
    })
    // --- Other Variables
    const [page, setPage] = useState(0);

    // --- Fetches all Service Type Data
    useEffect(() => {
        const fetchServicesList = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/appointment/getServices`, {
                    headers: { 
                        'Content-Type': 'application/json',
                    }
                });
                setServicesList(response.data.services);
            // --- --- Failed Fetching
            } catch (error) {
                console.error(error);
            }
        }

        fetchServicesList();
    }, []);

    const retrievePersonalInfo = (data) => {
        setPersonalInfo(data);
    }

    const retrieveServiceBooking = (data) => {
        setServiceBookingInfo(data);
    }

    const retrieveScheduleBooking = (data) => {
        setScheduleBookingInfo(data);
    }

    const retrieveFinalPrice = (data) => {
        setFinalPrice(data);
    }

    const retrieveCleanersBooking = (data) => {
        setSelectedCleaners(data);
    }

    useEffect(() => {
        setAvailWorkerIdentifier({
            serviceDetails: {
                serviceCategory: serviceBookingInfo.serviceCategory,
                sizeOfArea:  serviceBookingInfo.sizeOfArea,
                numberOfWorkers: serviceBookingInfo.numberOfWorkers
            },
            scheduleDetails: {
                date: scheduleBookingInfo.date,
                startTime: scheduleBookingInfo.startTime
            }
        })
    }, [scheduleBookingInfo]);
    
    // Fills the Full Booking Appointment Information when all fields are filled
    useEffect(() => {
        try {
            if (personalInfo.address.block &&
                personalInfo.address.province &&
                personalInfo.address.municipal &&
                personalInfo.address.barangay
            ) {
                setBookingAppointmentInfo({
                    ...personalInfo,
                    address: {
                        block: personalInfo.address.block,
                        province: personalInfo.address.province.slice(4),
                        municipal: personalInfo.address.municipal.slice(6),
                        barangay: personalInfo.address.barangay.slice(9)
                    },
                    serviceDetails: {
                        ...serviceBookingInfo
                    },
                    scheduleDetails: {
                        ...scheduleBookingInfo,
                    },
                    assignedWorkers: selectedCleaners,
                    serviceCost: finalPrice
                })
            } else {
                throw new Error("failed xd");
            }
        } catch (e) {
            console.log(e.message);
        }
    },[selectedCleaners]);

    useEffect(() => {
        console.log("DATA SUCCESFULLY PASSED!")
        console.log(bookingAppointmentInfo)
    }, [bookingAppointmentInfo])

    const pageDisplay = () => {
        if (page === 0) {
            return (
                <PersonalInfo 
                retrievePersonalInfo={retrievePersonalInfo}
                user={user}/>
            )
        } else if (page === 1) {
            return (
                <ServiceBooking 
                retrieveServiceBooking={retrieveServiceBooking}
                retrieveFinalPrice={retrieveFinalPrice}
                serviceList={serviceList} 
                user={user}/>
            )
        } else if (page === 2) {
            return (
                <Schedule 
                retrieveScheduleBooking={retrieveScheduleBooking}
                serviceBookingInfo={serviceBookingInfo}
                serviceList={serviceList} 
                user={user}/>
            )
        } else if (page === 3) {
            return (
                <AvailableCleaners 
                retrieveCleanersBooking={retrieveCleanersBooking}
                availWorkerIdentifier={availWorkerIdentifier}
                user={user}/>
            )
        } else if (page === 4) {
            return (
                <Review 
                bookingAppointmentInfo={bookingAppointmentInfo}
                />
            )
        }
    }

    const handleBookingSubmission = async (e) => {
        try {
            e.preventDefault();
            const token = localStorage.getItem("token");
            console.log("Token from the backend: ", token);
            const response = await axios.post(
                `http://localhost:5000/api/appointment/setAppointment`,
                bookingAppointmentInfo,
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
        
            console.log("Passed Data: ", bookingAppointmentInfo); 
            console.log("Booking Completed:", response.data.message);
        
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 200 range
                console.log(`${error.response.status} ${error.response.data.message}`);
            } else if (error.request) {
                // Request was made but no response received
                console.log("No response received from server:", error.request);
            } else {
                // Something happened setting up the request
                console.log("Error creating the request:", error.message);
            }
        }
    }

    return (  
        <>
            <nav className="navbar">
                <Link to={user ? `/home/${user._id}` : "/home"}>
                    <img className="nav-logo" src={NavLogo} alt="Logo" />
                </Link>
                <div className='nav-divider'></div>
                <h1 className='nav-title'>Appointment</h1>
            </nav>
            <div className='booking-content'>
                <header className='booking-progress'>
                    <p className='instructions'>To schedule a cleaning appointment, please fill out the information below.</p>
                    <div className='progress-bar'>
                        <div className='progress'></div>
                    </div>
                    <div className='progress-numbers'>
                        <div className='progress-number active'><p>1</p></div>
                        <div className='progress-number'><p>2</p></div>
                        <div className='progress-number'><p>3</p></div>
                        <div className='progress-number'><p>4</p></div>
                        <div className='progress-number'><p>5</p></div>
                    </div>
                </header>
                <form className='booking-container'  method="POST" onSubmit={handleBookingSubmission}>
                    <div className='booking-container-content'>
                        {pageDisplay()}
                    </div>
                    <div className='booking-navigation'>
                        {page !== 0 ? (
                            <button
                            type="button"
                            className="booking-btn left" 
                            onClick={() =>{
                                setPage((currPage) => currPage - 1);
                            }}
                            >
                                <SVGIcons 
                                selected="previousArrow" 
                                size="40"
                                color="#4B4B4B"/>
                            </button>
                        ) : (<></>)}
                        
                        {page !== 4 ? (
                            <button
                            type="button"
                            className="booking-btn right" 
                            onClick={() =>{
                                setPage((currPage) => currPage + 1);
                            }}>
                                <SVGIcons 
                                selected="forwardArrow" 
                                size="40"
                                color="#4B4B4B"/>
                            </button>
                        ) : (
                            <button 
                            type="submit"
                            className='booking-submit-btn booking-btn right'
                            >
                                Confirm and Submit
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
}
 
export default BookingPage;