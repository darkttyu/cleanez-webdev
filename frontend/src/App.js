import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/UserSigningPages/LoginPage';
import SignupPage from './pages/UserSigningPages/SignupPage';
import FindAccountPage from './pages/UserSigningPages/FindAccountPage3';
import Test from './Test';

import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';

function App() {
    return (
        <Router>
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </div>
        </Router>
    );
}
  // Test Comment
export default App;