import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FAQsPage = () => {
    return (  
        <div>
            <Navbar />
            <header>
                <h1 className="page-title">Frequently Asked Questions</h1>
                <h2 className="main-quote">Ask Us Anything</h2>
                <p className="sub-quote">Have any questions? We're here to assist you</p>
                <input 
                type="text" 
                name="search-question" 
                id="search-question" />
            </header>
            <main>

            </main>
            <Footer/>
        </div>
    );
}
 
export default FAQsPage;