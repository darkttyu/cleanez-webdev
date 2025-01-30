// Import Statements --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
// --- Styling Import/s
import '../styles/HomePage.css'
// --- Component Import/s
import {Header, Services, About, Founders} from '../components/HomeContent';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect } from 'react';


// Main Page Component --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
const HomePage = () => {
    useEffect(() => {
        document.title = 'CleanEZ | Home'
    }, [])

    // Page Render --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    return (  
        <>
            <Navbar/>
            <Header />
            <Services />
            <About />
            <Founders />
            <Footer />
        </>
    );
}
 
export default HomePage;

