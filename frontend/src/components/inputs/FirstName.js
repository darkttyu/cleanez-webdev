const InputFirstName = ({value, onChange}) => {
    return (  
        <div className="text-container">
            {/* INPUT HERE */}
            <input 
            className="input" 
            type="text" 
            placeholder="First Name" 
            name="firstName" 
            value={value}
            onChange={onChange}
            id="firstname-input" />
            {/* LABEL HERE */}
            <label 
            className="text-label" 
            htmlFor="firstname-input">
                First Name
            </label>
        </div> 
    );
}
 
export default InputFirstName;