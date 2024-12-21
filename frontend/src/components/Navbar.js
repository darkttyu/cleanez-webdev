import '../styles/Navbar.css'
import NavLogo from '../images/logos/nav-logo.png'

const Navbar = () => {
     // Change later to a more dynamic way to check if a user is logged in or not.
     const isLoggedIn = true;

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
                         <a className="nav-link" href="">Login</a>
                    )}

                    <a className="nav-link book-btn" href="">Book Now</a>
               </div>
          </nav>
     );
}
 
export default Navbar;