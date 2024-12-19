const InputPasswordNew = () => {
    return (
       <div className="text-container">
            {/* INPUT HERE */}
            <input 
            className="input" 
            type="password" 
            placeholder="New Password (8 characters above)" 
            name="new-password-input" 
            id="new-password-input" />
            {/* LABEL HERE */}
            <label 
            className="text-label" 
            htmlFor="password-input">
                New Password
            </label>
       </div> 
    );
 }

export default InputPasswordNew;