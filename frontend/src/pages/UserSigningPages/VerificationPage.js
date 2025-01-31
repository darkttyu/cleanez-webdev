// Import Statements --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
// --- Component Import/s
import SigningPanel from "../../components/SigningPanel";
import SecurityCode from "../../components/inputs/SecurityCode";
// --- Other/React Import/s
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../AuthContext";
import axios from "axios";

// Main Page Component --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
const FindAccountPanel = () => {
    // Variables Initialization --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    // --- Context Authenticator
    const {user} = useAuth();
    // --- Email Variable
    const email = user.email;
    // --- Code Input Generator
    const [code, setCode] = useState(Array(6).fill(""));
    // --- Input Reference
    const inputsRef = useRef([]);
    // --- Submit Button Disabler
    const [isButtonDisabled, setisButtonDisabled] = useState(true);


    // Functions  --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    // --- Checks if all boxes are full everytime [code] is updated.
    useEffect(() => {
        const allFilled = code.every((digit) => digit !== "");
        setisButtonDisabled(!allFilled);
    }, [code]);
    // --- Joins all digit of [code] inputs in each box
    const passCode = () => {
        return code.join();
    };

    const handleVerificationEmail = async (e) => {
        e.preventDefault();
    
        // Joins all digit of [code inputs in each box]
        const verificationCode = code.join("");
    
        try {
            const response = await axios.post(
                'https://cleanez-api.vercel.app/api/auth/verify-email', 
                { code: verificationCode }, 
                { headers: { 'Content-Type': 'application/json' } }
            );
    
            console.log(response.data);
    
            /*
            if (response.status === 201) {
                // for handling and navigation after verification email
            }
            */
        } catch (error) {
            console.error("Error verifying email:", error.response?.data || error.message);
        }
    };

    // Page Render --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    return (
        <form className="prompt" method="POST" onSubmit={handleVerificationEmail}>
            {/* TOP HALF PROMPT/S */}
            <div className="main-prompt">
                <div className="prompt-pages">
                    <div className="page">
                        <h2>ENTER VERIFICATION CODE</h2>
                        {/* DESCRIPTION HERE */}
                        <p className="description">We've sent a code to {email}</p>
                        {/* INPUTS HERE */}
                        <div className="inputs">
                            <SecurityCode
                                code={code}
                                setCode={setCode}
                                inputsRef={inputsRef}
                            />
                        </div>
                        {/* BUTTON HERE */}
                        <div className="buttons">
                            <button
                                className="prompt-btn"
                                onClick={(e) => passCode()}
                                disabled={isButtonDisabled}>
                                Verify
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

const FindAccountPage2 = () => {
    return (
        <SigningPanel inputPanel={<FindAccountPanel/>}/>
    );
}

export default FindAccountPage2;