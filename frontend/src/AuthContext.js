// src/context/AuthContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create Context
const AuthContext = createContext();

// AuthProvider component to wrap around your app
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // State to store user data

    //Constant Checking if user is still Logged-in
    useEffect(() => {
        let isMounted = true;

        const fetchUserData = async() => {
            const role = localStorage.getItem("role");
            if(!role) {
                console.log("No role found. User is not logged in.");
                return;
            }

            const token = localStorage.getItem("token");
            if (!token && role === 'Admin') {
                console.log("No token found. User is not logged in.");
                setUser(null);
                return;
            }

            try {
                let response;
                if (role === 'User') {
                    console.log("Log in in as a User");
                    response = await axios.get(`http://localhost:5000/api/user/getAccountInformation`,{
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                } else if (role === 'Worker') {
                    console.log("Log in in as a Worker");
                    response = await axios.get(`http://localhost:5000/api/worker/getWorkerAccountInformation`,{
                        headers: { 'Authorization': `Bearer ${token}` }
                    });

                }
                
                if (isMounted) {
                    console.log(response.data.user);
                    setUser({...response.data.user});
                }

            } catch (e) {
                console.log(e);
            }
        }

        fetchUserData();

        return () => {
            isMounted = false;
        };
    }, [])

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
