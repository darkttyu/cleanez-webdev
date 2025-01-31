import SigningPanel from "../../components/SigningPanel";
import PasswordNew from "../../components/inputs/PasswordNew";
import PasswordConfirm from "../../components/inputs/PasswordConfirm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import SVGIcons from "../../SVGIcons";

const FindAccountPanel = () => {
    const token = useParams();
    const navigate = useNavigate();

    const [finalPassword, setFinalPassword] = useState({
        password: ''
    });
    const [passwordNew, setPasswordNew] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const [disable, setDisable] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccesful, setIsSuccesful] = useState(false);

    const handleNewPassword = (e) => {
        setPasswordNew  (e.target.value);
    };

    const handleConfirmPassword = (e) => {
        setPasswordConfirm(e.target.value);
    };

    useEffect(() => {
        setErrorMessage("");
        console.log(token.id);
    }, []);

    const verifyPasswords = (pass1, pass2) => {
        setDisable(true);

        if (pass1 === "" || pass2 === "") {
            setErrorMessage("");
            return false;
        }

        const isPass1Valid = (
            /^(?=.*[a-z]).*$/.test(pass1) && 
            /^(?=.*[A-Z]).*$/.test(pass1) &&
            /^(?=.*\d).*$/.test(pass1) &&
            /^(?=.*[\W_]).*$/.test(pass1) &&
            (pass1.length >= 8)
        );
        const isPass2Valid = (
            /^(?=.*[a-z]).*$/.test(pass2) && 
            /^(?=.*[A-Z]).*$/.test(pass2) &&
            /^(?=.*\d).*$/.test(pass2) &&
            /^(?=.*[\W_]).*$/.test(pass2) &&
            (pass2.length >= 8)
        );
        if (!isPass1Valid && !isPass2Valid) {
            setErrorMessage("Password/s you have entered has an invalid format. Make sure to include an uppercase & lower case letter, number, symbol, and has the length of 8-25.");
            return false;
        }

        if (pass1 !== pass2) {
            setErrorMessage("Passwords you have entered do not match. Please try again.");
            return false;
        }

        setDisable(false);
        setErrorMessage("");
        return true;
    }

    useEffect(() => {
        if(verifyPasswords(passwordNew, passwordConfirm)){
            console.log(passwordConfirm);
            setFinalPassword({
                password: passwordConfirm
            });
        }

    }, [passwordNew, passwordConfirm])
    
    const handleSubmission = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`https://cleanez-api.vercel.app/api/auth/reset-password/${token.id}`, finalPassword)
            setDisable(true);
            setIsSubmitting(true);
            console.log(response);

            setIsSuccesful(true);
            setTimeout(() => {
                navigate("/login");
            }, 5000);
        } catch (e) {
            console.log(e);
        } finally {
            setDisable(false);
            setIsSubmitting(false);
        }
    }


    return (  
        <form className="prompt" method="POST" onSubmit={handleSubmission}>
            {/* TOP HALF PROMPTS */}
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
                                <h2>Password Successfully Resetted.</h2>
                                <p className="description">You are now being redirected to the Login Page in 5 seconds...</p>
                            </div>
                        </div> :
                        <div className="page">
                            <h2>CREATE NEW PASSWORD</h2>
                            {/* DESCRIPTION HERE */}
                            <p className="description">Your new password must be different from previous used passwords.</p>
                            {/* INPUTS HERE */}
                            <div className="inputs">
                                <PasswordNew value={passwordNew} onChange={handleNewPassword}/>
                                <PasswordConfirm value={passwordConfirm} onChange={handleConfirmPassword}/>
                            </div>
                            {(errorMessage !== "") ?
                                <p className={`error-message show-error`}>{errorMessage}</p> :
                                <></>
                            }
                            
                            {/* BUTTON HERE */}
                            <div className="buttons">
                                <button 
                                className="prompt-btn"
                                disabled = {disable}
                                onClick={handleSubmission}>
                                {isSubmitting ?  
                                    "Resetting..." :   
                                    "Reset Password" 
                                }
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>  
        </form>
    );
}

const FindAccountPage3 = () => {
    return (
        <SigningPanel inputPanel={<FindAccountPanel/>}/>
    );
}
 
export default FindAccountPage3;