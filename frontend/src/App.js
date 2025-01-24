import HomePage from './pages/HomePage';
import LoginPage from './pages/UserSigningPages/LoginPage';
import SignupPage from './pages/UserSigningPages/SignupPage';
import FAQsPage from './pages/FAQsPage';
import VerificationPage from './pages/UserSigningPages/VerificationPage'
import FindAccountPage1 from './pages/UserSigningPages/FindAccountPage1';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import BookingPage from './pages/BookingPages/BookingPage';
import BookingSuccess from './pages/BookingPages/BookingSuccess';
import { useNavigate } from 'react-router-dom';
import AccountLayout from './pages/UserPages/AccountLayout';
import UserProfile from './pages/UserPages/UserProfile';
import UserDashboard from './pages/UserPages/UserDashboard';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<HomePage isLoggedIn={false} />} />
                    <Route path="/home/:id" element={<HomePage isLoggedIn={true} />} />
                    <Route path="/login" element={<LoginPage route="login"/>} />
                    <Route path="/adminLogin" element={<LoginPage route="adminLogin"/>} />
                    <Route path="/signup" element={<SignupPage />}/>
                    <Route path='/signup/verify-email' element={<VerificationPage/>} />
                    <Route path="/frequently-asked-questions" element={<FAQsPage />} />
                    <Route path="/forgot-password" element={<FindAccountPage1/>} />
                    <Route path='/booking' element={<BookingPage/>}/>
                    <Route path='/booking/success' element={<BookingSuccess/>}/>
                    <Route path='/account' element={<AccountLayout/>}>
                        <Route index element={<Navigate to='/account/profile'/>}/>
                        <Route path='profile' element={<UserProfile/>}/>
                        <Route path='dashboard' element={<UserDashboard/>}/>
                        {/* <Route to='appointments' element={<AccAppointments/>}/> */}
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}
export default App;