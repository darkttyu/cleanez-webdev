import {useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import SVGIcons from "../SVGIcons";
import logo from '../images/logos/nav-logo.png';
import shortLogo from '../images/logos/Profile-Icon3.svg';
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
                <SVGIcons 
                selected="sidebarProfile"
                size="24px"
                color={`${activeLink === 'Profile' ? 'white' : 'var(--monoc4)'}`}/>
                <p className="sidebar-link-title">Profile</p>
            </Link></li>
            <li><Link 
            className={
                `link-item ${activeLink === 'Dashboard' ? 'active' : ''}`
            }
            to='dashboard'
            onClick={(e) => handleClick('Dashboard')}>
                <SVGIcons 
                selected="sidebarDashboard"
                size="24px"
                color={`${activeLink === 'Dashboard' ? 'white' : 'var(--monoc4)'}`}/>
                <p className="sidebar-link-title">Dashboard</p>
            </Link></li>
            <li><Link 
            className={
                `link-item ${activeLink === 'Appointments' ? 'active' : ''}`
            }
            to='appointments'
            onClick={(e) => handleClick('Appointments')}>
                <SVGIcons 
                selected="sidebarAppointments"
                size="24px"
                color={`${activeLink === 'Appointments' ? 'white' : 'var(--monoc4)'}`}/>
                <p className="sidebar-link-title">Appointments</p>
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
                <SVGIcons 
                selected="sidebarProfile"
                size="24px"
                color={`${activeLink === 'Profile' ? 'white' : 'var(--monoc4)'}`}/>
                <p className="sidebar-link-title">Profile</p>
            </Link></li>
            <li><Link 
            className={
                `link-item ${activeLink === 'Appointments' ? 'active' : ''}`
            }
            to='appointments'
            onClick={(e) => handleClick('Appointments')}>
                <SVGIcons 
                selected="sidebarAppointments"
                size="24px"
                color={`${activeLink === 'Appointments' ? 'white' : 'var(--monoc4)'}`}/>
                <p className="sidebar-link-title">Appointments</p>
            </Link></li>
            <li><Link 
            className={
                `link-item ${activeLink === 'Schedule' ? 'active' : ''}`
            }
            to='schedule'
            onClick={(e) => handleClick('Schedule')}>
                <SVGIcons 
                selected="sidebarSchedule"
                size="24px"
                color={`${activeLink === 'Schedule' ? 'white' : 'var(--monoc4)'}`}/>
                <p className="sidebar-link-title">Schedule</p>
            </Link></li>
        </>
    );
}

const AdminSide = ({setNavTitle}) => {
    const [activeLink, setActiveLink] = useState(() => {
        let path = String(window.location.pathname);

        if (path === "/admin") return 'Dashboard';

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
                `link-item ${activeLink === 'Dashboard' ? 'active' : ''}`
            }
            to='dashboard'
            onClick={(e) => handleClick('Dashboard')}>
                <SVGIcons 
                selected="sidebarAppointments"
                size="24px"
                color={`${activeLink === 'Dashboard' ? 'white' : 'var(--monoc4)'}`}/>
                <p className="sidebar-link-title">Dashboard</p>
            </Link></li>
            <li><Link 
            className={
                `link-item ${activeLink === 'Appointments' ? 'active' : ''}`
            }
            to='appointments'
            onClick={(e) => handleClick('Appointments')}>
                <SVGIcons 
                selected="sidebarAppointments"
                size="24px"
                color={`${activeLink === 'Appointments' ? 'white' : 'var(--monoc4)'}`}/>
                <p className="sidebar-link-title">Appointments</p>
            </Link></li>
            <li><Link 
            className={
                `link-item ${activeLink === 'Applicants' ? 'active' : ''}`
            }
            to='applicants'
            onClick={(e) => handleClick('Applicants')}>
                <SVGIcons 
                selected="sidebarApplicants"
                size="24px"
                color={`${activeLink === 'Applicants' ? 'white' : 'var(--monoc4)'}`}/>
                <p className="sidebar-link-title">Applicants</p>
            </Link></li>
            <li><Link 
            className={
                `link-item ${activeLink === 'Workers' ? 'active' : ''}`
            }
            to='workers'
            onClick={(e) => handleClick('Workers')}>
                <SVGIcons 
                selected="sidebarWorkers"
                size="24px"
                color={`${activeLink === 'Workers' ? 'white' : 'var(--monoc4)'}`}/>
                <p className="sidebar-link-title">Workers</p>
            </Link></li>
            <li><Link 
            className={
                `link-item ${activeLink === 'Users' ? 'active' : ''}`
            }
            to='users'
            onClick={(e) => handleClick('Users')}>
                <SVGIcons 
                selected="sidebarProfile"
                size="24px"
                color={`${activeLink === 'Users' ? 'white' : 'var(--monoc4)'}`}/>
                <p className="sidebar-link-title">Users</p>
            </Link></li>
        </>
    );
}

const AccSidebar = ({setNavTitle}) => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [returnPopup, setReturnPopup] = useState(false);
    const popupRef = useRef(null);
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
                await axios.post(`https://cleanez-api.vercel.app/api/auth/logout`) :
                await axios.post(`https://cleanez-api.vercel.app/api/auth/adminLogout`)
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

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setReturnPopup(false);
        }
    };

    useEffect(() => {
        if (returnPopup) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [returnPopup]);

    return (  
        <div className="account-page-left">
            <Link 
            to={(role === 'User' || role === 'Worker' || role === 'Applicant') ? 
                '/home' :
                '/adminLogin'
            }
            onClick={(role === 'User' || role === 'Worker' || role === 'Applicant') ? 
                (e) => {} :
                handleLogOut
            }>
                <img className="sidebar-logo" src={logo} alt="Logo" />
                <img className="sidebar-logo-short" src={shortLogo} alt="Logo" />
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

                    {returnPopup? 
                        <div className="sidebar-return-popup-container" ref={popupRef}>
                            {role !== 'Admin' ? 
                            <Link 
                            className="sidebar-return-popup"
                            to="/home">
                                Return to Home
                            </Link> :
                            <></>
                            }
                            
                            <Link 
                            className="sidebar-return-popup"
                            to="/home"
                            onClick={handleLogOut}>
                                Log Out
                            </Link>
                    </div> :
                    <></>
                    }
                    

                    <button
                    className="sidebar-return more"
                    type="button"
                    onClick={() => setReturnPopup(!returnPopup)}>
                        <SVGIcons 
                        selected="sidebarMore"
                        color="var(--monoc4)"
                        size="28px"/>
                    </button>
                </div>
            </div>
            
        </div>
    );
}
 
export default AccSidebar;