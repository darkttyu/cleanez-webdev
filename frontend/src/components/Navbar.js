import '../styles/Navbar.css'
import NavLogo from '../images/logos/nav-logo.png'
import {Link, useParams} from 'react-router-dom';
import {HashLink} from 'react-router-hash-link';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Navbar = () => {
    const { user, logout } = useAuth(); // Access user from context
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/home')
        }
    }, [user])

    const handleLogOut = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/auth/logout`)
            console.log(response);

            localStorage.removeItem("token")
            logout();
            navigate('/home');
        } catch (error) {
            console.log('Logout Failed: ', error)
        }
    }
    
    
    return (
        <nav className="navbar space-between">
            <Link to={user ? `/home/${user._id}` : "/home"}>
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