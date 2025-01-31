import {useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SVGIcons from "../SVGIcons";
import logo from '../images/logos/nav-logo.png';
import { useAuth } from "../AuthContext";
import axios from "axios";

const UserSide = ({setNavTitle}) => {
    const [activeLink, setActiveLink] = useState(() => {
        let path = String(window.location.pathname);

        if (path === "/account") return 'Profile';

        path = path.replace('/account/', '');
        
        return path.charAt(0).toUpperCase() + path.slice(1);
        }
    );
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
    const [activeLink, setActiveLink] = useState(() => {
            let path = String(window.location.pathname);

            if (path === "/account") return 'Profile';

            path = path.replace('/account/', '');
            
            return path.charAt(0).toUpperCase() + path.slice(1);
        }
    );
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
            <li><Link 
            className={
                `link-item ${activeLink === 'Schedule' ? 'active' : ''}`
            }
            to='schedule'
            onClick={(e) => handleClick('Schedule')}>
                
                Schedule
            </Link></li>
        </>
    );
}

const AdminSide = ({setNavTitle}) => {
    const [activeLink, setActiveLink] = useState(() => {
        let path = String(window.location.pathname);

        if (path === "/admin") return 'Appointments';

        path = path.replace('/admin/', '');
        
        return path.charAt(0).toUpperCase() + path.slice(1);
        }
    );
    const navigate = useNavigate();

    const handleClick = (title) => {
        setNavTitle(title)
        setActiveLink(title)
    }

    return (  
        <>
            <li><Link 
            className={
                `link-item ${activeLink === 'Appointments' ? 'active' : ''}`
            }
            to='appointments'
            onClick={(e) => handleClick('Appointments')}>
                Appointments
            </Link></li>
            <li><Link 
            className={
                `link-item ${activeLink === 'Applicants' ? 'active' : ''}`
            }
            to='applicants'
            onClick={(e) => handleClick('Applicants')}>
                Applicants
            </Link></li>
            <li><Link 
            className={
                `link-item ${activeLink === 'Workers' ? 'active' : ''}`
            }
            to='workers'
            onClick={(e) => handleClick('Workers')}>
                Workers
            </Link></li>
            <li><Link 
            className={
                `link-item ${activeLink === 'Users' ? 'active' : ''}`
            }
            to='users'
            onClick={(e) => handleClick('Users')}>
                Users
            </Link></li>
        </>
    );
}

const AccSidebar = ({setNavTitle}) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const accountSideDisplay = () => {
        const role = localStorage.getItem("role")

        if (role === 'User' || role === 'Applicant') {
            return <UserSide setNavTitle={setNavTitle}/>
        } else if (role === 'Worker') {
            return <WorkerSide setNavTitle={setNavTitle}/>
        } else if (role === 'Admin') {
            return <AdminSide setNavTitle={setNavTitle}/>
        }
    }

    const handleLogOut = async () => {
        try {
            const role = localStorage.getItem("role");

            const response = ((role === 'User' || role === 'Worker' || role === 'Applicant') ? 
                await axios.post(`http://localhost:5000/api/auth/logout`) :
                await axios.post(`http://localhost:5000/api/auth/adminLogout`)
            );

            console.log(response);
            
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            logout();
            navigate((role === 'User' || role === 'Worker' || role === 'Applicant') ? 
                '/home' :
                '/adminLogin'
            );
            

        } catch (error) {
            console.log('Logout Failed: ', error)
        }
    }

    return (  
        <div className="account-page-left">
            <Link to={(role === 'User' || role === 'Worker' || role === 'Applicant') ? 
                '/home' :
                '/adminLogin'
            }>
                <img className="sidebar-logo" src={logo} alt="Logo" />
            </Link>
            <div className="sidebar-content">
                <ul className="sidebar-links">
                    {accountSideDisplay()}
                </ul>
                <div className="sidebar-return-container">
                    {role !== 'Admin' ? 
                        <Link 
                        className="sidebar-return"
                        to="/home">
                            Return to Home
                        </Link> :
                        <></>
                    }
                    
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