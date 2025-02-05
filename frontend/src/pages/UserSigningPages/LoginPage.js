// Import Statements --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
// --- Component Import/s
import SigningPanel from "../../components/SigningPanel";
import MailAndPhone from "../../components/inputs/EmailAndPhone";
import Password from "../../components/inputs/Password";
// --- Other/React Import/s
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import axios from "axios";


// Main Page Component --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
const LoginPanel = ({route}) => {
    // Variables Initialization --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    // --- Context Authenticator
    const {login} = useAuth();   
    // --- Navigation Variable 
    const navigate = useNavigate();
    // --- Login Data Credentials
    const [loginCredentials, setLogInData] = useState({
        login: '',
        password: ''
    });
    // --- Submit Button Disabler
    const [isDisabled, setIsDisabled] = useState(true);
    // --- Error Message Shower
    const [showError, setShowError] = useState("");


    // Functions  --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    // --- Checks Email/Phone Format Validity
    const isEmailPhoneValid = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{11}$/;
        return emailRegex.test(value) || (phoneRegex.test(value))
    }
    // --- Checks both Email/Phone and Password Format Validity in each Input
    useEffect(() => {
        const isLoginValid = isEmailPhoneValid(loginCredentials.login) && loginCredentials.login.trim() !== '';
        const isPasswordValid = loginCredentials.password.trim() !== '';
        setIsDisabled(!(isLoginValid && isPasswordValid));
    }, [loginCredentials]);
    // --- Saves Login Data in each Input
    const handleLogInData = (e) => {
        const {name, value} = e.target;
        try {
            setShowError("");
            setLogInData({
                ...loginCredentials,
                [name]: value
            });
        } catch (error) {
            console.error("Error in Logging In", error);
        }     
    }
    // --- Verifies Login Data after Submission
    const handleLogInSubmission = async (e) => {
        e.preventDefault();
        // --- --- Successfull Login    
        try {
            const response = await axios.post(`http://localhost:5000/api/auth/${route}`, loginCredentials, {
                headers: { 'Content-Type': 'application/json' }
              });

            // For Data Checking, Comment when Deploying
            console.log("Login Completed:", response.data);

            setIsDisabled(true)

            if (route === "login") {
                const token = response.data.token; // Token from the response
                localStorage.setItem("token", token); // Token saved in Local Storage
            localStorage.setItem("role", response.data.user.role);
                login(response.data.user)
                navigate(`/home`);
            } else if (route === "adminLogin") { // Token saved in Local Storage
                localStorage.setItem("role", response.data.admin.role);
                login(response.data.admin)
                navigate(`/admin`)
            }
        // --- --- Failed Login
        } catch (error) {
            console.log(error);
            // if (error.response.status === 400) {
            //     setShowError("show-error");
            // }  
        }
    }


    // Page Render --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    return (  
        <form className="prompt" method="POST" onSubmit={handleLogInSubmission}
        >
            {/* TOP HALF PROMPT/S */}
            <div className="main-prompt">
                <div className="prompt-pages">
                    <div className="page">
                        <h1>{(route !== "adminLogin") ? "LOGIN" : "LOGIN AS ADMIN"}</h1>
                        {/* INPUTS HERE */}
                        <div className="inputs">
                            <MailAndPhone value={loginCredentials.login} onChange={handleLogInData}/>
                            <Password value={loginCredentials.password} onChange={handleLogInData}/>
                        </div>
                        <p className={`error-message ${showError}`}>Login failed. Please check your email/phone and password.</p>
                        {/* BUTTON HERE */}
                        <div className="buttons">
                            {(route === "adminLogin") ? 
                                (<button className="prompt-btn" type="submit">Login</button>)
                                :
                                (<button className="prompt-btn" type="submit" disabled={isDisabled}>Login</button>)
                            }   
                        </div>
                        {/* OTHERS HERE */}
                        <p>
                            <Link to="/forgot-password" className="forgot-pass">Forgot Password?</Link>
                        </p>
                    </div>
                </div>
            </div>
            {/* BOTTOM HALF PROMPT/S */}
            {(route !== "adminLogin") ?
                <div className="external-prompt">
                <p className="description">
                    Don't have an account yet? <Link to="/signup" className="prompt-link">
                    Sign Up.</Link>
                </p>
            </div> :
            <></>
            }
            
        </form>
    );
}

const LoginPage = ({route}) => {
    return (  
        <SigningPanel inputPanel={<LoginPanel route={route}/>}/>
    );
}
 
export default LoginPage;