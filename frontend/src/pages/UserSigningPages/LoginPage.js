import { useState } from "react";
import SigningPanel from "../../components/SigningPanel";
import MailAndPhone from "../../components/inputs/EmailAndPhone";
import Password from "../../components/inputs/Password";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginPanel = () => {

    const [loginCredentials, setLogInData] = useState({
        login: '',
        password: ''
    });

    const handleLogInData = (e) => {
        const {name, value} = e.target;

        try {
            setLogInData({
                ...loginCredentials,
                [name]: value
            });
        } catch (error) {
            console.error("Error in Logging In", error);
        }
        
    }

    const handleLogInSubmission = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', loginCredentials, {
                headers: { 'Content-Type': 'application/json' }
              });
            
            // For Data Checking, Comment when Deploying
            console.log("Passed Data: ", loginCredentials); // Data Checker
            console.log("Login Completed:", response.data);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    }

    return (  
        <form className="prompt" method="POST" onSubmit={handleLogInSubmission}>
            {/* TOP HALF PROMPT/S */}
            <div className="main-prompt">
                <div className="prompt-pages">
                    <div className="page">
                        <h1>LOGIN</h1>
                        {/* INPUTS HERE */}
                        <div className="inputs">
                            <MailAndPhone value={loginCredentials.login} onChange={handleLogInData}/>
                            <Password value={loginCredentials.password} onChange={handleLogInData}/>
                        </div>
                        {/* BUTTON HERE */}
                        <div className="buttons">
                            <button className="prompt-btn" type="submit">Login</button>
                        </div>
                        {/* OTHERS HERE */}
                        <p>
                            <a className="forgot-pass" href="">Forgot Password?</a>
                        </p>
                    </div>
                </div>
            </div>
            {/* BOTTOM HALF PROMPT/S */}
            <div className="external-prompt">
                <p className="description">
                    Don't have an account yet? <Link to="/signup" className="prompt-link">
                    Sign Up.</Link>
                </p>
            </div>
        </form>
    );
}

const LoginPage = () => {
    return (  
        <SigningPanel inputPanel={<LoginPanel/>}/>
    );
}
 
export default LoginPage;