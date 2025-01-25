// Import Statements --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
import { useAuth } from '../../AuthContext';
import NavLogo from '../../images/logos/nav-logo.png'
import '../../styles/BookingPage.css';
import SVGIcons from "../../SVGIcons";
import {PersonalInfo, ServiceBooking, Schedule, AvailableCleaners, Review} from "../../components/BookingForm";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingPage = () => {
    // Variables Initialization --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    // --- Context Authenticator
    const {user} = useAuth();
    const navigate = useNavigate();
    // --- Main Information Variables
    const [serviceList, setServicesList] = useState([]);
    const [bookingInfo, setBookingInfo] = useState({
        customerFirstName: '',
        customerLastName: '',
        phoneNumber: '',
        address: {
            block: '',
            province: '0',
            municipal: '0',
            barangay: '0'
        },
        serviceDetails: {
            serviceCategory: '0',
            sizeOfArea: '0',
            numberOfWorkers: 0
        },
        scheduleDetails: {
            date: '',
            startTime: ''
        },
        assignedWorkers: null,
        serviceCost: 0
    });
    // --- Other Variables
    const [page, setPage] = useState(0);
    const [showSubmit, setShowSubmit] = useState(false);
    const [disableSubmit, setDisabledSubmit] = useState(false);
    const [progressbar, setProgressbar] = useState('');
    const [isInfoComplete, setIsInfoComplete] = useState(false);

    // Functions --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    // --- Checks if person is logged-in
    useEffect(() => {
        const validateAndRedirect = () => {
            try {
                if (
                    user.firstName 
                ) {
                    setBookingInfo({
                        ...bookingInfo,
                        customerFirstName: user.firstName,
                        customerLastName: user.lastName,
                        phoneNumber: user.phoneNumber,
                        address: {
                            block: user.address.block,
                            province: user.address.province,
                            municipal: user.address.municipal,
                            barangay: user.address.barangay
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

        document.title = "CleanEZ | Booking"
    }, [])

    // --- Fetches all Service Type Data
    useEffect(() => {
        const fetchServicesList = async () => {
            try {
                const response = await axios.get(`https://cleanez-api.vercel.app/api/appointment/getServices`, {
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

    const pageDisplay = () => {
        if (page === 0) {
            return (
                <PersonalInfo 
                bookingInfo={bookingInfo}
                setBookingInfo={setBookingInfo}
                setIsInfoComplete={setIsInfoComplete}/>
            )
        } else if (page === 1) {
            return (
                <ServiceBooking 
                bookingInfo={bookingInfo}
                setBookingInfo={setBookingInfo}
                serviceList={serviceList}
                setIsInfoComplete={setIsInfoComplete} />
            )
        } else if (page === 2) {
            return (
                <Schedule 
                bookingInfo={bookingInfo}
                setBookingInfo={setBookingInfo}
                serviceList={serviceList} 
                setIsInfoComplete={setIsInfoComplete}/>
            )
        } else if (page === 3) {
            return (
                <AvailableCleaners 
                bookingInfo={bookingInfo}
                setBookingInfo={setBookingInfo}
                setIsInfoComplete={setIsInfoComplete}/>
            )
        } else if (page === 4) {
            return (
                <Review 
                bookingInfo={bookingInfo}
                />
            )
        }
    }

    useEffect(() => {
        setIsInfoComplete(false);
        setShowSubmit(false);

        if (page === 0) setProgressbar('percent-0');
        else if (page === 1) setProgressbar('percent-25');
        else if (page === 2) setProgressbar('percent-50');
        else if (page === 3) setProgressbar('percent-75');
        else if (page === 4) {
            setProgressbar('percent-100');
            const timer = setTimeout(() => {
                setShowSubmit(true);
            }, 1000);

            return () => clearTimeout(timer);
        } 
    }, [page])

    const handleBookingSubmission = async (e) => {
        try {
            e.preventDefault();
            setDisabledSubmit(true);

            const token = localStorage.getItem("token");
            console.log("Token from the backend: ", token);
            const response = await axios.post(
                `https://cleanez-api.vercel.app/api/appointment/setAppointment`,
                bookingInfo,
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
        
            console.log("Passed Data: ", bookingInfo); 
            console.log("Booking Completed:", response.data.message);
            
            navigate(`/booking/success`);
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
        } finally {
            setDisabledSubmit(false);
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
                        <div className={`progress ${progressbar}`}></div>
                    </div>
                    <div className="progress-numbers">
                        {Array.from({ length: 5 }, (_, index) => (
                            <div
                                key={index}
                                className={`progress-number ${page === index ? "active" : ""}`}
                            >
                                <p>{index + 1}</p>
                            </div>
                        ))}
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
                        
                        {(page !== 4 && isInfoComplete) ? (
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
                            showSubmit && (
                                <button 
                                type="submit"
                                className='booking-submit-btn booking-btn right'
                                disabled={disableSubmit}
                                >
                                    {disableSubmit? "Submitting..." : "Confirm and Submit"}
                                </button>
                            )
                        )}
                    </div>
                </form>
            </div>
        </>
    );
}
 
export default BookingPage;