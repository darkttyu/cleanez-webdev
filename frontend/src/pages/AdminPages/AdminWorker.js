import { useEffect, useState } from "react";
import axios from "axios";

const AdmindWorker = () => {
    const [allWorkerList, setAllWorkerList] = useState([]);
    const [currentList, setCurrentList] = useState([])
    
    const fetchAllApplicants = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/admin/findAllWorkers`);

            setAllWorkerList(response.data.worker)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchAllApplicants();
    }, [])

    useEffect(() => {
        console.log("All Worker List: ", allWorkerList);
        setCurrentList(allWorkerList);
    }, [allWorkerList])

    useEffect(() => {
        console.log("Current List: ", currentList)
    }, [currentList])

    const handleSearch = (search) => {
        setCurrentList(allWorkerList.filter((worker) => 
            worker.userId.firstName.toLowerCase().includes(search.toLowerCase()) || 
            worker.userId.lastName.toLowerCase().includes(search.toLowerCase())
        ));
    };
    

    return (  
        <div className="dashboard-page">
            <section className="dashboard-upcoming-container">
                <div className="admin-searchbar-container">
                    <input 
                    type="text" 
                    placeholder="Search"
                    className="question-searchbar"
                    name="question-searchbar" 
                    id="question-searchbar" 
                    onChange={(e) => handleSearch(e.target.value)}/>
                </div>
                <div className="dashboard-list-container">
                    <table className="dashboard-list-table">
                        <thead className="dashboard-thead">
                            <tr>
                                <th className="dashboard-th">Name</th>
                                <th className="dashboard-th">Service Category</th>
                                <th className="dashboard-th">Address</th>
                                <th className="dashboard-th">Earnings</th>
                                <th className="dashboard-th">Status</th>
                                <th className="dashboard-th">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {currentList.map((worker, index) => (
                            <tr 
                            key={index} 
                            className="dashboard-tbody-tr"
                            onClick={(e) => {}}>
                                <td className="dashboard-tbody-td">
                                    {worker.userId.firstName} {worker.userId.lastName}
                                </td>
                                <td className="dashboard-tbody-td">{worker.serviceCategory}</td>
                                <td className="dashboard-tbody-td">
                                    {worker.userId.address.barangay}, {worker.userId.address.municipal}, {worker.userId.address.province} 
                                </td>
                                <td className="dashboard-tbody-td"></td>
                                <td className="dashboard-tbody-td">
                                    <div className={`dashboard-status 
                                        ${String(worker.userId.status).toLowerCase()}`}>
                                            {worker.userId.status}
                                    </div>
                                </td>
                                <td className="dashboard-tbody-td">

                                </td>
                            </tr> 
                        ))}
                            
                       
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
 
export default AdmindWorker;