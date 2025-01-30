import AccSidebar from "../../components/AccSidebar";
import { useAuth } from "../../AuthContext";
import axios from 'axios';
import {useState, useEffect } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import '../../styles/AccountPage.css';

const AccountLayout = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const role = localStorage.getItem('role');

    const [navTitle, setNavTitle] = useState(
        role !== 'Admin' ? 'Profile' : 'Applicants'
    );

    useEffect(() => {
        document.title = 'CleanEZ | Account'
    }, [])

    useEffect(() => {
        if (!user) {
            navigate((role === 'User' || role === 'Worker' || role === 'Applicant') ? 
                '/home' :
                '/adminLogin'
            );
        }
    }, [user])

    return (  
        <div className="account-page-layout">
            <AccSidebar setNavTitle={setNavTitle}/>
            <div className="account-page-right">
                <nav className="navbar">
                <h1 className='nav-title'>{navTitle}</h1>
                </nav>
                <Outlet />
            </div>
        </div>
    );
}
 
export default AccountLayout;