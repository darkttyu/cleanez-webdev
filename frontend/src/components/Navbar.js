import '../styles/Navbar.css'
import NavLogo from '../images/logos/nav-logo.png'
import {Link, useParams} from 'react-router-dom';
import {HashLink} from 'react-router-hash-link';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const { user, setUser, logout } = useAuth(); // Access user from context
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/auth/logout`)
            console.log(response);

            localStorage.removeItem("token")
            localStorage.removeItem("role");
            logout();
        } catch (error) {
            console.log('Logout Failed: ', error)
        }
    }

    return (
        <nav className="navbar space-between">
            <Link to="/home">
                <img className="nav-logo" src={NavLogo} alt="Logo" />
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
                    <Link to="/login" className="nav-link">Login</Link>
                )}
                <Link to={user ? `/booking` : "/login"}className="nav-link book-btn">Book Now</Link>
            </div>
        </nav>
    );
};

export default Navbar;