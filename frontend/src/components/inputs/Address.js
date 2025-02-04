const InputAddress = ({value, onChange, disabled=false}) => {
    return (  
        <div 
        className="floating-input-container">
            {/* INPUT HERE */}
            <input 
            className="input-bar no-logo" 
            type="text" 
            placeholder="Block / No. / Street" 
            name="block"
            value={value} 
            onChange={onChange}
            disabled = {disabled}
            id="address-input" />
            {/* LABEL HERE */}
            <label 
            className="floating-label" 
            htmlFor="address-input">
                Block / No. / Street
            </label>
            {/* ICON HERE */}
        </div> 
    );
}
 
export default InputAddress;