const InputPhone = ({value, onChange}) => {
    return (  
        <div className="text-container">
            {/* INPUT HERE */}
            <input 
            className="input" 
            type="text" 
            placeholder="Phone Number" 
            name="phoneNumber"
            value={value}
            onChange={onChange} 
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