const InputMunicipality = ({data, selection}) => {
    return(
        <div className="text-container">
            {/* INPUT HERE */}
            <select 
            className="input" 
            type="text" 
            name="municipality-input" 
            id="municipality-input"
            onChange={(e) => selection(e.target.value)}>
                {/* SELECT OPTIONS */}
                <option value="0">Select Municipality</option>
                {data.map((m, index) => (
                    <option key={index} value={m.city_code}>{m.city_name}</option>
                ))}
            </select>
            {/* LABEL HERE */}
            <label 
            className="text-label" 
            htmlFor="address-input">
                Municipal
            </label>
        </div> 
    );
}

export default InputMunicipality;