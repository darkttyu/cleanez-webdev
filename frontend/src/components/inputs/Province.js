const InputProvince = ({ value, data, selection, onChange }) => {
    return (  
        <div className="text-container">
            <select 
                className="input" 
                name="province" 
                value={value}  
                id="address-input" 
                onChange={(e) => {
                    const selectedProvince = e.target.value;
                    selection(selectedProvince);  
                    onChange(e);  
                }}
            >
                {/* SELECT OPTIONS */}
                <option value="0">Select Province</option>
                {data.map((p, index) => (
                    <option key={index} value={p.province_code + p.province_name}>{p.province_name}</option>
                ))}
            </select>
            <label className="text-label" htmlFor="address-input">
                Province
            </label>
        </div> 
    );
}
export default InputProvince;

