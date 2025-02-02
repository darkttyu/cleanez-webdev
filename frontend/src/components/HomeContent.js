import SVG from "../SVGIcons";
//Header Images
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

const Header = () => {
    const homeContent = [
        {
            quote: (<>Refresh your Space, <br/>The Easy Way.</>),
            subquote: "Where Clean Feels Like Home Again!",
            image: homepage1
        } , {
            quote: (<>Clean Spaces, <br/>Happy Faces.</>),
            subquote: "Let CleanEZ handle the dirty places.",
            image: homepage2
        } , {
            quote: (<>No Stress, <br/>No Mess.</>),
            subquote: "With CleanEZ, your home will be at its best!",
            image: homepage3
        }
    ]

    const role = localStorage.getItem("role");

    return (  
        <header className="main-section header" id="home">
            {/* Navigation Header */}
            <div className="header-container">
                <div className="header-items">
                {homeContent.map((content, index) => (
                    <div className="header-item" key={index}>
                        <div className="header-content">
                            <div className="quotes">
                                <h4>{content.quote}</h4>
                                <p>{content.subquote}</p>
                            </div>
                        </div>
                        {index === 0 && role !== 'Worker' ? (
                            <div className="header-button">
                                <a href="#" className="button">Book Now</a>
                            </div>
                        ):(
                            <div className="header-button">
                            </div>
                        )}
                        <div className="overlay"></div>
                        <img className="header-image" width= "720px" src={content.image} alt="" />
                    </div>
                ))}
                </div>
                
            </div>
        </header>
    );
}

const Services = () => {
    const role = localStorage.getItem('role');
    const servicesContent = [
        {
            image: services1,
            title: "Residential Cleaning",
            desc: "Make your home shining, shimmering, splendid with CleanEZ Residential services. Our team will handle all the cleaning, leaving every corner of your home spotless and fresh, making it feel brand new.",
            price: "₱1000"
        }, {
            image: services2,
            title: "Deep Cleaning",
            desc: "Turn your home to its best look with CleanEZ Deep Cleaning services. Designed for a thorough top-to-bottom clean, our service targets all dirts and grime that are missed during regular cleaning.",
            price: "₱2000"
        }, {
            image: services3,
            title: "Move-In/Out Cleaning",
            desc: "With CleanEZs Moving Cleaning service, we aim to make this process of moving in and out easier, ensuring that your new space is in spectacular condition. Whether you are moving in or out, trust us to handle all the cleaning, so you don’t have to worry about anything.",
            price: "₱2000"
        }, {
            image: services4,
            title: "Post-Renovation Cleaning",
            desc: "After a home renovation, your home may look stunning, but it often comes with leftover mess all over your home. With CleanEZs Post Renovation Cleaning service, we aim to transform your home into a fresh and new look, free from construction dust and residues.",
            price: "₱5000"
        }, {
            image: services5,
            title: "Office Cleaning",
            desc: "A clean office provides a productive and healthy environment, and with our Office Cleaning service, we are here to help keep your workplaces spotless and professional, ensuring that it will be welcoming for clients, employees, and visitors alike.",
            price: "₱1000"
        }, {
            image: services6,
            title: "Window Cleaning",
            desc: "Let the sunlight shine bright with CleanEZs Window Cleaning Service, we ensure that your windows will be spotless and crystal clear, giving your home or office a brighter, cleaner look inside and out.",
            price: "₱500"
        }
    ];

    return ( 
        <section className="main-section services" id="services">
            <h3>Our Services</h3>
            <div className="service-items">
            {servicesContent.map((service, index) => (
                    <div className="service-item" key={index}>
                        <img className="service-image" src={service.image} alt="" /> 
                        <div className="service-details">
                            <div className="information">
                                <h4>{service.title}</h4>
                                <p>{service.desc}</p>
                            </div>
                            <div className="pricings">
                                <p>Starts at <span>{service.price}</span></p>
                                {role !== 'Worker' ?
                                <a href="">Book Now</a> :
                                <></>
                                }
                                
                            </div>
                        </div> 
                    </div>
            ))}
            </div>
        </section>
    );
}

const About = () => {
    return (  
        <section className="main-section about" id="about-us">
            <div className="about-container">
                <h3>About Us</h3>
                <h4>Search. Book. Relax.</h4>
                <p className="subquote">
                    Welcome to CleanEZ, where cleaning is made easy.
                </p>
                <p className="description">
                    We’re your go-to platform for connecting with a trusted network of skilled cleaning professionals. From quick refreshes to deep cleaning and post-renovation care, CleanEZ makes it effortless to find and book the services you need.
                    <br /><br />
                    Built on simplicity, quality, and trust, our platform lets you search, filter, and book tailored services with ease. Every job is handled by screened, experienced experts from our partner agencies, so you can rest easy knowing your space is in good hands.
                    <br /><br />
                    At CleanEZ, we make cleaning stress-free—because you and your home deserves nothing less.
                </p>
            </div>
            <div className="overlay"></div>
            <img className="about-image" src={aboutus1} alt="" />
        </section> 
    );
}

const Founders = () => {
    const founders = [
        {name: "Jedd Eishen Aguilar", pos: "Placeholder Position", image: placeholder,
            contacts: {
                linkedin: "https://www.linkedin.com/in/jedd-eishen-aguilar-350b85284/",
                twitter: "https://x.com/bujeeeeeedd",
                instagram: "https://www.instagram.com/jdd.aglr/",
                facebook: "https://www.facebook.com/jeddeishenaguilar",
                email: "aguilar.jeddeishen@gmail.com"
            }
        },
        {name: "Kassandra Rychelle Balona", pos: "Placeholder Position", image: placeholder,
            contacts: {
                linkedin: "https://www.linkedin.com/in/kasrych/",
                twitter: "https://x.com/kasrych",
                instagram: "https://www.instagram.com/kasrych/",
                facebook: "https://www.facebook.com/kasrych/",
                email: "kassandrarychelle@gmail.com"
            }
        },
        {name: "Carl Matthew Fernandez", pos: "Placeholder Position", image: founder3,
            contacts: {
                linkedin: "https://www.linkedin.com/in/darkttyu/",
                twitter: "https://x.com/darkttyu",
                instagram: "https://www.instagram.com/takomattyy/",
                facebook: "https://www.facebook.com/glowindadarki",
                email: "ctrlfrz0710@gmail.com"
            }
        },
        {name: "Rein Andre Furagganan", pos: "Placeholder Position", image: founder4,
            contacts: {
                linkedin: "https://www.linkedin.com/in/reinadf164/",
                twitter: "https://x.com/reinchisdog",
                instagram: "https://www.instagram.com/reinchisdog_/",
                facebook: "https://www.facebook.com/reinhatdog/",
                email: "reindf164@gmail.com"
            }
        }
    ]

    return (
         <section className="main-section founders dark-bg" id="founders">
              <h3>Meet the Developers</h3>
              <div className="founder-items">
              {founders.map((founder, index) => (
                   <div className="founder-item" key={index}>
                        <img className="founder-image" src={founder.image} alt={placeholder}/>
                        <div className="founder-label">
                             <p className="founder-name">{founder.name}</p>
                             <p className="founder-pos">{founder.pos}</p>
                        </div>
                        <div className="founder-contacts">
                             <a href={founder.contacts.linkedin}>
                                  <SVG selected="linkedin" size="24px" color="#f3f3f3"/>
                             </a>
                             <a href={founder.contacts.twitter}>
                                  <SVG selected="twitter" size="24px" color="#f3f3f3"/>
                             </a>
                             <a href={founder.contacts.instagram}>
                                  <SVG selected="instagram" size="24px" color="#f3f3f3"/>
                             </a>
                             <a href={founder.contacts.facebook}>
                                  <SVG selected="facebook" size="24px" color="#f3f3f3"/>
                             </a>
                        </div>
                        <button className="contact-btn">Contact {founder.name.split(" ")[0]}</button>
                   </div>
              ))}
              </div>
         </section> 
    )
}

export {
    Header,
    Services,
    About,
    Founders
};