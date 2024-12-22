import '../styles/Navbar.css'
import NavLogo from '../images/logos/nav-logo.png'
import {Link} from 'react-router-dom';
import {HashLink} from 'react-router-hash-link';

const Navbar = () => {
     // Change later to a more dynamic way to check if a user is logged in or not.
     const isLoggedIn = false;

     return ( 
          <nav className="navbar">
               <img className="nav-logo" src={NavLogo} alt="CleanEZ Logo" />
               <div className="nav-links">
                    <HashLink to="/home#home" className='nav-link'>Home</HashLink>
                    <HashLink to="/home#services" className='nav-link'>Services</HashLink>
                    <Link to="/frequently-asked-questions" className='nav-link'>FAQs</Link>
                    <HashLink to="/home#about-us" className='nav-link'>About Us</HashLink>
                    
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