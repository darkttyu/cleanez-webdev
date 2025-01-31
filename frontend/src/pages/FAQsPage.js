// Import Statements --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
// --- Styling Import/s
import "../styles/FAQsPage.css"
// --- Component Import/s
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FAQuestionBox from "../components/FAQuestionBox";
// --- React Import/s
import { useState,useEffect } from "react";


// Main Page Component --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
const FAQsPage = () => {
    // Variables Initialization --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    // --- FAQ List
    const details = [
        {questions:{
                eng: "How long is each cleaning session?",
                fil: "Gaano katagal ang bawat cleaning session?"
        },answers:{
                eng: "The duration depends on the size of your home and the type of service you book. On average, a session lasts between 1 to 8 hours.",
                fil: "Depende ang tagal sa laki ng bahay at uri ng serbisyong na-book. Karaniwan, tumatagal ito ng 1 hanggang 8 oras."
        }},
        {questions:{
                eng: "How many helpers will come to my house?",
                fil: "Ilang helpers ang pupunta sa bahay ko?"
        },answers:{
                eng: "We send a minimum of one cleaner for small spaces, but for larger homes or more extensive cleaning requests, we send a team of two or more helpers to ensure efficient service.",
                fil: "Nagpapadala kami ng isang cleaner para sa maliliit na espasyo, ngunit para sa mas malalaking bahay o mas maraming kailangang linisin, dalawang helpers o higit pa ang ipapadala para mas mabilis at maayos ang serbisyo."
        }},
        {questions:{
                eng: "What's included in each of the services?",
                fil: "Ano-ano ang kasama sa bawat serbisyo?"
        },answers:{
                eng: "Our standard services include general cleaning tasks such as sweeping, mopping, dusting, wiping surfaces, and taking out the trash. Deep cleaning services include additional tasks like scrubbing bathroom tiles, cleaning kitchen grease, and sanitizing high-touch areas.",
                fil: "Kasama sa aming standard na serbisyo ang general cleaning tulad ng pagwawalis, pag-mop, pagpunas ng mga ibabaw, at pagtatapon ng basura. Ang deep cleaning naman ay may kasamang dagdag na gawain tulad ng paglinis ng tiles sa banyo, pagtanggal ng grasa sa kusina, at pag-sanitize ng madalas na hinahawakang lugar."
        }},
        {questions:{
                eng: "Can I request other things to be done?",
                fil: "Pwede bang mag-request ng iba pang ipapagawa?"
        },answers:{
                eng: "Yes, you can! Additional requests, such as organizing shelves or washing dishes, can be accommodated depending on availability and with prior notice. Extra charges may apply for additional tasks.",
                fil: "Oo, maaari! Pwede kang mag-request ng dagdag na gawain tulad ng pag-aayos ng shelves o paguhugas ng pinggan, depende sa availability at may paunang abiso. Maaaring may karagdagang bayad para sa mga dagdag na gawain."
        }},
        {questions:{
                eng: "Do I have to pay for transportation?",
                fil: "Kailangan ko bang magbayad para sa transportasyon?"
        },answers:{
                eng: "No, transportation fees are already included in our service rates.",
                fil: "Hindi, kasama na sa service rates ang bayad sa transportasyon."
        }},
        {questions:{
                eng: "Do I need to prepare any cleaning materials?",
                fil: "Kailangan ko bang maghanda ng cleaning materials?"
        },answers:{
                eng: "Our cleaners typically bring their own cleaning supplies. However, if you prefer specific materials or brands to be used, you may provide them.",
                fil: "Karaniwang dala na ng aming cleaners ang kanilang sariling cleaning supplies. Ngunit kung may partikular kang gustong gamitin, pwede mong ipahanda ito."
        }},
        {questions:{
                eng: "Do I have to provide meals for them?",
                fil: "Kailangan ko bang maghanda ng pagkain para sa kanila?"
        },answers:{
                eng: "Providing meals is not required, but offering water or light snacks is always appreciated.",
                fil: "Hindi kinakailangan maghanda ng pagkain, ngunit maganda kung magbibigay ng tubig o konting meryenda bilang pasasalamat."
        }},
        {questions:{
                eng: "How do I book a cleaning service?",
                fil: "Paano ako magbo-book ng cleaning service?"
        },answers:{
                eng: "Simply download the CleanEz app, create an account, and choose the type of service, date, and time that works for you.",
                fil: "I-download ang CleanEz app, gumawa ng account, at pumili ng uri ng serbisyo, petsa, at oras na akma sa iyong iskedyul."
        }},
        {questions:{
                eng: "Can I cancel or reschedule my booking?",
                fil: "Pwede ko bang i-cancel o i-reschedule ang aking booking?"
        },answers:{
                eng: "Yes, you can cancel or reschedule your booking through the app. We recommend doing so at least 2 hours within the day to avoid cancellation fees.",
                fil: "Oo, pwede mong i-cancel o i-reschedule ang iyong booking sa app. Pinapayo namin na gawin ito nang hindi bababa sa 2 oras upang maiwasan ang cancellation fees."
        }},
        {questions:{
                eng: "How many times can I cancel an Appointment per month?",
                fil: "Ilang beses ko pwedeng ikansela ang appointment sa isang buwan?"
        },answers:{
                eng: "You can only cancel an appointment with a Maximum of 30 times a month.",
                fil: "Maaari lamang mag-cancel ng appointment ang isang user ng hanggang 30 beses kada buwan."
        }},
        {questions:{
                eng: "Is the service available in my area?",
                fil: "Available ba ang serbisyo sa lugar ko?"
        },answers:{
                eng: "CleanEz currently operates in Metro Manila and selected areas. Check the app to see if we cover your location.",
                fil: "Ang CleanEz ay kasalukuyang nag-ooperate sa Metro Manila at piling mga lugar. I-check ang app upang makita kung sakop namin ang inyong lugar."
        }},
        {questions:{
                eng: "Can I choose my preferred cleaner?",
                fil: "Pwede bang pumili ng preferred cleaner?"
        },answers:{
                eng: "We assign cleaners based on availability and proximity to your location. While preferences cannot always be guaranteed, you can request a specific cleaner for future bookings if they’re available.",
                fil: "Inaa-assign namin ang cleaners base sa availability at lapit sa iyong lugar. Bagamat hindi palaging guaranteed ang preferences, pwede kang mag-request ng partikular na cleaner para sa mga susunod na bookings kung available sila."
        }},
        {questions:{
                eng: "Is the app safe and secure?",
                fil: "Ligtas ba at secure ang app?"
        },answers:{
                eng: "Yes, CleanEz prioritizes user security. Our platform uses encrypted transactions and only partners with verified, professional cleaning agencies.",
                fil: "Oo, inuuna ng CleanEz ang seguridad ng users. Ang aming platform ay gumagamit ng encrypted transactions at nakikipag-partner lamang sa mga verified at propesyonal na cleaning agencies."
        }},
        {questions:{
                eng: "What payment methods do you accept?",
                fil: "Anong paraan ng pagbabayad ang tinatanggap ninyo?"
        },answers:{
                eng: "We accept various payment methods, including credit/debit cards, e-wallets like GCash or Maya, and cash on the day.",
                fil: "Tumatanggap kami ng iba't ibang paraan ng pagbabayad tulad ng credit/debit cards, e-wallets gaya ng GCash o Maya, at cash sa mismong araw ng paggawa ng serbisyo."
        }},
        {questions:{
                eng: "What if I’m not satisfied with the cleaning service?",
                fil: "Paano kung hindi ako nasiyahan sa cleaning service?"
        },answers:{
                eng: "If you’re not satisfied, you can report your concerns through the app. We’ll review the case and, if necessary, offer compensation or arrange for a follow-up cleaning session.",
                fil: "Kung hindi ka nasiyahan, pwede mong i-report ang concerns mo sa app. Ire-review namin ito, at kung kinakailangan, magbibigay kami ng compensation o mag-aayos ng follow-up cleaning session."
        }},
        {questions:{
                eng: "Do you offer regular or recurring cleaning services?",
                fil: "Nag-aalok ba kayo ng regular o paulit-ulit na cleaning services?"
        },answers:{
                eng: "Yes, you can book weekly, bi-weekly, or monthly cleaning sessions through the app for ongoing maintenance of your space.",
                fil: "Oo, pwede kang mag-book ng weekly, bi-weekly, o monthly cleaning sessions sa app para sa regular na pag-maintain ng iyong espasyo."
        }},
        {questions:{
                eng: "What if I have pets at home?",
                fil: "Paano kung may mga alagang hayop ako sa bahay?"
        },answers:{
                eng: "No problem! Just let us know in advance so we can assign cleaners comfortable with pets. You may also need to secure your pets during the session for everyone’s safety.",
                fil: "Walang problema! Sabihan lang kami nang maaga upang ma-assign ang cleaners na sanay sa alagang hayop. Maaaring kailanganin ding isecure ang iyong mga alaga habang naglilinis para sa kaligtasan ng lahat."
        }},
        {questions:{
                eng: "Do you clean during holidays or weekends?",
                fil: "Nagbibigay ba kayo ng serbisyo tuwing holiday o weekend?"
        },answers:{
                eng: "Yes, CleanEz offers services on weekends and holidays, subject to cleaner availability. Book early to secure your preferred schedule.",
                fil: "Oo, nagbibigay ang CleanEz ng serbisyo tuwing weekend at holiday, depende sa availability ng cleaners. Mag-book nang maaga upang masigurado ang inyong preferred schedule."
        }},
        {questions:{
                eng: "Can I book a cleaning service for the same day?",
                fil: "Pwede ba akong mag-book ng cleaning service para sa parehong araw?"
        },answers:{
                eng: "No, same-day bookings are not possible due to security reasons. As much as possible, we want to avoid scheduling  conflicts and false bookings.",
                fil: "Hindi posible ang same-day bookings dahil sa mga kadahilanang pangseguridad. Hangga't maaari, nais naming maiwasan ang mga iskedyul na nagkakabanggaan at mga pekeng bookings."
        }},
        {questions:{
                eng: "Do you offer specialized cleaning services like carpet or upholstery cleaning?",
                fil: "Nag-aalok ba kayo ng specialized cleaning services tulad ng paglinis ng carpet o upholstery?"
        },answers:{
                eng: "Yes, we offer specialized services such as carpet cleaning, upholstery cleaning, and even post-construction clean-ups. Check the app for available options.",
                fil: "Oo, nag-aalok kami ng specialized services tulad ng paglinis ng carpet, upholstery, at post-construction clean-ups. Tingnan ang app para sa mga available na serbisyo."
        }},
        {questions:{
                eng: "What happens if the cleaners accidentally damage something?",
                fil: "Paano kung may nasira ang cleaners habang naglilinis?"
        },answers:{
                eng: "We prioritize careful cleaning, but in the rare case of accidental damage, you can report it through the app. We’ll investigate and resolve the issue promptly.",
                fil: "Iniiwasan namin ang anumang aksidente, ngunit kung sakaling may masira, pwede mo itong i-report sa app. Ire-review namin ang insidente at agad na aayusin ang problema."
        }},
        {questions:{
                eng: "Do you offer cleaning services for offices or commercial spaces?",
                fil: "Nagbibigay ba kayo ng serbisyo para sa mga opisina o commercial spaces?"
        },answers:{
                eng: "Yes, CleanEz also caters to offices, small businesses, and commercial spaces. You can select this option when booking through the app.",
                fil: "Oo, nag-aalok din ang CleanEz ng serbisyo para sa mga opisina, maliliit na negosyo, at commercial spaces. Pwede mong piliin ang option na ito kapag nag-book sa app."
        }},
        {questions:{
                eng: "Is tipping required?",
                fil: "Kailangan bang magbigay ng tip?"
        },answers:{
                eng: "Tipping is not required but is always appreciated as a gesture of gratitude for a job well done.",
                fil: "Hindi kinakailangan ang pagbigay ng tip, ngunit ikinagagalak ito bilang pasasalamat sa maayos na serbisyo."
        }},
        {questions:{
                eng: "Can I reschedule if there’s bad weather?",
                fil: "Pwede bang mag-reschedule kung masama ang panahon?"
        },answers:{
                eng: "Yes, you can reschedule your cleaning appointment through the app at no extra charge due to unforeseen weather conditions.",
                fil: "Oo, pwede mong i-reschedule ang iyong cleaning appointment sa app nang walang dagdag na bayad kung dahil ito sa hindi inaasahang lagay ng panahon."
        }},
        {questions:{
                eng: "How do I know if the cleaners are trustworthy?",
                fil: "Paano ko malalaman kung maaasahan ang cleaners?"
        },answers:{
                eng: "All our cleaners are thoroughly screened, background-checked, and trained before joining the CleanEz network.",
                fil: "Ang lahat ng aming cleaners ay dumaan sa masusing screening, background check, at training bago sila maging bahagi ng CleanEz network."
        }},
        {questions:{
                eng: "Is there customer support if I need help?",
                fil: "May customer support ba kung kailangan ko ng tulong?"
        },answers:{
                eng: "Yes, our customer support team is available via the app for any questions, issues, or feedback.",
                fil: "Oo, may customer support team kami na pwede mong ma-contact sa app para sa anumang tanong, isyu, o feedback."
        }},    
    ]
    // --- Searchbar Value
    const [searchWords, setSearchWords] = useState([]);
    // --- FAQ List compared to Searchbar Value
    const [filteredDetails, setFilteredDetails] = useState(details);


    // Functions  --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    // --- Extracts Searchbar Value
    const handleSearch = (value) => {
        setSearchWords((value.trim()).split(' '));
    }

    // --- Filters the FAQ List
    useEffect(() => {
        if (searchWords.length === 0) {
            setFilteredDetails(details);
        } else {
            const filtered = details.filter((detail) =>
                searchWords.some((word) =>
                    detail.questions.eng.toLowerCase().includes(word.toLowerCase()) ||
                    detail.questions.fil.toLowerCase().includes(word.toLowerCase()) ||
                    detail.answers.eng.toLowerCase().includes(word.toLowerCase()) ||
                    detail.answers.fil.toLowerCase().includes(word.toLowerCase())
                )
            );
            setFilteredDetails(filtered);
        }
    }, [searchWords]);

    // Page Render --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    return (  
        <div>
            <Navbar />
            <header className="faq-header">
                <h1 className="page-title">Frequently Asked Questions</h1>
                <h2 className="main-quote">Ask Us Anything</h2>
                <p className="sub-quote">Have any questions? We're here to assist you</p>
                <div className="searchbar-container">
                    <input 
                    type="text" 
                    placeholder="Search"
                    className="question-searchbar"
                    name="question-searchbar" 
                    id="question-searchbar" 
                    onChange={(e) => handleSearch(e.target.value)}/>
                </div>
                
            </header>
            <main className="questions-container">
                {filteredDetails.map((detail, index) => (
                    <FAQuestionBox questions={detail.questions} answers={detail.answers} key={index} />
                ))}
            </main>
            <Footer/>
        </div>
    );
}
 
export default FAQsPage;