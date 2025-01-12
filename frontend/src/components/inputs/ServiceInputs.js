const ServiceType = ({ value, data, onChange }) => {
    return (  
        <div className="text-container">
            <select 
                className="input" 
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
                    <option key={index} value={s._id}>{s.serviceName}</option>
                ))}
            </select>
            <label className="text-label" htmlFor="service-input">
                Service Type
            </label>
        </div>
    );
}

const AreaSize = ({ value, data, onChange }) => {
    return (  
        <div className="text-container">
            <select 
                className="input" 
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
                    <option key={index} value={s._id}>{s.sizeOfArea}</option>
                ))}
            </select>
            <label className="text-label" htmlFor="area-size-input">
                Size of Area
            </label>
        </div>
    );
}

const WorkerNumbers = ({ value, data, onChange }) => {
    return (  
        <div className="text-container">
            <select 
                className="input" 
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
            <label className="text-label" htmlFor="worker-numbers-input">
                No. of Workers
            </label>
        </div>
    );
}
 
export {ServiceType, AreaSize, WorkerNumbers};