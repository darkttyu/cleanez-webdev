const InputGender = ({value, onChange}) => {
    return (  
        <div className="radio-container">
            {/* RADIO OPTIONS */}
            <div className="radio-line">
                <input className="radio-input" type="radio" name="gender" onChange={onChange} id="gender-input1" value="male"/>
                <label className="radio-label" htmlFor="gender-input1">Male</label>
            </div>
            <div className="radio-line">
                <input className="radio-input" type="radio" name="gender" onChange={onChange} id="gender-input2" value="female"/>
                <label className="radio-label" htmlFor="gender-input2">Female</label>
            </div>
            <div className="radio-line">
                <input className="radio-input" type="radio" name="gender" onChange={onChange} id="gender-input3" value="disclosed"/>
                <label className="radio-label" htmlFor="gender-input3">Rather Not Say</label>
            </div>
      </div> 
    );
}
 
export default InputGender;