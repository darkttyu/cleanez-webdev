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
import AccountLayout from './pages/UserPages/AccountLayout';
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
import AdminWorker from './pages/AdminPages/AdminWorker';
import AdminUsers from './pages/AdminPages/AdminUsers';
import AdminApplicantInfo from './pages/AdminPages/AdminApplicantInfo';
import AdminUserInfo from './pages/AdminPages/AdminUserInfo';
import AdminUserNew from './pages/AdminPages/AdminUserNew';
import AdminWorkerInfo from './pages/AdminPages/AdminWorkerInfo';
import AdminWorkerNew from './pages/AdminPages/AdminWorkerNew';
import AdminAppointments from './pages/AdminPages/AdminAppointments';
import AdminAppointmentInfo from './pages/AdminPages/AdminAppointmentInfo';


function App() {
    const { user } = useAuth();
    const [role, setRole] = useState("");

    useEffect(() => {
        if (user) {
            setRole(String(user.role).toLowerCase());
        }
        console.log("merp");
    }, [user])

    const setRoleRouting = () => {
        console.log("Role Route: ",role)
        if (role === "" || !role) {
            return []
        } else if (role === "user" || role === "applicant") {
            return (
                <>
                    <Route path='profile' element={<UserProfile/>}/>,
                    <Route path='dashboard' element={<UserDashboard/>}/>,
                    <Route path='appointments' element={<UserAppointments/>}/>
                </>
            );
        } else if (role === "worker") {
            return (
                <>
                    <Route path='profile' element={<WorkerProfile/>}/>,
                    <Route path='appointments' element={<WorkerAppointments/>}/>,
                    <Route path='schedule' element={<WorkerSchedule/>}/>
                </>
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
                        {setRoleRouting()}
                    </Route>
                    <Route path='/application' element={<ApplicationPage/>}/>
                    <Route path='/application/success' element={<ApplicationSuccess/>}/>
                    <Route path='/admin' element={<AccountLayout/>}>
                        <Route index element={<Navigate to='/admin/appointments'/>}/>
                        {/* <Route path='dashboard' element={<WorkerSchedule/>}/> */}
                        <Route path='appointments' element={<AdminAppointments/>}/>
                        <Route path='appointments/:id' element={<AdminAppointmentInfo/>}/>

                        <Route path='applicants' element={<AdminApplicants/>}/> 
                        <Route path='applicants/:id' element={<AdminApplicantInfo/>}/>
                        
                        <Route path='workers' element={<AdminWorker/>}/>
                        <Route path='workers/:id' element={<AdminWorkerInfo/>}/>
                        
                        <Route path='users' element={<AdminUsers/>}/>
                        <Route path='users/new-user' element={<AdminUserNew/>}/>
                        <Route path='users/new-worker/:id' element={<AdminWorkerNew/>}/>
                        <Route path='users/:id' element={<AdminUserInfo/>}/>
                        
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;