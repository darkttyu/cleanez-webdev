import SigningPanel from "../../components/SigningPanel";
import MailAndPhone from "../../components/inputs/EmailAndPhone";

const FindAccountPanel = () => {
    return ( 
        <form className="prompt" method="POST" action="">
            {/* TOP HALF PROMPT/S */}
            <div className="main-prompt">
                <div className="prompt-pages">
                    <div className="page">
                        <h2>FIND YOUR ACCOUNT</h2>
                        {/* DESCRIPTION HERE */}
                        <p className="description">Please enter your email or mobile number to search for your account.</p>
                        {/* INPUTS HERE */}
                        <div className="inputs">
                            <MailAndPhone/>
                        </div>
                        {/* BUTTON HERE */}
                        <div className="buttons">
                            <a className="prompt-btn cancel">Cancel</a>
                            <a className="prompt-btn" type="submit">Login</a>
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