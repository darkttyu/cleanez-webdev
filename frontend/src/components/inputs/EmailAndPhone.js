import SVGIcons from "../../SVGIcons";

const InputMailAndPhone = ({value, onChange}) => {
    return (  
        <div className="floating-input-container">
            {/* INPUT HERE */}
            <input 
            className="input-bar with-logo" 
            type="text" 
            placeholder="Email or Mobile Number" 
            value={value}
            onChange={onChange}
            name="login" 
            id="mail-sms-input"/>
            {/* LABEL HERE */}
            <label 
            className="floating-label"
            htmlFor="mail-sms-input">
                Email or Mobile Number
            </label>
            {/* ICON HERE */}
            <SVGIcons 
            className="input-logo"
            selected="inputMail"
            size="20px"
            color="var(--monoc4-50)"/>
        </div>
    );
}

export default InputMailAndPhone;