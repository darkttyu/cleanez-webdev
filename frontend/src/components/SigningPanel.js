import '../styles/UserSigning.css';
import bg from "../images/assets/bg-signing-nograin.svg";
import logoIcon from "../images/logos/Logo-1-2.svg";
import logoText from "../images/logos/Logo-4-1.svg";

const SigningPanel = ({inputPanel}) => {
    return (  
        <div>
            <div className="signing-panel">
                <div className="branding">
                        <img 
                        className="logo" 
                        src={logoIcon} alt="" />
                        <img 
                        className="text" 
                        src={logoText} alt="" />
                </div>
                {inputPanel}
            </div>
            <figure className="background">
                <img src={bg} alt="" />
            </figure>
        </div>
    ); 
}

export default SigningPanel;