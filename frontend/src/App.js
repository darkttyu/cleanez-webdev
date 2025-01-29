import HomePage from './pages/HomePage';
import LoginPage from './pages/UserSigningPages/LoginPage';
import SignupPage from './pages/UserSigningPages/SignupPage';
import FAQsPage from './pages/FAQsPage';
import VerificationPage from './pages/UserSigningPages/VerificationPage'
import FindAccountPage1 from './pages/UserSigningPages/FindAccountPage1';
import FindAccountPage2 from './pages/UserSigningPages/FindAccountPage2';
import FindAccountPage3 from './pages/UserSigningPages/FindAccountPage3';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import BookingPage from './pages/BookingPages/BookingPage';
import BookingSuccess from './pages/BookingPages/BookingSuccess';
import { useNavigate } from 'react-router-dom';
import AccountLayout from './pages/AccountLayout';
import UserProfile from './pages/UserPages/UserProfile';
import UserDashboard from './pages/UserPages/UserDashboard';
import UserAppointments from './pages/UserPages/UserAppointments';
import WorkerProfile from './pages/UserPages/WorkerProfile';
import WorkerAppointments from './pages/UserPages/WorkerAppointments';
import WorkerSchedule from './pages/UserPages/WorkerSchedule';
import { useAuth } from './AuthContext';
import { useEffect, useState } from 'react';
import ApplicationPage from './pages/ApplicationPages/ApplicationPage';
import ApplicationSuccess from './pages/ApplicationPages/ApplicationSuccess';
import AdminApplicants from './pages/AdminPages/AdminApplicants';


function App() {
    const { user } = useAuth();
    const [role, setRole] = useState("");

    useEffect(() => {
        if (user) {
            setRole(String(user.role).toLowerCase());
        }
    }, [user])

    const setRoleRouting = () => {
        if (role === "" || !role) {
            return []
        } else if (role === "user") {
            return (
                [
                    <Route path='profile' element={<UserProfile/>}/>,
                    <Route path='dashboard' element={<UserDashboard/>}/>,
                    <Route path='appointments' element={<UserAppointments/>}/>
                ]
            );
        } else if (role === "worker") {
            return (
                [
                    <Route path='profile' element={<WorkerProfile/>}/>,
                    <Route path='appointments' element={<WorkerAppointments/>}/>,
                    <Route path='schedule' element={<WorkerSchedule/>}/>
                ]
            )
        }
    }

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<HomePage/>} />
                    <Route path="/login" element={<LoginPage route="login"/>} />
                    <Route path="/adminLogin" element={<LoginPage route="adminLogin"/>} />
                    <Route path="/signup" element={<SignupPage />}/>
                    <Route path='/signup/verify-email' element={<VerificationPage/>} />
                    <Route path="/frequently-asked-questions" element={<FAQsPage />} />
                    <Route path="/forgot-password" element={<FindAccountPage1/>} />
                    <Route path="/reset-password/:id" element={<FindAccountPage3/>}/>
                    <Route path='/booking' element={<BookingPage/>}/>
                    <Route path='/booking/success' element={<BookingSuccess/>}/>
                    <Route path='/account' element={<AccountLayout/>}>
                        <Route index element={<Navigate to='/account/profile'/>}/>
                        {setRoleRouting()?.map(route => route)}
                    </Route>
                    <Route path='/application' element={<ApplicationPage/>}/>
                    <Route path='/application/success' element={<ApplicationSuccess/>}/>
                    <Route path='/admin' element={<AccountLayout/>}>
                        <Route index element={<Navigate to='/admin/applicants'/>}/>
                        {/* <Route path='dashboard' element={<WorkerSchedule/>}/> */}
                        <Route path='applicants' element={<AdminApplicants/>}/>
                        {/* <Route path='workers' element={<WorkerSchedule/>}/> */}
                        {/* <Route path='users' element={<WorkerSchedule/>}/> */}
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;