import SigningPanel from "../../components/SigningPanel";
import PasswordNew from "../../components/inputs/PasswordNew";
import PasswordConfirm from "../../components/inputs/PasswordConfirm";

const FindAccountPanel = () => {
    return (  
        <form className="prompt" method="POST" action="">
            {/* TOP HALF PROMPTS */}
            <div className="main-prompt">
                <div className="prompt-pages">
                    <div className="page">
                            <h2>CREATE NEW PASSWORD</h2>
                            {/* DESCRIPTION HERE */}
                            <p className="description">Your new password must be different from previous used passwords.</p>
                            {/* INPUTS HERE */}
                            <div className="inputs">
                                <PasswordNew/>
                                <PasswordConfirm/>
                            </div>
                            {/* BUTTON HERE */}
                            <div className="buttons">
                                <a className="prompt-btn">Reset Password</a>
                            </div>
                    </div>
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