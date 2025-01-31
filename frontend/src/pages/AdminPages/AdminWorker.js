import { useEffect, useState } from "react";
import SVGIcons from "../../SVGIcons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdmindWorker = () => {
    const navigate = useNavigate();
    
    const [allWorkerList, setAllWorkerList] = useState([]);
    const [currentList, setCurrentList] = useState([])
    
    const [currentPage, setCurrentPage] = useState(1);

    const fetchAllWorkers = async (page, size) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/admin/findAllWorkers`, 
                {params: { 
                    page: page, 
                    pageSize: size }
                }
            );

            setAllWorkerList(response.data.worker)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchAllWorkers(1, 10);
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
    
    const handleDeleteButton = async (id) => {
        console.log(id);
        try {
            const response = await axios.delete(`http://localhost:5000/api/admin/deleteWorker/${id}`);

            console.log(response);

            fetchAllWorkers(1, 10);
        } catch (e) {
            console.log(e);
        }
    }

    const handlePages = (destination) => {
        if (destination === "next" && !(currentList.length === 0 || currentList.length < 10)) {
            setCurrentPage(currentPage + 1)
        } else if (destination === "prev" && currentPage != 1) {
            setCurrentPage( currentPage - 1)
        }
    }

    useEffect(() => {
        fetchAllWorkers(currentPage, 10);
    }, [currentPage])

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

                    <button
                    type="button"
                    className="act-btn complete"
                    onClick={(e) => navigate('/work')}>
                        Add New Worker
                    </button>
                </div>
                <div className="dashboard-list-container">
                    <table className="dashboard-list-table">
                        <thead className="dashboard-thead">
                            <tr>
                                <th className="dashboard-th tb-left">Name</th>
                                <th className="dashboard-th tb-left">Service Category</th>
                                <th className="dashboard-th tb-left">Address</th>
                                <th className="dashboard-th tb-left">Earnings</th>
                                <th className="dashboard-th tb-center">Status</th>
                                <th className="dashboard-th tb-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {currentList.map((worker, index) => (
                            <tr 
                            key={index} 
                            className="dashboard-tbody-tr"
                            onClick={(e) => {}}>
                                <td className="dashboard-tbody-td tb-left">
                                    {worker.userId.firstName} {worker.userId.lastName}
                                </td>
                                <td className="dashboard-tbody-td tb-left">{worker.serviceCategory}</td>
                                <td className="dashboard-tbody-td tb-left">
                                    {worker.userId.address.barangay}, {worker.userId.address.municipal}, {worker.userId.address.province} 
                                </td>
                                <td className="dashboard-tbody-td tb-left">&#8369; {parseFloat(worker.totalEarnings).toFixed(2)}</td>
                                <td className="dashboard-tbody-td tb-center">
                                    <div className={`dashboard-status 
                                        ${String(worker.userId.status).toLowerCase()}`}>
                                            {worker.userId.status}
                                    </div>
                                </td>
                                <td className="dashboard-tbody-td tb-center">
                                    <SVGIcons 
                                    selected="trash"
                                    size="24px"
                                    color="#CC3363"
                                    onClick={(e) => {handleDeleteButton(worker._id)}}/>
                                </td>
                            </tr> 
                        ))}
                            
                       
                        </tbody>
                    </table>
                    <div className="dashboard-list-navigation">
                        <SVGIcons 
                        selected="previousArrow"
                        size="32px"
                        color="#222222"
                        onClick={(e) => handlePages("prev")}/>
                        <h2>{currentPage}</h2>
                        <SVGIcons 
                        selected="forwardArrow"
                        size="32px"
                        color="#222222"
                        onClick={(e) => handlePages("next")}/>
                    </div>
                </div>
            </section>
        </div>
    );
}
 
export default AdmindWorker;