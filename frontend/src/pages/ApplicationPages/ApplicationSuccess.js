import { useAuth } from '../../AuthContext';
import NavLogo from '../../images/logos/nav-logo.png'
import '../../styles/BookingPage.css';
import SVGIcons from "../../SVGIcons";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ApplicationSuccess = () => {
    const {user} = useAuth();
    
    return (  
        <>
            <nav className="navbar">
                <Link to="/home">
                    <img className="nav-logo" src={NavLogo} alt="Logo" />
                </Link>
                <div className='nav-divider'></div>
                <h1 className='nav-title'>Application</h1>
            </nav>
            <div className='booking-success-content'>
                <div className="booking-success-container">
                    <div className='success-message'>
                        <SVGIcons 
                        selected="checkSuccess" 
                        size="162" 
                        color="#06E36D"
                        />
                        <h2>Application Submitted!</h2>
                        <p>Thank you for applying to <strong>Clean<span>EZ</span></strong>! Your application has been successfully submitted.
                        <br/>
                        Please check your email for further updates.</p>
                    </div>
                    <Link to="/home">
                        Go back to Home
                    </Link>
                </div>
            </div>
        </>
    );
}
 
export default ApplicationSuccess;