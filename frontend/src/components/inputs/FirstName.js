const InputFirstName = ({value, onChange, disabled=false}) => {
    return (  
        <div className="floating-input-container">
            {/* INPUT HERE */}
            <input 
            className="input-bar no-logo" 
            type="text" 
            placeholder="First Name" 
            name="firstName" 
            value={value}
            onChange={onChange}
            disabled={disabled}
            id="firstname-input" />
            {/* LABEL HERE */}
            <label 
            className="floating-label" 
            htmlFor="firstname-input">
                First Name
            </label>
        </div> 
    );
}
 
export default InputFirstName;