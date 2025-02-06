import SVGIcons from "../../SVGIcons";


const InputProvince = ({ value, data, onChange, disabled=false}) => {
    
    return (  
        <div className="floating-input-container">
            <select 
                className="input-bar no-logo" 
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
            <label className="floating-label" htmlFor="address-input">
                Province
            </label>

            <SVGIcons 
            className="select-arrow"
            selected="inputArrow"
            size="14px"
            color="var(--monoc4-50)"/>
        </div> 
    );
}
export default InputProvince;

