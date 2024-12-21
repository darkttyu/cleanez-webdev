const InputLastName = ({value, onChange}) => {
    return (  
        <div className="text-container">
            {/* INPUT HERE */}
            <input 
            className="input" 
            type="text" 
            placeholder="Last Name" 
            name="lastName" 
            value={value}
            onChange={onChange}
            id="lasttname-input"/>
            {/* LABEL HERE */}
            <label 
            className="text-label" 
            htmlFor="lastname-input">
                Last Name
            </label>
        </div> 
    );
}
 
export default InputLastName;