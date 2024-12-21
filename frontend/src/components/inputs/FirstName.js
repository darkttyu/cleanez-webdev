const InputFirstName = () => {
    return (  
        <div className="text-container">
            {/* INPUT HERE */}
            <input 
            className="input" 
            type="text" 
            placeholder="First Name" 
            name="firstname-input" 
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