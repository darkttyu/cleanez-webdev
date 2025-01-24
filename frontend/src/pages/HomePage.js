// Import Statements --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
// --- Styling Import/s
import '../styles/HomePage.css'
// --- Component Import/s
import {Header, Services, About, Founders} from '../components/HomeContent';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';


// Main Page Component --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
const HomePage = ({isLoggedIn}) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        document.title = 'CleanEZ | Home'
    }, [])

    useEffect(() => {
        if (!user) {
            navigate('/home')
        }
    }, [user])

    // Page Render --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    return (  
        <>
            <Navbar isLoggedIn={isLoggedIn}/>
            <Header />
            <Services />
            <About />
            <Founders />
            <Footer />
        </>
    );
}
 
export default HomePage;

