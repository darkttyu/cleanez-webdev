import {useState, useEffect, Component} from 'react';
import Plot from 'react-plotly.js';

import axios from 'axios';

const AdminDashboard = () => {
    const [daily, setDaily] = useState(null);
    const [weeklyEarnings, setWeeklyEarnings] = useState([]);
    const [weeklyAppointments, setWeeklyAppointments] = useState([]);
    const [monthlyEarnings, setMonthlyEarnings] = useState([]);
    const [monthlyAppointments, setMonthlyAppointments] = useState([]);

    const fetchDaily = async () => {
        try {
            const response = await axios.get(`https://cleanez-api.vercel.app/api/admin/generateDailyReport`);

            console.log(response.data.dailyReport);
        } catch (e) {
            console.log(e);
        }
    }
    const fetchWeekly = async () => {
        try {
            const response = await axios.get(`https://cleanez-api.vercel.app/api/admin/generateGraphWeeklyReport`);

            setWeeklyEarnings(response.data.weelyReport.weeklyEarnings);
            setWeeklyAppointments(response.data.weelyReport.weeklyAppointment);
        } catch (e) {
            console.log(e);
        }
    }
    const fetchMonthly = async () => {
        try {
            const response = await axios.get(`https://cleanez-api.vercel.app/api/admin/generateGraphMonthlyReport`);

            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        document.title = "CleanEZ | Dashboard"

        // fetchDaily();
        fetchWeekly();
        fetchMonthly();
    }, [])

    return (  
        <div className="dashboard-page">
            <Plot
            data={[
            {
                x: ["SN", "MN", "TS", "WD", "TH", "FR", "ST"],
                y: weeklyEarnings,
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'green'},
            },
            ]}
            layout={ {width: 320, height: 240, title: {text: 'Weekly Earnings'}} }
            />
            <Plot
            data={[
            {
                x: ["SN", "MN", "TS", "WD", "TH", "FR", "ST"],
                y: weeklyAppointments,
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'green'},
            },
            ]}
            layout={ {width: 320, height: 240, title: {text: 'Weekly Appointments'}} }
            />
        </div>
    );
}
 
export default AdminDashboard;