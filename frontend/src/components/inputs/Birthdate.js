const InputBirthdate = ({value, onChange}) => {
    return (  
        <div className="input-container">
            {/* INPUT HERE */}
            <input 
            className="input" 
            type="date" 
            placeholder="Last Name" 
            name="birthDate" 
            value={value}
            onChange={onChange}
            id="birthdate-input" 
            min="1860-01-01" 
            max="2025-12-30"/>
        </div> 
    );
}
 
export default InputBirthdate;