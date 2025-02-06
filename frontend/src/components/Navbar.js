import '../styles/Navbar.css';
import SVGIcons from '../SVGIcons'
import NavLogo from '../images/logos/nav-logo.png'
import NavLogoShort from '../images/logos/Profile-Icon3.svg'
import {Link, useParams} from 'react-router-dom';
import {HashLink} from 'react-router-hash-link';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const { user, setUser, logout } = useAuth(); // Access user from context
    const [openSidebar, setOpenSidebar] = useState(false);
    const [closing, setClosing] = useState(false);

    const navigate = useNavigate();

    const role = localStorage.getItem('role');

    const handleLogOut = async () => {
        try {
            const response = await axios.post(`https://cleanez-api.vercel.app/api/auth/logout`)
            console.log(response);

            localStorage.removeItem("token")
            localStorage.removeItem("role");
            logout();
        } catch (error) {
            console.log('Logout Failed: ', error)
        }
    }

    const handleOpen = (e) => {
        setOpenSidebar(true);
        
        setClosing(false);
    }   

    const handleClose = (e) => {
        setClosing(true); // Start closing animation
    
        setTimeout(() => {
            setOpenSidebar(false); // Hide sidebar after animation
            setClosing(false); // Reset closing state
        }, 600); // Match animation duration (0.6s)
    };
    

    return (
        <>
            <div 
            className={`nav-sidebar ${openSidebar? 'open' : 'close'} ${closing? 'closing' : ''}`}>
                <div className='nav-sidebar-top'>
                {role !== 'Worker' ?
                    <Link to={user ? `/booking` : "/login"}className="nav-side-link book-btn">Book Now</Link> :
                    <></>}
                    <button className='nav-burger'
                    onClick={handleClose}>
                        <SVGIcons 
                        selected="navBurger"
                        size="36px"
                        color="#20063b"/>
                    </button>
                </div>
                <div className="nav-sb-links">
                        <HashLink to="/home/#home" className="nav-sb-link" >Home</HashLink>
                        <HashLink to="/home/#services" className="nav-sb-link" >Services</HashLink>
                        <Link to="/frequently-asked-questions" className="nav-sb-link">FAQs</Link>
                        <HashLink to="/home/#about-us" className="nav-sb-link" >About Us</HashLink>
                    
                    {user ? (
                    <>
                        <Link to={`/account`} className='nav-sb-link'>My Account</Link>
                        <Link to="/home" className='nav-sb-link' onClick={(e) => {handleLogOut(); handleClose()}}>Log Out</Link>
                    </>
                    ) : (
                        <Link to="/login" className="nav-sb-link">Login</Link>
                    )}
                    
                </div>
            </div>
            <nav className="navbar space-between">
                <Link to="/home">
                    <img className="nav-logo" src={NavLogo} alt="CleanEZ" />
                    <img className="nav-logo-short" src={NavLogoShort} alt="CleanEZ" />
                </Link>
                <div className="nav-links">
                    <HashLink to="/home/#home" className="nav-link">Home</HashLink>
                    <HashLink to="/home/#services" className="nav-link">Services</HashLink>
                    <Link to="/frequently-asked-questions" className="nav-link">FAQs</Link>
                    <HashLink to="/home/#about-us" className="nav-link">About Us</HashLink>

                    {user ? (
                        <button 
                        className='nav-link my-account-container'>
                        My Account
                            <div className='pop-up'>
                                <Link to={`/account`} className='sub-link'>My Account</Link>
                                <Link to="/home" className='sub-link' onClick={handleLogOut}>Log Out</Link>
                            </div>
                        </button>
                    ) : (
                        <Link to="/login" className="nav-link login">Login</Link>
                    )}
                    {role !== 'Worker' ?
                    <Link to={user ? `/booking` : "/login"}className="nav-link book-btn">Book Now</Link> :
                    <></>}
                    <button className='nav-burger'
                    onClick={handleOpen}>
                        <SVGIcons 
                        selected="navBurger"
                        size="36px"
                        color="#20063b"/>
                    </button>
                </div>
            </nav>
        </>
        
    );
};

export default Navbar;