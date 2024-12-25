// Import Statements --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
// --- Component Import/s
import SigningPanel from "../../components/SigningPanel";
import MailAndPhone from "../../components/inputs/EmailAndPhone";
// --- Other/React Import/s
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const FindAccountPanel = () => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleResetPassEmail = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/forgot-password', 
                { email }, 
                { headers: { 'Content-Type': 'application/json' } }
            );

            console.log(response.data);
        } catch (error) {
            console.error("Error verifying email:", error.message);
        }
    };

    
    return ( 
        <form className="prompt" method="POST" onSubmit={handleResetPassEmail}>
            {/* TOP HALF PROMPT/S */}
            <div className="main-prompt">
                <div className="prompt-pages">
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
                            <button className="prompt-btn" type="submit">Verify</button> {/* PRE PABAGO STYLING NITO, YUNG CANCEL AND VERIFY SAME SIZE THEN NASA TAAS YUNG CANCEL THEN BABA YUNG VERIFY */}
                        </div>
                    </div>
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