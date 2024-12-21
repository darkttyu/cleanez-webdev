import {useState, useEffect, useRef} from 'react';

const InputSecurityCode = ({code, setCode, inputsRef }) => {
    // Event for typing the security code
    const handleInput = (value, index) => {
        if (/^\d?$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
        
            if (value && index < code.length - 1) {
                inputsRef.current[index + 1].focus();
            }
        }
    };
    
    // Event for deleting using backspace
    const handleBackspace = (event, index) => {
        if (event.key === "Backspace" && !code[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };
    
    return (
        <div className="input-container" id="security-code-input">
            {/* INPUT HERE */}
            {code.map((digit, index) => (
                <input
                    key={index}
                    ref={(el) => (inputsRef.current[index] = el)}
                    className="code-input"
                    type="text"
                    maxLength="1"
                    value={digit}
                    onInput={(e) => handleInput(e.target.value, index)}
                    onKeyDown={(e) => handleBackspace(e, index)}
                    required
                />
            ))}
        </div>
    );
};
 
export default InputSecurityCode;