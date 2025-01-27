const WorkerSchedule = () => {
    return (  
        <div className="schedule-page">
            <section className="schedule-container">
                <h2>Service</h2>
                <div className="schedule-inputs" id="service-inputs">
                    {/* SERVICE TYPE */}
                    <div className="profile-input-container">
                        <label className="profile-label" htmlFor="service-input">
                            Service Type
                        </label>
                        <select 
                            className="input" 
                            name="serviceName" 
                            // value={value}  
                            id="service-input" 
                            onChange={(e) => {
                                onChange(e.target.value);  
                            }}
                        >
                            {/* SELECT OPTIONS */}
                            <option value="0">Select Service</option>
                            {/* {data.map((s, index) => (
                                <option key={index} value={s.serviceName}>{s.serviceName}</option>
                            ))} */}
                        </select>
                    </div>

                    {/* AREA TYPE */}
                    <div className="profile-input-container">
                        <label className="profile-label" htmlFor="area-size-input">
                            Size of Area
                        </label>
                        <select 
                            className="input" 
                            name="sizeOfArea" 
                            // value={value}  
                            id="area-size-input" 
                            onChange={(e) => {
                                onChange(e.target.value);  
                            }}
                        >
                            {/* SELECT OPTIONS */}
                            <option value="0">Select Size of Area</option>
                            {/* {data.map((s, index) => (
                                <option key={index} value={s.sizeOfArea}>{s.sizeOfArea}</option>
                            ))} */}
                        </select>
                    </div>
                </div>
            </section>
            <section className="schedule-container">
                <h2>Worker Schedule</h2>
                <div className="schedule-inputs" id="schedule-inputs">
                    <table>
                        <thead>
                            <tr>
                                <th>Service Category</th>
                                <th>SUN</th>
                                <th>MON</th>
                                <th>TUE</th>
                                <th>WED</th>
                                <th>THU</th>
                                <th>FRI</th>
                                <th>SAT</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>
                                <td><input type="checkbox" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            <section className="schedule-container">
                <h2>Time Availability</h2>
                <div className="schedule-inputs" id="timeavail-inputs">

                </div>
            </section>
        </div>
    );
}
 
export default WorkerSchedule;