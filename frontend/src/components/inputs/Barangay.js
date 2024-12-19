const InputBarangay = ({data}) => {
    return(
        <div className="text-container">
            {/* INPUT HERE */}
            <select 
            className="input" 
            type="text" 
            name="barangay-input" 
            id="barangay-input">
                {/* SELECT OPTIONS */}
                <option value="0">Select Barangay</option>
                {data.map((b, index) => (
                    <option key={index} value={b.brgy_code}>{b.brgy_name}</option>
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