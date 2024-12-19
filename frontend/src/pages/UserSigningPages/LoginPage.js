import SigningPanel from "../../components/SigningPanel";
import MailAndPhone from "../../components/inputs/EmailAndPhone";
import Password from "../../components/inputs/Password";

const LoginPanel = () => {
    return (  
        <form className="prompt" method="POST" action="">
            {/* TOP HALF PROMPT/S */}
            <div className="main-prompt">
                <div className="prompt-pages">
                    <div className="page">
                        <h1>LOGIN</h1>
                        {/* INPUTS HERE */}
                        <div className="inputs">
                            <MailAndPhone/>
                            <Password/>
                        </div>
                        {/* BUTTON HERE */}
                        <div className="buttons">
                            <a className="prompt-btn" type="submit">Login</a>
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
                    Don't have an account yet? <a className="prompt-link" href="">Sign Up.</a>
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