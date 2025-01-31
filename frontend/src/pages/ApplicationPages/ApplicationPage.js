// Import Statements --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
import { useAuth } from '../../AuthContext';
import NavLogo from '../../images/logos/nav-logo.png'
import '../../styles/BookingPage.css';
import SVGIcons from "../../SVGIcons";
import {PersonalInfo, ServiceInfo, FileSubmission} from "../../components/ApplicantForm";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ApplicationPage = () => {
    // Variables Initialization --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    // --- Context Authenticator
    const { user } = useAuth();
    const navigate = useNavigate();
    // --- Main Variables
    const [serviceList, setServicesList] = useState([])
    const [applicantInfo, setApplicantInfo] = useState({
        firstName: '',
        lastName: '',
        serviceCategory: '0',
        areaAssigned: '0',
        phoneNumber: '',
        email: '',
        address: {
            block: '',
            province: '',
            municipal: '',
            barangay: '',
        }
    });
    const [selectedFiles, setSelectedFiles] = useState({
        resume: null,
        ID1: null,
        ID2: null
    });
    // --- Other Variables
    const [page, setPage] = useState(0);
    const [showSubmit, setShowSubmit] = useState(false);
    const [disableSubmit, setDisabledSubmit] = useState(false);
    const [progressbar, setProgressbar] = useState('');
    const [isInfoComplete, setIsInfoComplete] = useState(false);

    // --- User Autofill Checkers
    const validateAndRedirect = () => {
        try {
            if (user) {
                setApplicantInfo({
                    ...applicantInfo,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    address: {
                        block: user.address.block,
                        province: user.address.province,
                        municipal: user.address.municipal,
                        barangay: user.address.barangay
                    }
                })
            } else {
                throw new Error("Missing required fields");
            }
        } catch (e) {
            console.log("Validation failed, User not signed in: ", e.message);
            navigate('/login');
        }
    }

    useEffect(() => {
        document.title = "CleanEZ | Application"
    }, [])

    useEffect(() => {
        if (user) {
            validateAndRedirect();
        } else {
            navigate('/login');
        }
    }, [user])

    // --- Fetches all Service Type Data
    useEffect(() => {
        const fetchServicesList = async () => {
            try {
                const response = await axios.get(`https://cleanez-api.vercel.app/api/appointment/getServices`, {
                    headers: { 
                        'Content-Type': 'application/json',
                    }
                });
                setServicesList(response.data.services);
            // --- --- Failed Fetching
            } catch (error) {
                console.error(error);
            }
        }

        fetchServicesList();
    }, []);

    const pageDisplay = () => {
        if (page === 0) {
            return (
                <PersonalInfo 
                applicantInfo={applicantInfo}
                setApplicantInfo={setApplicantInfo}
                setIsInfoComplete={setIsInfoComplete}/>
            )
        } else if (page === 1) {
            return (
                <ServiceInfo 
                applicantInfo={applicantInfo}
                setApplicantInfo={setApplicantInfo}
                setIsInfoComplete={setIsInfoComplete}
                serviceList={serviceList}/>
            )
        } else if (page === 2) {
            return (
                <FileSubmission 
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
                setIsInfoComplete={setIsInfoComplete}/>
            )
        } 
    }

    useEffect(() => {
        setIsInfoComplete(false);
        setShowSubmit(false);

        if (page === 0) setProgressbar('percent-0');
        else if (page === 1) setProgressbar('percent-50');
        else if (page === 2) {
            setProgressbar('percent-100');
            const timer = setTimeout(() => {
                setShowSubmit(true);
            }, 1000);

            return () => clearTimeout(timer);
        } 
    }, [page])


    // --- Creates Form
    const updateData = async (appInfo, selFiles) => {
        const form = new FormData();
        
        console.log("FORM FILES: ", appInfo, selFiles.resume, selFiles.ID1, selFiles.ID2);

        form.append("appInfo", JSON.stringify(appInfo));
        form.append("resume", selFiles.resume);
        form.append("ID1", selFiles.ID1);
        form.append("ID2", selFiles.ID2);

        return form;
    }

    // --- Handle Application Submission
    const handleApplicationSubmission = async (e) => {
        try {
            e.preventDefault();
            setDisabledSubmit(true);

            const token = localStorage.getItem("token");

            const formData = await updateData(applicantInfo, selectedFiles);

            const response = await axios.post(
                `https://cleanez-api.vercel.app/api/applicant/submitApplicationForm`,
                formData,
                {
                    headers: { 
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
        
            console.log("Passed Data: ", applicantInfo); 
            console.log("Application Completed:", response.data.message);
            
            navigate(`/application/success`);
        } catch (e) {
            console.log(e);
        } finally {
            setDisabledSubmit(false);
        }
    }

    return (  
        <>
            <nav className="navbar">
                <Link to="/home">
                    <img className="nav-logo" src={NavLogo} alt="Logo" />
                </Link>
                <div className='nav-divider'></div>
                <h1 className='nav-title'>Application</h1>
            </nav>
            <div className='booking-content'>
                <header className='booking-progress'>
                    <p className='instructions'>To apply for a job position, please fill out the information below.</p>
                    <div className='progress-bar'>
                        <div className={`progress ${progressbar}`}></div>
                    </div>
                    <div className="progress-numbers">
                        {Array.from({ length: 3 }, (_, index) => (
                            <div
                                key={index}
                                className={`progress-number ${page === index ? "active" : ""}`}
                            >
                                <p>{index + 1}</p>
                            </div>
                        ))}
                    </div>
                </header>
                <form className='booking-container'  method="POST" onSubmit={handleApplicationSubmission}>
                    <div className='booking-container-content'>
                        {pageDisplay()}
                    </div>
                    <div className='booking-navigation'>
                        {page !== 0 ? (
                            <button
                            type="button"
                            className="booking-btn left" 
                            onClick={() =>{
                                setPage((currPage) => currPage - 1);
                            }}
                            >
                                <SVGIcons 
                                selected="previousArrow" 
                                size="40"
                                color="#4B4B4B"/>
                            </button>
                        ) : (<></>)}
                        
                        {(page !== 2 && isInfoComplete) ? (
                            <button
                            type="button"
                            className="booking-btn right" 
                            onClick={() =>{
                                setPage((currPage) => currPage + 1);
                            }}>
                                <SVGIcons 
                                selected="forwardArrow" 
                                size="40"
                                color="#4B4B4B"/>
                            </button>
                        ) : (<></>)}

                        {(page === 2 && isInfoComplete) ? (
                            <button 
                            type="submit"
                            className='booking-submit-btn booking-btn right'
                            disabled={disableSubmit}
                            >
                                {disableSubmit? "Submitting..." : "Confirm and Submit"}
                            </button>
                        ) : (<></>)}
                    </div>
                </form>
            </div>
        </>
    );
}
 
export default ApplicationPage;