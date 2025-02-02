import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SVGIcons from '../../SVGIcons'


const AdminWorkerNew = () => {
    let { id } = useParams();
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState(null);
    const [serviceList, setServiceList] = useState([]);
    const [areaList, setAreaList] = useState([]);
    const [dayValues, setDayValues] = useState([]);

    const [newWorkInfo, setNewWorkInfo] = useState({
        userId: "",
        serviceCategory: "0",
        workerAvailability: {
            areaAssigned: "0",
            day: []
        }
    });

    const [isEmpty, setIsEmpty] = useState(true);

    const fetchUserInfo = async () => {
        try {
            console.log(id);
            const response = await axios.get(`https://cleanez-api.vercel.app/api/admin/clickedUser/${id}`)

            console.log(response.data.user);
            setUserInfo(response.data.user);
        } catch (e) {
            console.log(e)
            navigate('/admin/users');
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

    const fetchAreas = (value) => {
        const selectedService = serviceList.find(
            (service) => service.serviceName === value
        );
    
        if (selectedService && selectedService.areaDetails !== areaList) {
            // console.log("Selected Area: ", selectedService.areaDetails);
            setAreaList(selectedService.areaDetails);
        }
    }

    const handleDayChanges = (e) => {
        const {value, checked} = e.target;

        if (checked) {
            setDayValues((prev) => [...prev, value]);
        } else {
            setDayValues((prev) => prev.filter((val) => val !== value));
        }
    }

    useEffect(() => {
        // console.log("Day Values", dayValues);
        setNewWorkInfo({
            ...newWorkInfo,
            workerAvailability: {
                ...newWorkInfo.workerAvailability,
                day: dayValues
            },
        }) 
    }, [dayValues])

    useEffect(() => {
        if (newWorkInfo.serviceCategory === "0" ||
            newWorkInfo.workerAvailability.areaAssigned === "0" ||
            newWorkInfo.workerAvailability.day.length === 0
        ) {
            setIsEmpty(true);
        } else {
            setIsEmpty(false);
        }
    }, [newWorkInfo])

    useEffect(() => {
        if (userInfo) {
            setNewWorkInfo({
                ...newWorkInfo,
                userId: id
            }) 
        }
    }, [userInfo])

    useEffect(() => {
        fetchUserInfo();
        fetchServices();
    }, [])

    const handleAdd = async () => {
        try {
            const response = await axios.post(
                'https://cleanez-api.vercel.app/api/admin/addWorker',
                newWorkInfo
            )

            console.log("New Worker Added: ", response);
            navigate('/admin/workers');
        } catch (e) {
            console.log(e)
        }
    }

    return (  
        <div className="schedule-page">

            {userInfo ? 
            <>
                <h2></h2>
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
                            value={newWorkInfo.serviceCategory}
                            id="service-input"
                            onChange={(e) => {
                                setNewWorkInfo({
                                    ...newWorkInfo,
                                    serviceCategory: e.target.value
                                })
                                fetchAreas (e.target.value);
                            }}>
                                {/* SELECT OPTIONS */}
                                <option value="0">Select Service Category</option>
                                {serviceList.map((s, index) => (
                                    <option key={index} value={s.serviceName}>{s.serviceName}</option>
                                ))}
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
                                value={newWorkInfo.workerAvailability.areaAssigned}
                                id="area-size-input"
                                onChange={(e) => {
                                    setNewWorkInfo({
                                        ...newWorkInfo,
                                        workerAvailability: {
                                            ...newWorkInfo.workerAvailability,
                                            areaAssigned: e.target.value
                                        }
                                    })
                                }}>
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
                                    <td>
                                        {(newWorkInfo.serviceCategory !== "0") ? newWorkInfo.serviceCategory : ""}
                                    </td>
                                    <td>
                                        <input type="checkbox" name="worker-days" id="SUN" value="Sunday"
                                        onChange={handleDayChanges}/>
                                    </td>
                                    <td>
                                        <input type="checkbox" name="worker-days" id="MON" value="Monday"
                                        onChange={handleDayChanges}/>
                                    </td>
                                    <td>
                                        <input type="checkbox" name="worker-days" id="TUE" value="Tuesday"
                                        onChange={handleDayChanges}/>
                                    </td>
                                    <td>
                                        <input type="checkbox" name="worker-days" id="WED" value="Wednesday"
                                        onChange={handleDayChanges}/>
                                    </td>
                                    <td>
                                        <input type="checkbox" name="worker-days" id="THU" value="Thursday"
                                        onChange={handleDayChanges}/>
                                    </td>
                                    <td>
                                        <input type="checkbox" name="worker-days" id="FRI" value="Friday"
                                        onChange={handleDayChanges}/>
                                    </td>
                                    <td>
                                        <input type="checkbox" name="worker-days" id="SAT" value="Saturday"
                                        onChange={handleDayChanges}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
                <div className="schedule-actions">
                    <button
                    type="button"
                    className="act-btn cancel"
                    onClick={(e) => {navigate(`/admin/users/${id}`)}}>
                        Cancel
                    </button>
                    {!isEmpty ?
                    <button
                    type="button"
                    className="act-btn complete"
                    onClick={handleAdd}>
                        Add Worker
                    </button> :
                    <></>
                    }
                </div>
            </>
             :
            <></>
            }
        </div>
    );
}
 
export default AdminWorkerNew;