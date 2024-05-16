import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { useUser } from './UserContext';
import axios from 'axios';

const Registration = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const Navigate = useNavigate();
    // const { setLoggedUserData } = useUser(); 

    const IsValidate = () => {
        let isProceed = true;
        let errorMessage = "Please enter the value in ";
        if (id === '' || id === null) {
            isProceed = false;
            errorMessage += 'Username, ';
        }
        if (name === '' || name === null) {
            isProceed = false;
            errorMessage += 'Name, ';
        }
        if (password === '' || password === null) {
            isProceed = false;
            errorMessage += 'Password, ';
        }
        if (email === '' || email === null) {
            isProceed = false;
            errorMessage += 'Email, ';
        }
        if (phone === '' || phone === null) {
            isProceed = false;
            errorMessage += 'Phone';
        }
        if (!isProceed) {
            toast.warning(errorMessage);
        }else{
            if(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){

            }else{
                toast.warning("Please Enter The Valid Email")
            }
        }
        return isProceed;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const regObj = { id, name, password, email, phone };
        if (IsValidate()) {
            // debugger;
            axios.post("http://localhost:3001/user", regObj, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((res) => {
                if (res.status === 200) {
                    toast.success("Registered Successfully...");
                    Navigate('/login');
                } else {
                    toast.error("Failed to Register. Please try again.");
                }
            })
            .catch((err) => {
                toast.error("Failed: " + err.message);
            });
        }
    };
    

    return (
        <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username</label>
                    <input type="text" id="username" className="w-full px-3 py-2 border rounded-md"
                        value={id} onChange={(e) => setId(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                    <input type="password" id="password" className="w-full px-3 py-2 border rounded-md"
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="fullname" className="block text-gray-700 font-semibold mb-2">Full Name</label>
                    <input type="text" id="fullname" className="w-full px-3 py-2 border rounded-md"
                        value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input type="email" id="email" className="w-full px-3 py-2 border rounded-md"
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                    <input type="tel" id="phone" className="w-full px-3 py-2 border rounded-md"
                        value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Register</button>
                <div className="w-full bg-red-500 text-white py-2 px-4 mt-4 rounded hover:bg-red-600">
                <Link to={"/login"} type="button" >Go To Login If Already Registered</Link>
                </div>
            </form>
        </div>
    );
};

export default Registration;
