import SVGIcons from "../../SVGIcons";

const InputPhone = ({value, onChange, disabled=false}) => {
    return (  
        <div className="floating-input-container">
            {/* INPUT HERE */}
            <input 
            className="input-bar with-logo" 
            type="text" 
            placeholder="Phone Number" 
            name="phoneNumber"
            value={value}
            onChange={onChange} 
            disabled = {disabled}
            id="sms-input"/>
            {/* LABEL HERE */}
            <label 
            className="floating-label" 
            htmlFor="sms-input">
                Phone Number
            </label>
            <SVGIcons 
            className="input-logo"
            selected="inputPhone"
            size="20px"
            color="var(--monoc4-50)"/>
        </div>
    );
}
 
export default InputPhone;