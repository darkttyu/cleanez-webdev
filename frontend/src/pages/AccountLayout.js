import AccSidebar from "../components/AccSidebar";
import { useAuth } from "../AuthContext";
import axios from 'axios';
import {useState, useEffect } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import '../styles/AccountPage.css';

const AccountLayout = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [navTitle, setNavTitle] = useState('Profile');

    useEffect(() => {
        document.title = 'CleanEZ | Account'
    }, [])

    useEffect(() => {
        if (!user) {
            navigate('/home');
        }
    }, [user])

    return (  
        <div className="account-page-layout">
            <AccSidebar user={user} setNavTitle={setNavTitle}/>
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