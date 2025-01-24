// src/context/AuthContext.js

import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

// Create Context
const AuthContext = createContext();

// AuthProvider component to wrap around your app
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // State to store user data

    const login = (userData) => {
        setUser(userData); // Store the user data after successful login
    };

    const logout = async () => {
        setUser(null); // Clear user data on logout

        const response = await axios.post('http://localhost:5000/api/auth/logout',
            {
            headers: { 'Content-Type': 'application/json' }
          });

          console.log(response.data); // Checks if cookie has been cleared
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to access authentication state
export const useAuth = () => {
    return useContext(AuthContext);
};
