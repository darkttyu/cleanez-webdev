import SVGIcons from "../../SVGIcons";

const ServiceType = ({ value, data, onChange }) => {
    return (  
        <div className="floating-input-container">
            <select 
                className="input-bar no-logo" 
                name="serviceName" 
                value={value}  
                id="service-input" 
                onChange={(e) => {
                    onChange(e.target.value);  
                }}
            >
                {/* SELECT OPTIONS */}
                <option value="0">Select Service</option>
                {data.map((s, index) => (
                    <option key={index} value={s.serviceName}>{s.serviceName}</option>
                ))}
            </select>
            <label className="floating-label" htmlFor="service-input">
                Service Type
            </label>
            <SVGIcons 
            className="select-arrow"
            selected="inputArrow"
            size="14px"
            color="var(--monoc4-50)"/>
        </div>
    );
}

const AreaSize = ({ value, data, onChange }) => {
    return (  
        <div className="floating-input-container">
            <select 
                className="input-bar no-logo" 
                name="sizeOfArea" 
                value={value}  
                id="area-size-input" 
                onChange={(e) => {
                    onChange(e.target.value);  
                }}
            >
                {/* SELECT OPTIONS */}
                <option value="0">Select Size of Area</option>
                {data.map((s, index) => (
                    <option key={index} value={s.sizeOfArea}>{s.sizeOfArea}</option>
                ))}
            </select>
            <label className="floating-label" htmlFor="area-size-input">
                Size of Area
            </label>
            <SVGIcons 
            className="select-arrow"
            selected="inputArrow"
            size="14px"
            color="var(--monoc4-50)"/>
        </div>
    );
}

const WorkerNumbers = ({ value, data, onChange }) => {
    return (  
        <div className="floating-input-container">
            <select 
                className="input-bar no-logo" 
                name="numberOfWorkers" 
                value={value}  
                id="worker-numbers-input" 
                onChange={(e) => {
                    onChange(e.target.value);  
                }}
            >
                {/* SELECT OPTIONS */}
                <option value="0">Select No. of Workers</option>
                {data.map((n, index) => (
                    <option key={index} value={n}>{n}</option>
                ))}
            </select>
            <label className="floating-label" htmlFor="worker-numbers-input">
                No. of Workers
            </label>
            <SVGIcons 
            className="select-arrow"
            selected="inputArrow"
            size="14px"
            color="var(--monoc4-50)"/>
        </div>
    );
}
 
export {ServiceType, AreaSize, WorkerNumbers};