import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useUser } from './UserContext';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setLoggedUserData } = useUser();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const validate = () => {
        let isValid = true;

        if (username === "" || password === "") {
            isValid = false;
            toast.warning("Please enter both username and password");
        }
        return isValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            axios.get("http://localhost:3001/user")
                .then((response) => {
                    // debugger;
                    const users = response.data;
                    const isUserPresent = users.find(m => m.userName === username && m.password === password);
                    // debugger;
                    if (isUserPresent) {
                        toast.success("Login successful");
                        sessionStorage.setItem("ticketUserData", JSON.stringify(isUserPresent));
                        navigate("/ticket");
                    } else {
                        toast.error("Please enter valid username and password");
                    }
                })
                .catch((error) => {
                    toast.error("Login failed due to " + error.message);
                });
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username</label>
                    <input type="text" id="username" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                        value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                    <input type="password" id="password" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500">Login</button>
            </form>
            <div className="text-center mt-4">
                <p className="text-gray-600">Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></p>
            </div>
        </div>
    );
};

export default Login;
