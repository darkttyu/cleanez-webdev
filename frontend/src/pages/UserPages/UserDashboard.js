const UserDashboard = () => {
    return (  
        <div className="dashboard-page">
            <div className="dashboard-header">
                <section className="dashboard-total-container">
                    <h2>Total No. of Appointments</h2>
                    <p className="dashboard-total"></p>
                </section>
                <section className="dashboard-total-container">
                    <h2>Total No. of Completed Appointments</h2>
                    <p className="dashboard-total"></p>
                </section>
            </div>
            <section className="dashboard-upcoming-container">
                <h2>Upcoming Appointments</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Rating</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                </table>
            </section>
        </div>
    );
}
 
export default UserDashboard;