import SVG from "../SVGIcons";

const Footer = () => {
     return (  
          <footer className="footer">
               <img className="footer-logo" src={process.env.PUBLIC_URL + '/images/logos/Logo-3-1.svg'} alt="" />
               <div className="footer-content">
                    <div className="footer-menu">
                         <a href="#home" className="">Home</a>
                         <a href="#services" className="">Services</a>
                         <a href="#about-us" className="">About Us</a>
                         <a href="">Privacy Policy</a>
                    </div>
                    <div className="footer-misc">
                         <p className="register">Want to be part of our team? <a href="">Apply Now</a>.</p>
                         <p className="copyright">&copy; Copyright 2024. All rights reserved. CleanEZ.</p>
                    </div>
               </div>
               <div className="footer-contacts">
                    <div className="links">
                         <a href="https://www.youtube.com"><SVG selected="youtube" size="24px" color="#222222"/></a>
                         <a href="https://www.facebook.com"><SVG selected="facebook" size="24px" color="#222222"/></a>
                         <a href="https://www.twitter.com"><SVG selected="twitter" size="24px" color="#222222"/></a>
                         <a href="https://www.instagram.com"><SVG selected="instagram" size="24px" color="#222222"/></a>
                         <a href="https://www.linkedin.com"><SVG selected="linkedin" size="24px" color="#222222"/></a>
                    </div>
                    <div className="phone other-contacts">
                         <SVG selected="sms" size="24px" color="#222222"/>
                         <p>+63 921 854 6737</p>
                    </div>
                    <div className="email other-contacts">
                         <SVG selected="mail" size="24px" color="#222222"/>
                         <p>info@cleanez.com</p>
                    </div>
               </div>
          </footer>
     );
}
 
export default Footer;