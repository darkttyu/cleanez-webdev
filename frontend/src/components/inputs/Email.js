const InputEmail = ({value, onChange, disabled=false}) => {
    return (  
        <div className="text-container">
            {/* INPUT HERE */}
            <input 
            className="input" 
            type="text" 
            placeholder="Email" 
            name="email" 
            value={value}
            onChange={onChange}
            disabled = {disabled}
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