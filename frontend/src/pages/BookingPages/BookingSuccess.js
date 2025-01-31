import { useAuth } from '../../AuthContext';
import NavLogo from '../../images/logos/nav-logo.png'
import '../../styles/BookingPage.css';
import SVGIcons from "../../SVGIcons";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BookingSuccess = () => {
    const {user} = useAuth();
    
    return (  
        <>
            <nav className="navbar">
                <Link to="/home">
                    <img className="nav-logo" src={NavLogo} alt="Logo" />
                </Link>
                <div className='nav-divider'></div>
                <h1 className='nav-title'>Appointment</h1>
            </nav>
            <div className='booking-success-content'>
                <div className="booking-success-container">
                    <div className='success-message'>
                        <SVGIcons 
                        selected="checkSuccess" 
                        size="162" 
                        color="#06E36D"
                        />
                        <h2>Booking Confirmed Successfully!</h2>
                        <p>Thank you for choosing <strong>Clean<span>EZ</span></strong>! Your appointment is confirmed. 
                        <br/>
                        Please check your email for details.</p>
                    </div>
                    <Link to="/home">
                        Go back to Home
                    </Link>
                </div>
            </div>
        </>
    );
}
 
export default BookingSuccess;