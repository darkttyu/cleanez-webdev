const InputAddress = ({value, onChange}) => {
    return (  
        <div className="text-container">
            {/* INPUT HERE */}
            <input 
            className="input" 
            type="text" 
            placeholder="Block / No. / Street" 
            name="block"
            value={value} 
            onChange={onChange}
            id="address-input" />
            {/* LABEL HERE */}
            <label 
            className="text-label" 
            htmlFor="address-input">
                Block / No. / Street
            </label>
        </div> 
    );
}
 
export default InputAddress;