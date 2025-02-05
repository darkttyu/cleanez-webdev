import SVGIcons from "../../SVGIcons";

const InputPassword = ({value, onChange}) => {
    return (  
        <div className="floating-input-container">
            {/* INPUT HERE */}
            <input 
            className="input-bar with-logo" 
            type="password" 
            placeholder="Password" 
            name="password"
            value={value}
            onChange= {onChange}
            id="password-input" />
            {/* LABEL HERE */}
            <label 
            className="floating-label" 
            htmlFor="password-input">
                Password
            </label>
        <SVGIcons 
        className="input-logo"
        selected="inputPassword"
        color="var(--monoc4-50)"
        size="20px"/>
        </div>
    );
}

export default InputPassword;
