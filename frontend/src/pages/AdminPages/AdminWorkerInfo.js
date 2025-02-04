import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SVGIcons from '../../SVGIcons'

const AdminWorkerInfo = () => {
    let { id } = useParams();
    const navigate = useNavigate();

    const [workerInfo, setWorkerInfo] = useState(null);
    const [serviceList, setServiceList] = useState([]);
    const [areaList, setAreaList] = useState([]);
    const [timeList, setTimeList] = useState([]);

    const [dayValues, setDayValues] = useState([]);
    const [timeValues, setTimeValues] = useState([]);

    const [editMode, setEditMode] = useState(false);

    const [newWorkerInfo, setNewWorkerInfo] = useState({
        workerAvailability: {
            day: [],
            startTime: []
        }
    })
    
    const fetchWorkerInfo = async () => {
        try {
            console.log(id);
            const response = await axios.get(`https://cleanez-api.vercel.app/api/admin/clickedWorker/${id}`)

            const workerDay = response.data.worker.workerAvailability.day;
            const workerTime = response.data.worker.workerAvailability.startTime;
            const workerService = response.data.worker.serviceCategory;
            const workerArea = response.data.worker.workerAvailability.areaAssigned;
            const workId = response.data.worker._id;

            console.log(response);
            setWorkerInfo({
                firstName: response.data.worker.userId.firstName,
                lastName: response.data.worker.userId.lastName,
                workerId: workId,
                serviceCategory: workerService,
                areaAssigned: workerArea,
                workerAvailability: {
                    day: workerDay,
                    startTime: workerTime
                }
            });
        } catch (e) {
            console.log(e)
            navigate('/admin/workers');
        }
    }

    const fetchServices = async () => {
        try {
            const response = await axios.get(`https://cleanez-api.vercel.app/api/appointment/getServices`);

            // console.log(response.data.services);
            setServiceList(response.data.services);
        } catch (e) {
            console.log(e);
            setServiceList([]);
        }
    };

    const fetchAreas = () => {
        const selectedService = serviceList.find(
            (service) => service.serviceName === workerInfo.serviceCategory
        );
    
        if (selectedService && selectedService.areaDetails !== areaList) {
            // console.log("Selected Area: ", selectedService.areaDetails);
            setAreaList(selectedService.areaDetails);
        }
    };

    const fetchTime = () => {
        const selectedArea = areaList.find(
            (area) => area.sizeOfArea === workerInfo.areaAssigned
        );

        if (workerInfo.areaAssigned == "0") {
            // console.log("Area is 0")
            setTimeList([]);
            return;
        }

        if (selectedArea && selectedArea.startTime !== timeList) {
            // console.log("Selected Time: ", selectedArea.startTime);
            // console.log("Area is ", workerInfo.areaAssigned);
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
        if (workerInfo) {
            // console.log("Day Values", dayValues);
            setWorkerInfo({
                ...workerInfo,
                workerAvailability: {
                    ...workerInfo.workerAvailability,
                    day: dayValues
                },
            }) 
        } 
    }, [dayValues])
    useEffect(() => {
        if (workerInfo) {
            // console.log("Time Values", timeValues);
            setWorkerInfo({
                ...workerInfo,
                workerAvailability: {
                    ...workerInfo.workerAvailability,
                    startTime: timeValues
                },
            }) 
        }
    }, [timeValues])

    // Initial Load    
    useEffect(() => {
        fetchWorkerInfo();
        fetchServices();
    }, [])

    useEffect(() => {
        if (workerInfo) {
            // console.log(workerInfo);
            fetchAreas();
            fetchTime();
            setNewWorkerInfo({
                workerAvailability: {
                    day: workerInfo.workerAvailability.day,
                    startTime: workerInfo.workerAvailability.startTime
                }
            })
            setDayValues(workerInfo.workerAvailability.day);
            setTimeValues(workerInfo.workerAvailability.startTime);
        }
    }, [workerInfo])

    const handleCancel = () => {
        fetchWorkerInfo();
        setEditMode(false);
    }

    const handleSave = async () => {
        try {
            setNewWorkerInfo({
                workerAvailability: {
                    day: workerInfo.workerAvailability.day,
                    startTime: workerInfo.workerAvailability.startTime
                }
            });

            const response = await axios.put(
                `https://cleanez-api.vercel.app/api/admin/editWorkerSchedule/${workerInfo.workerId}`,
                newWorkerInfo
            )

            // console.log("Save Changes: ", response);
            fetchWorkerInfo();
            setEditMode(false);
        } catch (e) {
            console.log(e)
        } finally {
            setNewWorkerInfo({
                workerAvailability: {
                    day: [],
                    startTime: []
                }
            });
        }
    }

    return (  
        <div className="schedule-page">
            {workerInfo ?
            <>
                <h2>{workerInfo.firstName} {workerInfo.lastName}</h2>
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
                                    <td>{workerInfo.serviceCategory}</td>
                                    <td>
                                        <input type="checkbox" name="worker-days" id="SUN" value="Sunday"
                                        onChange={handleDayChanges}
                                        disabled ={!editMode}
                                        checked={workerInfo?.workerAvailability.day.includes("Sunday")}/>
                                    </td>
                                    <td>
                                        <input type="checkbox" name="worker-days" id="MON" value="Monday"
                                        onChange={handleDayChanges}
                                        disabled ={!editMode}
                                        checked={workerInfo?.workerAvailability.day.includes("Monday")}/>
                                    </td>
                                    <td>
                                        <input type="checkbox" name="worker-days" id="TUE" value="Tuesday"
                                        onChange={handleDayChanges}
                                        disabled ={!editMode}
                                        checked={workerInfo?.workerAvailability.day.includes("Tuesday")}/>
                                    </td>
                                    <td>
                                        <input type="checkbox" name="worker-days" id="WED" value="Wednesday"
                                        onChange={handleDayChanges}
                                        disabled ={!editMode}
                                        checked={workerInfo?.workerAvailability.day.includes("Wednesday")}/>
                                    </td>
                                    <td>
                                        <input type="checkbox" name="worker-days" id="THU" value="Thursday"
                                        onChange={handleDayChanges}
                                        disabled ={!editMode}
                                        checked={workerInfo?.workerAvailability.day.includes("Thursday")}/>
                                    </td>
                                    <td>
                                        <input type="checkbox" name="worker-days" id="FRI" value="Friday"
                                        onChange={handleDayChanges}
                                        disabled ={!editMode}
                                        checked={workerInfo?.workerAvailability.day.includes("Friday")}/>
                                    </td>
                                    <td>
                                        <input type="checkbox" name="worker-days" id="SAT" value="Saturday"
                                        onChange={handleDayChanges}
                                        disabled ={!editMode}
                                        checked={workerInfo?.workerAvailability.day.includes("Saturday")}/>
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
                        checked={workerInfo?.workerAvailability.startTime.includes(time)}/>
                        <label 
                        htmlFor={time} 
                        className="worker-time-button">
                            {convertTime(time)}
                        </label>
                    </div>
                    ))}
                    </div>
                </section>
                <div className="appointment-buttons">
                    <button 
                    type="button"
                    className="appointment-return"
                    onClick={(e) => {navigate('/admin/workers');}}>
                        <SVGIcons
                        selected="previousArrow"
                        size="36px"
                        color="#222222"/>
                    </button>
                    {!editMode ?
                    <button
                    type="button"
                    className="act-btn complete"
                    onClick={(e) => setEditMode(true)}>
                        Edit Schedule
                    </button> :
                    <div className="appointment-actions">
                        <button
                        type="button"
                        className="act-btn cancel"
                        onClick={handleCancel}>
                            Cancel
                        </button>
                        <button
                        type="button"
                        className="act-btn complete"
                        onClick={handleSave}>
                            Save Changes
                        </button>
                    </div>
                    }
                </div>
            </> :
            <></>
            }
            
        </div>
    );
}
 
export default AdminWorkerInfo;