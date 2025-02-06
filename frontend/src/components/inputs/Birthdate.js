const InputBirthdate = ({value, onChange}) => {
    return (  
        <div className=".floating-input-container">
            {/* INPUT HERE */}
            <input 
            className="input-bar no-logo" 
            type="date" 
            placeholder="Birthdate" 
            name="birthDate" 
            value={value}
            onChange={onChange}
            id="birthdate-input" 
            min="1860-01-01" 
            max="2025-12-30"/>
            {/* LABEL HERE */}
            <label 
            className="floating-label"
            htmlFor="birthdate-input">
            </label>
        </div> 
    );
}
 
export default InputBirthdate;