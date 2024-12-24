// Import Statements --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
// --- Component Import/s
import SigningPanel from "../../components/SigningPanel";
import SecurityCode from "../../components/inputs/SecurityCode";
// --- Other/React Import/s
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../AuthContext";


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
        console.log(code.join(""));
    };


    // Page Render --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    return (
        <form className="prompt" method="POST" action="">
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