import SVGIcons from "../../SVGIcons";

const InputBarangay = ({value, data, onChange, disabled=false}) => {
    return(
        <div className="floating-input-container">
            {/* INPUT HERE */}
            <select 
            className="input-bar no-logo" 
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
            className="floating-label" 
            htmlFor="barangay-input">
                Barangay
            </label>
            <SVGIcons 
            className="select-arrow"
            selected="inputArrow"
            size="14px"
            color="var(--monoc4-50)"/>
        </div> 
    );
}

export default InputBarangay;