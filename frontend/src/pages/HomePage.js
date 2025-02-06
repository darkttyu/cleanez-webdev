// Import Statements --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
// --- Styling Import/s
import '../styles/HomePage.css'
// --- Component Import/s
import {Header, Services, About, Founders} from '../components/HomeContent';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import LoadingScreen1 from '../components/LoadingScreen1';

import homepage1 from '../images/assets/homepage1.jpg'
import homepage2 from '../images/assets/homepage2.jpg'
import homepage3 from '../images/assets/homepage3.jpg'
import aboutus1 from '../images/assets/aboutus1.jpg'
import placeholder from '../images/assets/founder0.jpg'
import services1 from '../images/assets/services1.jpg';
import services2 from '../images/assets/services2.jpg';
import services3 from '../images/assets/services3.jpg';
import services4 from '../images/assets/services4.jpg';
import services5 from '../images/assets/services5.jpg';
import services6 from '../images/assets/services6.png';
import founder3 from '../images/assets/founder3.jpg';
import founder4 from '../images/assets/founder4.jpg';

// Main Page Component --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        document.title = 'CleanEZ | Home'

        const page = document.body;

        const loadResources = async () => {
            await document.fonts.ready;

            const imageUrls = [homepage1, homepage2, homepage3, aboutus1, placeholder, services1, services2, services3, services4, services5, services6, founder3, founder4];
            const imagePromises = imageUrls.map((src) => {
                return new Promise((resolve) => {
                const img = new Image();
                img.src = src;
                img.onload = resolve;
                });
            });

            await Promise.all(imagePromises);

            setTimeout(() => {
                setFadeOut(true);

                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            }, 3000);

            
        };

        loadResources();
    }, [])

    // Page Render --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    return (  
        <>  
            {isLoading? 
            <LoadingScreen1 fadeOut={fadeOut}/> :
            <>
            </>
            }

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

