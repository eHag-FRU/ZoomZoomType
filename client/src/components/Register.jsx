import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
    const [imagePreview, setImagePreview] = useState(null); 
    const [imageFile, setImageFile] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if(file) {
            setImagePreview(URL.createObjectURL(file));
            setImageFile(file);
        }
    }

    const handleClearImage = () => {
        setImagePreview(null);
        setImageFile(null);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted")
    }

    return (
        <div className="container-fluid" style={{ backgroundColor: "#002F5C", minHeight: "100vh"}}>

            {/* "Register" header */}
            <div className='text-center text-white pt-5'>
                <h1>Register</h1>
                <hr style={{ border: "0.15em solid black" }} />
            </div>

            <div className='container mt-5'>
                <div className="row text-white align-items-start">

                    {/* Profile image/choose file/clear image section */}
                    <div className="col-12 col-md-4 text-center">
                        <form onSubmit={handleSubmit}>
                            <div className="border bg-white text-dark mx-auto mb-3"
                                style={{ width: '100%', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : ( <span>Profile Image Preview</span> )}
                            </div>

                            <div className="d-grid gap-2 col-8 mx-auto">
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="form-control mb-2" />
                                <button type="button" className="btn btn-outline-light" onClick={handleClearImage}>Clear Image</button>
                            </div>
                        </form>
                    </div>
                    
                    {/* Username/email/password section */}
                    <div className="col-12 col-md-4 offset-md-4">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="text" id="username" name="username" className="form-control" placeholder="ex.) JDoe" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" id="email" name="email" className="form-control" placeholder="ex.) jane@doe.com" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" id="password" name="password" className="form-control" placeholder="********" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Confrim Password</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" className="form-control" placeholder="********" />
                            </div>
                                
                            <div style={{ marginTop: '1.5em'}}>
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