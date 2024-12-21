const InputLastName = () => {
    return (  
        <div className="text-container">
            {/* INPUT HERE */}
            <input 
            className="input" 
            type="text" 
            placeholder="Last Name" 
            name="lasttname-input" 
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