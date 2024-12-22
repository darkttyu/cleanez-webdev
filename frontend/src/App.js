import HomePage from './pages/HomePage';
import LoginPage from './pages/UserSigningPages/LoginPage';
import SignupPage from './pages/UserSigningPages/SignupPage';
import FAQsPage from './pages/FAQsPage';
import FindAccountPage from './pages/UserSigningPages/FindAccountPage3';
import Test from './Test';

import { BrowserRouter as Router, Route, Switch, Routes, Navigate } from 'react-router-dom';

function App() {
    return (
        <Router>
        <div className="App">
            <Routes>
                <Route path="/" element={<Navigate to="/home"/>}/>
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/frequently-asked-questions" element={<FAQsPage/>}/>
            </Routes>
        </div>
        </Router>
    );
}
export default App;