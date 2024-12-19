const InputPasswordConfirm = () => {
    return (
        <div className="text-container">
            {/* INPUT HERE */}
            <input 
            className="input" 
            type="password" 
            placeholder="Confirm Password" 
            name="confirm-password-input" 
            id="confirm-password-input" />
            {/* LABEL HERE */}
            <label 
            className="text-label"
             htmlFor="password-input">
                Confirm Password
            </label>
        </div> 
    );
}

export default InputPasswordConfirm;