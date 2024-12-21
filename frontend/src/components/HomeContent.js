import SVG from "../SVGIcons";
//Header Images
import homepage1 from '../images/assets/homepage1.jpg'
import homepage2 from '../images/assets/homepage2.jpg'
import homepage3 from '../images/assets/homepage3.jpg'
import aboutus1 from '../images/assets/aboutus1.jpg'
import placeholder from '../images/assets/placeholder.jpg'

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
                         {index === 0 ? (
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
const services = [
    {image: placeholder, title:"Service 1"},
    {image: placeholder, title:"Service 2"},
    {image: placeholder, title:"Service 3"},
    {image: placeholder, title:"Service 4"},
    {image: placeholder, title:"Service 5"},
    {image: placeholder, title:"Service 6"},
];
    return ( 
         <section className="main-section services dark-bg" id="services">
              <h3>Our Services</h3>
              <div className="service-items">
                   {services.map((service) => (
                        <div className="service-item">
                             <div className="service-img">
                                  <img src={service.image} alt=""/>
                             </div>    
                             <div className="service-title">
                                  <p>{service.title}</p>
                             </div>     
                        </div>
                   ))}
              </div>
              <div className=""></div>
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
         {name: "Carl Matthew Fernandez", pos: "Placeholder Position", image: placeholder,
              contacts: {
                   linkedin: "https://www.linkedin.com/in/darkttyu/",
                   twitter: "https://x.com/darkttyu",
                   instagram: "https://www.instagram.com/takomattyy/",
                   facebook: "https://www.facebook.com/glowindadarki",
                   email: "ctrlfrz0710@gmail.com"
              }
         },
         {name: "Rein Andre Furagganan", pos: "Placeholder Position", image: placeholder,
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
              <h3>Meet the Founders</h3>
              <div className="founder-items">
              {founders.map((founder) => (
                   <div className="founder-item">
                        <img className="founder-img" src={founder.image} alt=""/>
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