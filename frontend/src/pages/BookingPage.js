import {Link} from 'react-router-dom';
import { useAuth } from '../AuthContext';
import NavLogo from '../images/logos/nav-logo.png'
import '../styles/BookingPage.css';
import SVGIcons from "../SVGIcons";
import {PersonalInfo, ServiceBooking, Schedule, AvailableCleaners, Billing} from "../components/BookingForm";

const ContainerContent = () => {
    return (
        <>
            {/* <PersonalInfo /> */}
            <ServiceBooking />
        </>
    )
}

const BookingPage = () => {
    const {user} = useAuth();

    console.log(user);
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
                        <div className='progress-number'><p>6</p></div>
                    </div>
                </header>
                <section className='booking-container'>
                    <form className='booking-container-content'>
                        <ContainerContent />
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