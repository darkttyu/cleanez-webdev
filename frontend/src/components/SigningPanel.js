import '../styles/UserSigning.css';
import bg from "../images/assets/bg-signing-nograin.svg";

const SigningPanel = ({inputPanel}) => {
    return (  
        <div>
            <div className="signing-panel">
                <div className="branding">
                        <img 
                        className="logo" 
                        src={process.env.PUBLIC_URL + '/images/logos/Logo-1-2.svg'} alt="" />
                        <img 
                        className="text" 
                        src={process.env.PUBLIC_URL + '/images/logos/Logo-4-1.svg'} alt="" />
                </div>
                {/* <LoginPanel /> */}
                {/* <FindAccPanel1 /> */}
                {/* <FindAccPanel2 /> */}
                {/* <FindAccPanel3 /> */}
                {/* <SignUpPanel /> */}
                {inputPanel}
            </div>
            <figure className="background">
                <img src={bg} alt="" />
            </figure>
        </div>
    ); 
}

export default SigningPanel;