import React, { useState, useEffect, useRef } from "react";
import SigningPanel from "../../components/SigningPanel";
import SecurityCode from "../../components/inputs/SecurityCode";

const FindAccountPanel = () => {
    // Change later to actually fetch email used
    const email = "placeholder@email.com";

    const [code, setCode] = useState(Array(6).fill(""));
    const [isButtonDisabled, setisButtonDisabled] = useState(true);
    const inputsRef = useRef([]);

    // Checks if all boxes are full everytime [code] is updated.
    useEffect(() => {
        const allFilled = code.every((digit) => digit !== "");
        setisButtonDisabled(!allFilled);
    }, [code]);

    //  Joins all digit of [code] inputs in each box
    const passCode = () => {
        console.log(code.join(""));
    };

    return (
        <form className="prompt" method="POST" action="">
            {/* TOP HALF PROMPT/S */}
            <div className="main-prompt">
                <div className="prompt-pages">
                    <div className="page">
                        <h2>ENTER VERIFICATION ACCOUNT</h2>
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
                            <a
                                className="prompt-btn"
                                onClick={(e) => passCode()}
                                disabled={isButtonDisabled}
                            >
                                Verify
                            </a>
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