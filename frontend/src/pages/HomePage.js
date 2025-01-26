// Import Statements --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
// --- Styling Import/s
import '../styles/HomePage.css'
// --- Component Import/s
import {Header, Services, About, Founders} from '../components/HomeContent';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Main Page Component --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
const HomePage = () => {
    const { user } = useAuth();
    
    useEffect(() => {
        document.title = 'CleanEZ | Home'
    }, [])

    // Page Render --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    return (  
        <>
            <Navbar user={user}/>
            <Header />
            <Services />
            <About />
            <Founders />
            <Footer />
        </>
    );
}
 
export default HomePage;

