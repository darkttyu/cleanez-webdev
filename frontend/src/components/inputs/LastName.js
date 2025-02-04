const InputLastName = ({value, onChange, disabled=false}) => {
    return (  
        <div className="floating-input-container">
            {/* INPUT HERE */}
            <input 
            className="input-bar no-logo" 
            type="text" 
            placeholder="Last Name" 
            name="lastName" 
            value={value}
            onChange={onChange}
            disabled = {disabled}
            id="lasttname-input"/>
            {/* LABEL HERE */}
            <label 
            className="floating-label" 
            htmlFor="lastname-input">
                Last Name
            </label>
        </div> 
    );
}
 
export default InputLastName;