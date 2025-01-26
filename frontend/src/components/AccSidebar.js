import {useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SVGIcons from "../SVGIcons";
import logo from '../images/logos/nav-logo.png';
import { useAuth } from "../AuthContext";
import axios from "axios";

const UserSide = ({setNavTitle}) => {
    const [activeLink, setActiveLink] = useState('Profile');
    const navigate = useNavigate();

    const handleClick = (title) => {
        setNavTitle(title)
        setActiveLink(title)
    }

    return (  
        <>
            <li><Link 
            className={
                `link-item ${activeLink === 'Profile' ? 'active' : ''}`
            }
            to='profile'
            onClick={(e) => handleClick('Profile')}>
                
                Profile
            </Link></li>
            <li><Link 
            className={
                `link-item ${activeLink === 'Dashboard' ? 'active' : ''}`
            }
            to='dashboard'
            onClick={(e) => handleClick('Dashboard')}>
                
                Dashboard
            </Link></li>
            <li><Link 
            className={
                `link-item ${activeLink === 'Appointments' ? 'active' : ''}`
            }
            to='appointments'
            onClick={(e) => handleClick('Appointments')}>
                
                Appointments
            </Link></li>
        </>
    );
}

const WorkerSide = ({setNavTitle}) => {
    const [activeLink, setActiveLink] = useState('Profile');
    const navigate = useNavigate();

    const handleClick = (title) => {
        setNavTitle(title)
        setActiveLink(title)
    }

    return (  
        <>
            <li><Link 
            className={
                `link-item ${activeLink === 'Profile' ? 'active' : ''}`
            }
            to='profile'
            onClick={(e) => handleClick('Profile')}>
                Profile
            </Link></li>
            <li><Link 
            className={
                `link-item ${activeLink === 'Appointments' ? 'active' : ''}`
            }
            to='appointments'
            onClick={(e) => handleClick('Appointments')}>
                
                Appointments
            </Link></li>
        </>
    );
}

const AdminSide = ({setNavTitle}) => {
    return (  
        <>
        </>
    );
}

const AccSidebar = ({user, setNavTitle}) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const accountSideDisplay = () => {
        const role = localStorage.getItem("role")

        if (role === 'User') {
            return <UserSide setNavTitle={setNavTitle}/>
        } else if (role === 'Worker') {
            return <WorkerSide setNavTitle={setNavTitle}/>
        } else if (role === 'admin') {
            return <AdminSide setNavTitle={setNavTitle}/>
        }
    }

    const handleLogOut = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/auth/logout`)
            console.log(response);

            localStorage.removeItem("token");
            localStorage.removeItem("role");
            logout();
            navigate('/home');
        } catch (error) {
            console.log('Logout Failed: ', error)
        }
    }

    return (  
        <div className="account-page-left">
            <Link to="/home">
                <img className="sidebar-logo" src={logo} alt="Logo" />
            </Link>
            <div className="sidebar-content">
                <ul className="sidebar-links">
                    {accountSideDisplay()}
                </ul>
                <div className="sidebar-return-container">
                    <Link 
                    className="sidebar-return"
                    to="/home">
                        Return to Home
                    </Link>
                    <Link 
                    className="sidebar-return"
                    to="/home"
                    onClick={handleLogOut}>
                        Log Out
                    </Link>
                </div>
            </div>
            
        </div>
    );
}
 
export default AccSidebar;