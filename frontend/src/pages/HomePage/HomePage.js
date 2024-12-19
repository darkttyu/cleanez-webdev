import '../../styles/HomePage.css'

import {Header, Services, About, Founders} from '../../components/HomeContent';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const HomePage = () => {
    return (  
        <div>
            <Navbar />
            <Header />
            <Services />
            <About />
            <Founders />
            <Footer />
        </div>
    );
}
 
export default HomePage;

