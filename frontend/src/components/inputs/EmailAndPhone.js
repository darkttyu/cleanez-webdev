const InputMailAndPhone = ({value, onChange}) => {
    return (  
        <div className="text-container">
            {/* INPUT HERE */}
            <input 
            className="input" 
            type="text" 
            placeholder="Email or Mobile Number" 
            value={value}
            onChange={onChange}
            name="login" 
            id="mail-sms-input"/>
            {/* LABEL HERE */}
            <label 
            className="text-label"
            htmlFor="mail-sms-input">
                Email or Mobile Number
            </label>
        </div>
    );
}

export default InputMailAndPhone;