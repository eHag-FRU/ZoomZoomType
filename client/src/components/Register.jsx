import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"

const Register = () => {
    const navigate = useNavigate();

    const [formValue, setFormValue] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [registerError, setRegisterError] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);

    function handleFormChange(e) {
        const { name, value } = e.target;
        setFormValue(prev => ({ ...prev, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setRegisterError(false);
        setRegisterSuccess(false);

        if (formValue.password !== formValue.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const formData = {
                email: formValue.email,
                password: formValue.password,
                userName: formValue.username,
            };

            const response = await axios.post("http://localhost:3000/api/createAccount", formData);

            if (response.status === 200) {
                console.log("Account created successfully!");
                setRegisterSuccess(true);

                setTimeout(() => navigate("/login"), 1500);
            } else {
                console.log("Registration failed.");
                setRegisterError(true);
            }
        } catch (err) {
            console.error("Error creating account:", err);
            setRegisterError(true);
        }
    }

    return (
        <div className="container-fluid" style={{ backgroundColor: "#002F5C", minHeight: "100vh"}}>

            {/* "Register" header */}
            <div className='text-center text-white pt-5'>
                <h1>Register</h1>
                <hr style={{ border: "0.15em solid black" }} />
            </div>

            <div className="container mt-5">
                <div className="row text-white justify-content-center">
                    <div className="col-12 col-md-6">
                        <form onSubmit={handleSubmit}>
                            {registerError && <p style={{ color: 'red' }}>Email already in use. Please try again.</p>}
                            {registerSuccess && <p style={{ color: 'lightgreen' }}>Account created! Redirecting to login...</p>}

                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="form-control"
                                    placeholder="ex.) JDoe"
                                    value={formValue.username}
                                    onChange={handleFormChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="ex.) jane@doe.com"
                                    value={formValue.email}
                                    onChange={handleFormChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="********"
                                    value={formValue.password}
                                    onChange={handleFormChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="form-control"
                                    placeholder="********"
                                    value={formValue.confirmPassword}
                                    onChange={handleFormChange}
                                />
                            </div>

                            <div style={{ marginTop: '1.5em' }}>
                                <button type="submit" className="btn btn-outline-light">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;