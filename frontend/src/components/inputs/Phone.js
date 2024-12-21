const InputPhone = () => {
    return (  
        <div className="text-container">
            {/* INPUT HERE */}
            <input 
            className="input" 
            type="text" 
            placeholder="Phone Number" 
            name="sms-input" 
            id="sms-input"/>
            {/* LABEL HERE */}
            <label 
            className="text-label" 
            htmlFor="sms-input">
                Phone Number
            </label>
        </div>
    );
}
 
export default InputPhone;