// Import Statements --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
// --- Styling Import/s
import '../styles/HomePage.css'
// --- Component Import/s
import {Header, Services, About, Founders} from '../components/HomeContent';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import LoadingScreen1 from '../components/LoadingScreen1';


// Main Page Component --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        document.title = 'CleanEZ | Home'

        const loadResources = async () => {
            await document.fonts.ready;

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

