// src/context/AuthContext.js

import React, { createContext, useState, useContext } from 'react';

// Create Context
const AuthContext = createContext();

// AuthProvider component to wrap around your app
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // State to store user data

    const login = (userData) => {
        setUser(userData); // Store the user data after successful login
    };

    const logout = () => {
        setUser(null); // Clear user data on logout
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to access authentication state
export const useAuth = () => {
    return useContext(AuthContext);
};
