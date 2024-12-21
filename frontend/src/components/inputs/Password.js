const InputPassword = () => {
    return (  
        <div className="text-container">
            {/* INPUT HERE */}
            <input 
            className="input" 
            type="password" 
            placeholder="Password" 
            name="password-input" 
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
