const InputProvince = ({data, selection}) => {
    return (  
        <div className="text-container">
            {/* INPUT HERE */}
            <select 
            className="input" 
            type="text" 
            name="province-input" 
            id="address-input" 
            onChange={(e) => selection(e.target.value)}>
                {/* SELECT OPTIONS */}
                <option value="0">Select Province</option>
                {data.map((p, index) => (
                    <option key={index} value={p.province_code}>{p.province_name}</option>
                ))}
            </select>
            {/* LABEL HERE */}
            <label 
            className="text-label" 
            htmlFor="address-input">
                Province
            </label>
        </div> 
    );
}
 
export default InputProvince;