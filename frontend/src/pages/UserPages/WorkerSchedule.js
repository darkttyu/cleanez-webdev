// Import Statements --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
// --- Other/React Import/s
import { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";
import axios from "axios";
import SVGIcons from "../../SVGIcons";


const WorkerSchedule = () => {
    const [workerDetails, setWorkerDetails] = useState(null);
    const [serviceList, setServiceList] = useState([]);
    const [areaList, setAreaList] = useState([]);
    const [timeList, setTimeList] = useState([]);

    const [dayValues, setDayValues] = useState([]);
    const [timeValues, setTimeValues] = useState([]);

    const [newWorkerSchedule, setNewWorkerSchedule] = useState({
        serviceCategory: "0",
        workerAvailability: {
            areaAssigned: "0",
            day: [],
            startTime: []
        }
    });

    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        fetchWorkerDetail();
        fetchServices();
    }, []);

    useEffect(() => {
        console.log(timeList);
    }, [timeList])

    // Functions --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
    // --- Fetches Worker Detail from Database;
    const fetchWorkerDetail = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:5000/api/worker/getWorkerDetails`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })

            // console.log(response.data.worker);
            setWorkerDetails(response.data.worker);
        } catch (e) {
            console.log(e);
            setWorkerDetails(null);
        }
    };

    const fetchServices = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/appointment/getServices`);

            // console.log(response.data.services);
            setServiceList(response.data.services);
        } catch (e) {
            console.log(e);
            setServiceList([]);
        }
    };

    const fetchAreas = () => {
        const selectedService = serviceList.find(
            (service) => service.serviceName === newWorkerSchedule.serviceCategory
        );
    
        if (selectedService && selectedService.areaDetails !== areaList) {
            // console.log("Selected Area: ", selectedService.areaDetails);
            setAreaList(selectedService.areaDetails);
        }
    };
    
    const fetchTime = () => {
        const selectedArea = areaList.find(
            (area) => area.sizeOfArea === newWorkerSchedule.workerAvailability.areaAssigned
        );

        if (newWorkerSchedule.workerAvailability.areaAssigned == "0") {
            console.log("Area is 0")
            setTimeList([]);
            return;
        }

        if (selectedArea && selectedArea.startTime !== timeList) {
            // console.log("Selected Time: ", selectedArea.startTime);
            console.log("Area is ", newWorkerSchedule.workerAvailability.areaAssigned);
            setTimeList(selectedArea.startTime);
        }

    }

    const convertTime = (time) => {
        const hour = parseInt(time.slice(0, 2)); // Extract and convert the hour part to a number
        const mins = time.slice(2); // Extract the minutes part as is
    
        if (hour === 0) {
            return `12:${mins} AM`; // Midnight
        } else if (hour < 12) {
            return `${hour.toString().padStart(2, '0')}:${mins} AM`; // Morning
        } else if (hour === 12) {
            return `12:${mins} PM`; // Noon
        } else {
            const convertedHour = (hour - 12).toString().padStart(2, '0'); // Convert to 12-hour format and pad with 0
            return `${convertedHour}:${mins} PM`; // Afternoon and evening
        }
    };

    const handleDayChanges = (e) => {
        const {value, checked} = e.target;

        if (checked) {
            setDayValues((prev) => [...prev, value]);
        } else {
            setDayValues((prev) => prev.filter((val) => val !== value));
        }
    }
    const handleTimeChanges = (e) => {
        const {value, checked} = e.target;

        if (checked) {
            setTimeValues((prev) => [...prev, value]);
        } else {
            setTimeValues((prev) => prev.filter((val) => val !== value));
        }
    }
    useEffect(() => {
        // console.log("Day Values", dayValues);
        setNewWorkerSchedule({
            ...newWorkerSchedule,
            workerAvailability: {
                ...newWorkerSchedule.workerAvailability,
                day: dayValues
            },
        }) 
    }, [dayValues])
    useEffect(() => {
        // console.log("Time Values", timeValues);
        setNewWorkerSchedule({
            ...newWorkerSchedule,
            workerAvailability: {
                ...newWorkerSchedule.workerAvailability,
                startTime: timeValues
            },
        }) 
    }, [timeValues])

    useEffect(() => {
        if (areaList.length > 0) {
            fetchTime();
        }
    }, [newWorkerSchedule, areaList]);

    useEffect(() => {
        if (serviceList.length > 0 && newWorkerSchedule.serviceCategory !== "0") {
            fetchAreas();
        }
    }, [newWorkerSchedule, serviceList]);
    
    // useEffect(() => {
    //     console.log("OLD: ", workerDetails)
    //     console.log("NEW: ", newWorkerSchedule);
    // }, [newWorkerSchedule])
    
    useEffect(() => {
        // console.log("Initial Worker Deets: ", workerDetails);
        if (workerDetails) {
            setNewWorkerSchedule({
                serviceCategory: workerDetails.serviceCategory,
                workerAvailability: {
                    areaAssigned: workerDetails.workerAvailability.areaAssigned,
                    day: workerDetails.workerAvailability.day,
                    startTime: workerDetails.workerAvailability.startTime
                }
            })
            setDayValues(workerDetails.workerAvailability.day);
            setTimeValues(workerDetails.workerAvailability.startTime);
        }

    }, [workerDetails])

    const handleScheduleCancel = () => {
        setNewWorkerSchedule({
            serviceCategory: workerDetails.serviceCategory,
            workerAvailability: {
                areaAssigned: workerDetails.workerAvailability.areaAssigned,
                day: workerDetails.workerAvailability.day,
                startTime: workerDetails.workerAvailability.startTime
            }
        });
        setEditMode(false);
    };

    const handleScheduleSave = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.put(`http://localhost:5000/api/worker/editWorkerServiceInformation`,
                newWorkerSchedule,
                {headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }}
            )

            console.log("Saved: ", response);
            fetchWorkerDetail();
            setEditMode(false);
        } catch (e) {
            console.log(e)
        }
    }

    return (  
        <div className="schedule-page">
            <section className="schedule-container">
                <h2>Service</h2>
                <div className="schedule-inputs" id="service-inputs">
                    {/* SERVICE TYPE */}
                    <div className="basic-input-container">
                        <label className="basic-label compact" htmlFor="service-input">
                            Service Type
                        </label>
                        <SVGIcons 
                        className="select-arrow"
                        selected="inputArrow"
                        size="14px"
                        color="var(--monoc4-50)"/>
                        <select 
                        className="input-bar no-logo" 
                        name="serviceName" 
                        value={newWorkerSchedule.serviceCategory}  
                        id="service-input" 
                        disabled ={true} //CHANGE LATER
                        onChange={(e) => {
                            const newServiceCategory = e.target.value;

                            // Update the schedule and reset area selection
                            setNewWorkerSchedule({
                                ...newWorkerSchedule,
                                serviceCategory: newServiceCategory,
                                workerAvailability: {
                                    ...newWorkerSchedule.workerAvailability,
                                    areaAssigned: "0", // Reset area selection
                                },
                            });
                        }}
                    >
                        {/* SELECT OPTIONS */}
                        {serviceList.map((s, index) => (
                            <option key={index} value={s.serviceName}>{s.serviceName}</option>
                        ))}
                    </select>
                    </div>

                    {/* AREA TYPE */}
                    <div className="basic-input-container">
                        <label className="basic-label compact" htmlFor="area-size-input">
                            Size of Area
                        </label>
                        <SVGIcons 
                        className="select-arrow"
                        selected="inputArrow"
                        size="14px"
                        color="var(--monoc4-50)"/>
                        <select 
                            className="input-bar no-logo" 
                            name="sizeOfArea" 
                            value={newWorkerSchedule.workerAvailability.areaAssigned} 
                            id="area-size-input" 
                            disabled ={!editMode}
                            onChange={(e) => {
                                setNewWorkerSchedule({
                                    ...newWorkerSchedule,
                                    workerAvailability: {
                                        ...newWorkerSchedule.workerAvailability,
                                        areaAssigned: e.target.value,
                                        startTime: []
                                    },
                                }) 
                            }}
                        >
                            {/* SELECT OPTIONS */}
                            <option value="0">Select Size of Area</option>
                            {areaList.map((area, index) => (
                                <option key={index} value={area.sizeOfArea}>{area.sizeOfArea}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </section>
            <section className="schedule-container">
                <h2>Worker Schedule</h2>
                <div className="schedule-inputs" id="schedule-inputs">
                    <table className="schedule-table">
                        <thead className="schedule-thead">
                            <tr className="schedule-tr">
                                <th className="service-header">Service Category</th>
                                <th><label htmlFor="SUN">SUN</label></th>
                                <th><label htmlFor="MON">MON</label></th>
                                <th><label htmlFor="TUE">TUE</label></th>
                                <th><label htmlFor="WED">WED</label></th>
                                <th><label htmlFor="THU">THU</label></th>
                                <th><label htmlFor="FRI">FRI</label></th>
                                <th><label htmlFor="SAT">SAT</label></th>
                            </tr>
                        </thead>
                        <tbody className="schedule-tbody">
                            <tr className="schedule-tr">
                                <td>{newWorkerSchedule.serviceCategory}</td>
                                <td>
                                    <input type="checkbox" name="worker-days" id="SUN" value="Sunday"
                                    onChange={handleDayChanges}
                                    disabled ={!editMode}
                                    checked={newWorkerSchedule?.workerAvailability?.day.includes("Sunday")}/>
                                </td>
                                <td>
                                    <input type="checkbox" name="worker-days" id="MON" value="Monday"
                                    onChange={handleDayChanges}
                                    disabled ={!editMode}
                                    checked={newWorkerSchedule?.workerAvailability?.day.includes("Monday")}/>
                                </td>
                                <td>
                                    <input type="checkbox" name="worker-days" id="TUE" value="Tuesday"
                                    onChange={handleDayChanges}
                                    disabled ={!editMode}
                                    checked={newWorkerSchedule?.workerAvailability?.day.includes("Tuesday")}/>
                                </td>
                                <td>
                                    <input type="checkbox" name="worker-days" id="WED" value="Wednesday"
                                    onChange={handleDayChanges}
                                    disabled ={!editMode}
                                    checked={newWorkerSchedule?.workerAvailability?.day.includes("Wednesday")}/>
                                </td>
                                <td>
                                    <input type="checkbox" name="worker-days" id="THU" value="Thursday"
                                    onChange={handleDayChanges}
                                    disabled ={!editMode}
                                    checked={newWorkerSchedule?.workerAvailability?.day.includes("Thursday")}/>
                                </td>
                                <td>
                                    <input type="checkbox" name="worker-days" id="FRI" value="Friday"
                                    onChange={handleDayChanges}
                                    disabled ={!editMode}
                                    checked={newWorkerSchedule?.workerAvailability?.day.includes("Friday")}/>
                                </td>
                                <td>
                                    <input type="checkbox" name="worker-days" id="SAT" value="Saturday"
                                    onChange={handleDayChanges}
                                    disabled ={!editMode}
                                    checked={newWorkerSchedule?.workerAvailability?.day.includes("Saturday")}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            <section className="schedule-container">
                <h2>Time Availability</h2>
                <div className="schedule-inputs" id="timeavail-inputs">
                {timeList.map((time, index) => (
                <div className="time-button-container" key={index}>
                    <input 
                    type="checkbox" 
                    name="worker-times"
                    id={time} 
                    className="worker-time-checkbox"
                    value={time}
                    onChange={handleTimeChanges}
                    disabled ={!editMode}
                    checked={newWorkerSchedule?.workerAvailability?.startTime.includes(time)}/>
                    <label 
                    htmlFor={time} 
                    className="worker-time-button">
                        {convertTime(time)}
                    </label>
                </div>
                ))}
                </div>
            </section>
            <div className="schedule-actions">
            {!editMode ?
                <button
                type="button"
                className="act-btn complete"
                onClick={(e) => setEditMode(true)}>
                    Edit Schedule
                </button> :
                <>
                    <button
                    type="button"
                    className="act-btn cancel"
                    onClick={handleScheduleCancel}>
                        Cancel
                    </button>
                    <button
                    type="button"
                    className="act-btn complete"
                    onClick={handleScheduleSave}>
                        Save Changes
                    </button>
                </>
            }
            </div>
        </div>
    );
}
 
export default WorkerSchedule;