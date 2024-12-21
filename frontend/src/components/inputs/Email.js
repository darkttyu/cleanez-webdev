const InputEmail = () => {
    return (  
        <div className="text-container">
            {/* INPUT HERE */}
            <input 
            className="input" 
            type="email" 
            placeholder="Email" 
            name="mail-input" 
            id="mail-input"/>
            {/* LABEL HERE */}
            <label 
            className="text-label"
            htmlFor="mail-input">
                Email
            </label>
        </div>
    );
}
 
export default InputEmail;