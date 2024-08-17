import React, { useState } from "react";
import {
    MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody
} from 'mdb-react-ui-kit';
import './login.css';
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [loginError, setLoginError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: '',
        });
        setLoginError('');
    };

    const validate = () => {
        let isValid = true;
        let newErrors = { email: '', password: '' };

        if (!formValues.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            newErrors.email = 'Invalid email format';
            isValid = false;
        }

        if (!formValues.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setSubmitted(true);
            try {
                const response = await fetch(`http://localhost:3001/users`);
                const users = await response.json();
                const user = users.find(user => user.email === formValues.email && user.password === formValues.password);
                if (user) {
                    if (user.role === 'admin') {
                        navigate("/paddyTable");
                        setIsAuthenticated(true);
                    } else if (user.role === 'user') {
                        navigate("/paddy");
                        setIsAuthenticated(true);
                    }
                } else {
                    setLoginError('Invalid email or password');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
                setLoginError('Failed to log in, please try again later');
            }
        }
    };

    return (
        <MDBContainer fluid className='p-0 heightView'>
            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol md='6'>
                    <form onSubmit={handleSubmit}>
                        <MDBContainer>
                            <MDBRow className='g-0'>
                                <MDBCol md='12'>
                                    <h4 className="text-white mb-4">TN Hulling Management System</h4>
                                    <MDBCard className='mx-2 mb-2 p-2 shadow-5 borderColor'>
                                        <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
                                            {loginError && (
                                                <div className="text-danger mb-2">{loginError}</div>
                                            )}
                                            <div className='col-md-12'>
                                                <label htmlFor="email" className="form-label-text form-label float-start fst-italic fw-bold">Email</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formValues.email}
                                                    onChange={handleChange}
                                                    className={`form-control fst-italic fw-bold ${errors.email ? 'is-invalid' : ''}`}
                                                />
                                                {errors.email && (
                                                    <div className="invalid-feedback">
                                                        {errors.email}
                                                    </div>
                                                )}
                                            </div>
                                            <div className='col-md-12 mt-3'>
                                                <label htmlFor="password" className="form-label-text form-label float-start fst-italic fw-bold">Password</label>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    value={formValues.password}
                                                    onChange={handleChange}
                                                    className={`form-control fst-italic fw-bold ${errors.password ? 'is-invalid' : ''}`}
                                                />
                                                {errors.password && (
                                                    <div className="invalid-feedback">
                                                        {errors.password}
                                                    </div>
                                                )}
                                            </div>
                                            <button type="submit" className="loginBtn btn btn-success mt-3 w-25 m-auto">Login</button>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default Login;
