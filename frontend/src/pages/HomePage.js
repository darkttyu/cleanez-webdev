// Import Statements --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
// --- Styling Import/s
import '../styles/HomePage.css'
// --- Component Import/s
import {Header, Services, About, Founders} from '../components/HomeContent';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


// Main Page Component --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
const HomePage = ({isLoggedIn}) => {
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

