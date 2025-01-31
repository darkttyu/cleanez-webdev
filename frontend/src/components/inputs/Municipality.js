const InputMunicipality = ({value, data, onChange, disabled=false}) => {
    return(
        <div className="text-container">
            {/* INPUT HERE */}
            <select 
                className="input" 
                type="text" 
                name="municipal"
                value= { value }
                id="municipality-input"
                onChange={(e) => {
                    onChange(e);  
                }}
                disabled = {disabled}
            >
                {/* SELECT OPTIONS */}
                <option value="0">Select Municipality</option>
                {data.map((m, index) => (
                    <option 
                    key={index} 
                    value={m.city_code + m.city_name}
                >
                    {m.city_name}
                </option>
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