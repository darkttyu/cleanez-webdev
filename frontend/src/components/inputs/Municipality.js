const InputMunicipality = ({value, data, selection, onChange, selected}) => {
    return(
        <div className="text-container">
            {/* INPUT HERE */}
            <select 
                className="input" 
                type="text" 
                name="municipal"
                value={value}
                id="municipality-input"
                onChange={(e) => {
                    const selectedMunicipal = e.target.value;
                    selection(selectedMunicipal);  
                    onChange(e);  
                }}
            >
                {/* SELECT OPTIONS */}
                <option value="0">Select Municipality</option>
                {data.map((m, index) => (
                    (m.city_name == selected) ?
                    (<option key={index} value={m.city_code + m.city_name} selected="selected">{m.city_name}</option>) 
                    :
                    (<option key={index} value={m.city_code + m.city_name}>{m.city_name}</option>) 
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