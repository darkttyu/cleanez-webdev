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
    const {user} = useAuth();

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
    })
    
    // --- Fetches all Service Type Data
    useEffect(() => {
        const fetchServicesList = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/appointment/getServices`, {
                    headers: { 'Content-Type': 'application/json' }
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
    }, [scheduleBookingInfo])

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
                <section className='booking-container'>
                    <form className='booking-container-content'>
                        <PersonalInfo 
                        retrievePersonalInfo={retrievePersonalInfo}
                        user={user}/>
                        <ServiceBooking 
                        retrieveServiceBooking={retrieveServiceBooking}
                        retrieveFinalPrice={retrieveFinalPrice}
                        serviceList={serviceList} 
                        user={user}/>
                        <Schedule 
                        retrieveScheduleBooking={retrieveScheduleBooking}
                        serviceBookingInfo={serviceBookingInfo}
                        serviceList={serviceList} 
                        user={user}/>
                        <AvailableCleaners 
                        retrieveCleanersBooking={retrieveCleanersBooking}
                        availWorkerIdentifier={availWorkerIdentifier}
                        user={user}/>
                        <Review />
                    </form>
                    <div className='booking-navigation'>
                        <a
                        className="" >
                            <SVGIcons 
                            selected="previousArrow" 
                            size="40"
                            color="#4B4B4B"/>
                        </a>
                        <a
                        className="" >
                            <SVGIcons 
                            selected="forwardArrow" 
                            size="40"
                            color="#4B4B4B"/>
                        </a>
                    </div>
                </section>
            </div>
        </>
    );
}
 
export default BookingPage;