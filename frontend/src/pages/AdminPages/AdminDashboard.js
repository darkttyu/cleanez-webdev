import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

import LoadingScreen2 from '../../components/LoadingScreen2';

const AdminDashboard = () => {
    const [weeklyEarnings, setWeeklyEarnings] = useState([]);
    const [weeklyAppointments, setWeeklyAppointments] = useState([]);
    const [monthlyEarnings, setMonthlyEarnings] = useState([]);
    const [monthlyAppointments, setMonthlyAppointments] = useState([]);

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

            setMonthlyEarnings(response.data.monthlyReport.monthlyEarnings);
            setMonthlyAppointments(response.data.monthlyReport.monthlyAppointments);
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
            {weeklyEarnings?.length === 0 || weeklyAppointments?.length === 0 ||
             monthlyEarnings?.length === 0 || monthlyAppointments?.length === 0 ?
            <LoadingScreen2 /> :
            <>
                <div className='dashboard-graph'>
                <Plot
                    data={[
                        {
                            x: ["SN", "MN", "TS", "WD", "TH", "FR", "ST"],
                            y: weeklyEarnings,
                            type: 'scatter',
                            mode: 'line+scatter',
                            marker: { color: 'green' },
                        },
                    ]}
                    layout={{ width: 480, height: 480, title: { text: 'Weekly Earnings' } }}
                />
                </div>
                <div className='dashboard-graph'>
                    <Plot
                        data={[
                            {
                                x: ["SN", "MN", "TS", "WD", "TH", "FR", "ST"],
                                y: weeklyAppointments,
                                type: 'scatter',
                                mode: 'line+scatter',
                                marker: { color: 'freen' },
                            },
                        ]}
                        layout={{ width: 480, height: 480, title: { text: 'Weekly Appointments' } }}
                    />
                </div>
                <div className='dashboard-graph'>
                    <Plot
                        data={[
                            {
                                x: Array.from({ length: 31 }, (_, i) => i + 1),
                                y: monthlyEarnings,
                                type: 'scatter',
                                mode: 'line+scatter',
                                marker: { color: 'blue' },
                            },
                        ]}
                        layout={{ width: 480, height: 480, title: { text: 'Monthly Earnings' } }}
                    />
                </div>
                <div className='dashboard-graph'>
                    <Plot
                        data={[
                            {
                                x: Array.from({ length: 31 }, (_, i) => i + 1),
                                y: monthlyAppointments,
                                type: 'scatter',
                                mode: 'line+scatter',
                                marker: { color: 'blue' },
                            },
                        ]}
                        layout={{ width: 480, height: 480, title: { text: 'Monthly Appointments' } }}
                    />
                </div>
            </>
        }
            
        </div>
    );
};

export default AdminDashboard;
