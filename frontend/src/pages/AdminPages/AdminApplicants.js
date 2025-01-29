const AdminApplicants = () => {
    return (  
        <div className="dashboard-page">
            <section className="dashboard-upcoming-container">
                <div className="dashboard-list-container">
                    <table className="dashboard-list-table">
                        <thead className="dashboard-thead">
                            <tr>
                                <th className="dashboard-th">First Name</th>
                                <th className="dashboard-th">Last Name</th>
                                <th className="dashboard-th">Time</th>
                                <th className="dashboard-th">Resume</th>
                                <th className="dashboard-th">Status</th>
                                <th className="dashboard-th">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* <tr 
                            key={index} 
                            className="dashboard-tbody-tr"
                            onClick={(e) => {
                                showAppointment(data._id)}}>
                                <td className="dashboard-tbody-td">{data.serviceDetails}</td>
                                <td className="dashboard-tbody-td">{data.scheduledDate.replaceAll('-', '/')}</td>
                                <td className="dashboard-tbody-td">{data.scheduledTime}</td>
                                <td className="dashboard-tbody-td">{data.rating}</td>
                                <td className="dashboard-tbody-td ">
                                    <div className={`dashboard-status 
                                    ${String(data.appointmentStatus).toLowerCase()}`}>
                                        {data.appointmentStatus}
                                    </div>
                                </td>
                                <td className="dashboard-tbody-td ">
                                    <div className={`dashboard-status 
                                    ${String(data.paymentStatus).toLowerCase()}`}>
                                        {data.paymentStatus}
                                    </div>
                                </td>
                            </tr>  */}
                       
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
 
export default AdminApplicants;