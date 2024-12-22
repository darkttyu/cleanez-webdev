import '../styles/Navbar.css'
import NavLogo from '../images/logos/nav-logo.png'
import {Link} from 'react-router-dom';

const Navbar = () => {
     // Change later to a more dynamic way to check if a user is logged in or not.
     const isLoggedIn = false;

     return ( 
          <nav className="navbar">
               <img className="nav-logo" src={NavLogo} alt="CleanEZ Logo" />
               <div className="nav-links">
                    <a className="nav-link" href="#home">Home</a>
                    <a className="nav-link" href="#services">Services</a>
                    <a className="nav-link" href="">FAQs</a>
                    <a className="nav-link" href="#about-us">About Us</a>
                    
                    {isLoggedIn ? (
                         <button 
                         className="nav-link"
                         id="my-account-link">
                              My Account
                              <div className='pop-up'>
                                   <a href="" className="sub-link">My Account</a>
                                   <a href="" className="sub-link">Log Out</a>
                              </div>
                         </button>
                    ) : (
                         <Link to="/login" className="nav-link">Login</Link>
                    )}

                    <a className="nav-link book-btn" href="">Book Now</a>
               </div>
          </nav>
     );
}
 
export default Navbar;