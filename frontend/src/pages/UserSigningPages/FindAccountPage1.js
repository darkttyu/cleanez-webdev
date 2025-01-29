// Import Statements --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
// --- Component Import/s
import SigningPanel from "../../components/SigningPanel";
import MailAndPhone from "../../components/inputs/EmailAndPhone";
import SVGIcons from "../../SVGIcons";
// --- Other/React Import/s
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FindAccountPanel = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');

    const [disableSubmit, setDisableSubmit] = useState(true);
    const [isSuccesful, setIsSuccesful] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleResetPassEmail = async (e) => {
        e.preventDefault();
        
        setDisableSubmit(false);

        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/forgot-password', 
                { email }, 
                { headers: { 'Content-Type': 'application/json' } }
            );

            console.log(response.data);

            setIsSuccesful(true);
            setTimeout(() => {
                navigate("/home");
            }, 5000);
        } catch (error) {
            console.error("Error verifying email:", error.message);
        } finally {
            setDisableSubmit(true);
        }
    };

    
    return ( 
        <form className="prompt" method="POST" onSubmit={handleResetPassEmail}>
            {/* TOP HALF PROMPT/S */}
            <div className="main-prompt">
                <div className="prompt-pages">
                {
                    isSuccesful ? 
                    <div className="page">
                        <div className='success-message'>
                            <SVGIcons 
                            selected="checkSuccess" 
                            size="162" 
                            color="#06E36D"
                            />
                            <h2>Password Successfully Requested.</h2>
                            <p className="description">Please check your e-mail ( <strong><span>{email}</span></strong> ) to reset your password.
                            <br /><br />
                            You are now being redirected to the Home Page in 5 seconds...</p>
                        </div>
                    </div> :
                    <div className="page">
                        <h2>FIND YOUR ACCOUNT</h2>
                        {/* DESCRIPTION HERE */}
                        <p className="description">Please enter your email or mobile number to search for your account.</p>
                        {/* INPUTS HERE */}
                        <div className="inputs">
                            <MailAndPhone value={email} onChange={handleEmailChange}/>
                        </div>
                        {/* BUTTON HERE */}
                        <div className="buttons">
                            <Link to="/login" className="prompt-btn cancel">Cancel</Link>
                            <button 
                            className="prompt-btn" 
                            disabled={!disableSubmit}
                            type="submit">
                                {disableSubmit ? "Verify" : "Verifying..."}
                            </button>
                        </div>
                    </div>
                }   
                </div>
            </div>
        </form>
    );
}

const FindAccountPage1 = () => {
    return (
        <SigningPanel inputPanel={<FindAccountPanel/>}/>
    );
}

export default FindAccountPage1;