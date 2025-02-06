const InputPasswordConfirm = ({value, onChange}) => {
    return (
        <div className="floating-input-container">
            {/* INPUT HERE */}
            <input 
            className="input-bar no-logo" 
            type="password" 
            placeholder="Confirm Password" 
            name="confirm-password-input" 
            id="confirm-password-input" 
            value={value}
            onChange={(onChange)}/>
            {/* LABEL HERE */}
            <label 
            className="floating-label"
             htmlFor="password-input">
                Confirm Password
            </label>
        </div> 
    );
}

export default InputPasswordConfirm;