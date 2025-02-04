import SVGIcons from "../../SVGIcons";

const InputEmail = ({value, onChange, disabled=false}) => {
    return (  
        <div className="floating-input-container">
            {/* INPUT HERE */}
            <input 
            className="input-bar with-logo" 
            type="text" 
            placeholder="Email" 
            name="email" 
            value={value}
            onChange={onChange}
            disabled = {disabled}
            id="mail-input"/>
            {/* LABEL HERE */}
            <label 
            className="floating-label"
            htmlFor="mail-input">
                Email
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
 
export default InputEmail;