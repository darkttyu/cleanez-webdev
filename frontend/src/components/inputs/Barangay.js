const InputBarangay = ({value, data, onChange, disabled=false}) => {
    return(
        <div className="text-container">
            {/* INPUT HERE */}
            <select 
                className="input" 
                type="text" 
                name="barangay" 
                value={value}
                id="barangay-input"
                onChange={onChange}
                disabled = {disabled}
                >
                {/* SELECT OPTIONS */}
                <option value="0">Select Barangay</option>
                {data.map((b, index) => (
                    <option 
                        key={index} 
                        value={b.brgy_code + b.brgy_name}
                    >
                        {b.brgy_name}
                    </option>
                ))}
            </select>
            {/* LABEL HERE */}
            <label 
            className="text-label" 
            htmlFor="address-input">
                Barangay
            </label>
        </div> 
    );
}

export default InputBarangay;