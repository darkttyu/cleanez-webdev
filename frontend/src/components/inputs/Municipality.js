import SVGIcons from "../../SVGIcons";

const InputMunicipality = ({value, data, onChange, disabled=false}) => {
    return(
        <div className="floating-input-container">
            {/* INPUT HERE */}
            <select 
                className="input-bar no-logo" 
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
            className="floating-label" 
            htmlFor="address-input">
                Municipal
            </label>
            <SVGIcons 
            className="select-arrow"
            selected="inputArrow"
            size="14px"
            color="var(--monoc4-50)"/>
        </div> 
    );
}

export default InputMunicipality;