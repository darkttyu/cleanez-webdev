import {Link} from 'react-router-dom';
import { useAuth } from '../AuthContext';


const PopupService = ({index, setShowModal}) => {
    const {user} = useAuth();

    const service = [
        {
            image: '',
            title: 'Residential Cleaning',
            price: '₱1,000',
            desc: 'Make your home shining, shimmering, splendid with CleanEZ Residential services. Our team will handle all the cleaning, leaving every corner of your home spotless and fresh, making it feel brand new.',
            areas: <>
                <li>Living Room</li>
                <li>Dining Room</li>
                <li>Bedroom</li>
                <li>Kitchen</li>
                <li>Bathrooms</li>
                <li>Hallways</li>
            </>,
            offers: <>
                <li><span class="offer-title">Comprehensive Cleaning:</span><span> From living rooms and kitchen to dining rooms and bedrooms, we clean all areas with care and precision.</span></li>
                <li><span class="offer-title">Dusting and Vacuuming:</span><span> We keep your surfaces, carpets, and furniture free of dust and bacteria.</span></li>
                <li><span class="offer-title">Floor Care:</span><span> This service also includes mopping, sweeping, and polishing your floors to leave it gleaming and glowing.</span></li>
                <li><span class="offer-title">Sanitization:</span><span> Areas that are always touched like doorknobs, light-switches, and kitchen countertops are disinfected for a healthier and cleaner home.</span></li>
                <li><span class="offer-title">Custom Cleaning Plans:</span><span> You can customize the services that are within the Residential Service to meet your needs and preferences.</span></li>
            </>,
            rates: <>
                <li><span class="offer-title">Small:</span><span> ₱1,000 - ₱1,500</span></li>
                <li><span class="offer-title">Medium (2-3 rooms):</span><span> ₱1,500 - ₱2,500</span></li>
                <li><span class="offer-title">Large (4+ rooms)</span><span> ₱4,000+</span></li>
            </>
        },
        {
            image: '',
            title: 'Deep Cleaning',
            price: '₱2,000',
            desc: 'Turn your home to its best look with CleanEZ Deep Cleaning services. Designed for a thorough top-to-bottom clean, our service targets all dirts and grime that are missed during regular cleaning.',
            areas: <>
                <li>Living Room</li>
                <li>Dining Room</li>
                <li>Bedroom</li>
                <li>Kitchen</li>
                <li>Bathrooms</li>
                <li>Hallways</li>
            </>,
            offers: <>
                <li><span class="offer-title">Detailed Cleaning:</span><span> The team meticulously clean every surface, including baseboards and window sills.</span></li>
                <li><span class="offer-title">Kitchen Revamp:</span><span> Scrubbing grout, appliances like ovens and refrigerators are cleaned from top-to-bottom, and cabinets are wiped down for a sparkling kitchen.</span></li>
                <li><span class="offer-title">Bathroom Refresh:</span><span> Bathrooms tiles, showerheads, and grouts are thoroughly sanitized for a new and clean look.</span></li>
                <li><span class="offer-title">Hidden Dirt Removal:</span><span> Dusting behind furniture and appliances to ensure that no corner is left uncleaned.</span></li>
                <li><span class="offer-title">Custom Cleaning Plans:</span><span> Customers can make requests to address their specific needs and spots that are needed to be focused on.</span></li>
            </>,
            rates: <>
                <li><span class="offer-title">Small:</span><span> ₱2,000 - ₱2,500</span></li>
                <li><span class="offer-title">Medium (2-3 rooms):</span><span> ₱3,000 - ₱4,500</span></li>
                <li><span class="offer-title">Large (4+ rooms)</span><span> ₱5,500+</span></li>
            </>
        },
        {
            image: '',
            title: 'Move-In / Move-Out Cleaning',
            price: '₱2,500',
            desc: 'With CleanEZs Moving Cleaning service, we aim to make this process of moving in and out easier, ensuring that your new space is in spectacular condition. Whether you are moving in or out, trust us to handle all the cleaning, so you don’t have to worry about anything.',
            areas: <>
                <li>Entire House (appliances included)</li>
            </>,
            offers: <>
                <li><span class="offer-title">Full House Deep Cleaning:</span><span> Every corner of your home will be cleaned, including floors, walls, and ceilings to ensure that the space will be fresh and welcoming.</span></li>
                <li><span class="offer-title">Dust and Dirt Removal:</span><span> Dust and grime in hard to reach areas like behind appliances are cleaned.</span></li>
                <li><span class="offer-title">Carpet and Floor Care:</span><span> Vacuuming and mopping of all floors to make it feel brand new.</span></li>
                <li><span class="offer-title">Flexible Scheduling:</span><span> CleanEZ provides flexible scheduling that caters to the customers needs whether you move in or out.</span></li>
            </>,
            rates: <>
                <li><span class="offer-title">Small:</span><span> ₱2,500 - ₱3,000</span></li>
                <li><span class="offer-title">Medium (2-3 rooms):</span><span> ₱4,000 - ₱5,500</span></li>
                <li><span class="offer-title">Large (4+ rooms)</span><span> ₱6,000+</span></li>
            </>
        },
        {
            image: '',
            title: 'Post-Renovation Cleaning',
            price: '₱5,000',
            desc: 'After a home renovation, your home may look stunning, but it often comes with leftover mess all over your home. With CleanEZs Post Renovation Cleaning service, we aim to transform your home into a fresh and new look, free from construction dust and residues.',
            areas: <>
                <li>Full House</li>
            </>,
            offers: <>
                <li><span class="offer-title">Construction Debris Removal:</span><span> The team removes all leftover materials such as nails, dust, and paint splatters to ensure that your home is free from renovation clutter.</span></li>
                <li><span class="offer-title">Dusting and Cleaning:</span><span> We clean all surfaces, walls, and windows, removing dust that has scattered everywhere.</span></li>
                <li><span class="offer-title">Detailing of Floors and Carpets:</span><span> We sweep, mop, and vacuum all floors to eliminate any dust or debris that has gathered during the renovation process.</span></li>
                <li><span class="offer-title">Bathroom and Kitchen Scrubbing:</span><span> We make sure that the kitchen and bath are spotless and sanitize by deep cleaning all tiles, countertops, sinks, and fixtures.</span></li>
                <li><span class="offer-title">Air Duct and Vent Cleaning:</span><span> We help clear out all dust particles from vents and air ducts to improve air quality.</span></li>
            </>,
            rates: <>
                <li>₱5,000 - ₱6,000</li>
            </>
        },
        {
            image: '',
            title: 'Office Cleaning',
            price: '₱1,000',
            desc: 'A clean office provides a productive and healthy environment, and with our Office Cleaning service, we are here to help keep your workplaces spotless and professional, ensuring that it will be welcoming for clients, employees, and visitors alike.',
            areas: <>
                <li>Workspaces</li>
                <li>Cubicles</li>
                <li>Meeting Rooms</li>
                <li>Restrooms</li>
                <li>Break rooms</li>
            </>,
            offers: <>
                <li><span class="offer-title">Desk and Surface Cleaning:</span><span> We wipe down desks, countertops, and other high touch surfaces to keep germs at bay.</span></li>
                <li><span class="offer-title">Floor Care:</span><span> We vacuum carpets, sweep, and mop hard floors to maintain a clean and polished work environment.</span></li>
                <li><span class="offer-title">Restroom Sanitization:</span><span> We prioritize hygiene and comfort by thoroughly cleaning and sanitizing office restrooms.</span></li>
                <li><span class="offer-title">Trash Removal:</span><span> We empty your trash bins to keep your office clutter-free.</span></li>
                <li><span class="offer-title">Window and Glass Cleaning:</span><span> We ensure that your windows and glass surfaces are spotless to maintain a professional look.</span></li>
                <li><span class="offer-title">Customized Plans:</span><span> We offer customized plans and scheduling to cater the customer needs and priorities in office cleaning.</span></li>
            </>,
            rates: <>
                <li><span class="offer-title">Small:</span><span> ₱1,000 - ₱1,500</span></li>
                <li><span class="offer-title">Medium (up to 1000-5000 sq ft.):</span><span> ₱5,000 - ₱6,000</span></li>
                <li><span class="offer-title">Large (5000+ sq ft.):</span><span> ₱7,000+</span></li>
            </>
        },
        {
            image: '',
            title: 'Window Cleaning',
            price: '₱40',
            desc: 'et the sunlight shine bright with CleanEZs Window Cleaning Service, we ensure that your windows will be spotless and crystal clear, giving your home or office a brighter, cleaner look inside and out.',
            areas: <>
                <li>Interior and Exterior Window</li>
                <li>Glass Doors</li>
            </>,
            offers: <>
                <li><span class="offer-title">Interior Window Cleaning:</span><span> Thorough cleaning of interior glass surfaces.</span></li>
                <li><span class="offer-title">Exterior Window Cleaning:</span><span> Expert cleaning of exterior windows, removing dirt and grimes.</span></li>
                <li><span class="offer-title">Full House / Office Window Cleaning:</span><span> Enjoy a complete interior and exterior window cleaning for a chapter price.</span></li>
                <li><span class="offer-title">Customized Plan:</span><span> We offer customized plans and scheduling to cater the customer needs and priorities in window cleaning.</span></li>
            </>,
            rates: <>
                <li><span class="offer-title">Interior Windows:</span><span> ₱40/window</span></li>
                <li><span class="offer-title">Exterior Window:</span><span> ₱60/window</span></li>
                <li><span class="offer-title">Full House:</span><span> ₱55/window</span></li>
            </>
        },
    ]


    return (  
        <div className="modal-container"
        onClick={() => setShowModal(false)}>
            <div className='service-modal-box'>
                <div className="picture-container">
                    <img src={service[index].image} alt="Service Image" />
                </div>
                <div className="text-container">
                    <h2 className="title">{service[index].title}</h2>
                    <div className="price-container">
                        <span>Starts at </span><span className="price">{service[index].price}</span>
                    </div>
                    <div className="details">{service[index].desc}</div>
                    <div className="info">
                        <h3 className="info-title">Areas Covered:</h3>
                        <ul className="list">
                            {service[index].areas}
                        </ul>
                    </div>
                    <div className="info">
                        <h3 className="info-title">What we offer:</h3>
                        <ul className="list">
                            {service[index].offers}
                        </ul>
                    </div>
                    <div className="info">
                        <h3 className="info-title">Rates per Size:</h3>
                        <ul className="list">
                            {service[index].rates}
                        </ul>
                    </div>
                    <Link to={user ? `/booking` : "/login"}className="nav-link book-btn">
                    Book Now
                    </Link>

                </div>
            </div>
        </div>
    );
}
 
export default PopupService;