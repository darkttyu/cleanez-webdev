const InputPasswordNew = ({value, onChange}) => {
    return (
       <div className="floating-input-container">
            {/* INPUT HERE */}
            <input 
            className="input-bar no-logo" 
            type="password" 
            placeholder="New Password (8 characters above)" 
            name="new-password-input" 
            id="new-password-input" 
            value={value}
            onChange={onChange}/>
            {/* LABEL HERE */}
            <label 
            className="floating-label" 
            htmlFor="password-input">
                New Password
            </label>
       </div> 
    );
 }

export default InputPasswordNew;