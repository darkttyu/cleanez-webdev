const InputPassword = ({value, onChange}) => {
    return (  
        <div className="text-container">
            {/* INPUT HERE */}
            <input 
            className="input" 
            type="password" 
            placeholder="Password" 
            name="password"
            value={value}
            onChange= {onChange}
            id="password-input" />
            {/* LABEL HERE */}
            <label 
            className="text-label" 
            htmlFor="password-input">
                Password
            </label>
        </div>
    );
}

export default InputPassword;
