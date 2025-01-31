const InputProvince = ({ value, data, onChange, disabled=false}) => {
    
    return (  
        <div className="text-container">
            <select 
                className="input" 
                name="province" 
                value = {value}
                id="province-input" 
                onChange={(e) => {
                    onChange(e);  
                }}
                disabled = {disabled}
            >
                {/* SELECT OPTIONS */}
                <option value="0">Select Province</option>
                {data.map((p, index) => (
                    <option 
                        key={index} 
                        value={p.province_code + p.province_name}
                    >
                        {p.province_name}
                    </option>
                ))}
            </select>
            <label className="text-label" htmlFor="address-input">
                Province
            </label>
        </div> 
    );
}
export default InputProvince;

