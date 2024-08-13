import React, { useState } from "react";
import {
    MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody
} from 'mdb-react-ui-kit';
import './login.css';
const Login = () => {
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });
    const [submitted, setSubmitted] = useState(false);
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
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
          setSubmitted(true);
          console.log('Form Submitted:', formValues);
        }
      };
    
    return (
        <MDBContainer fluid className='background p-0'>
            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol md='6'>
                    <MDBCard className='cardBGImg mt-5'>
                        <MDBRow className='g-0'>
                            <MDBCol md='12'>
                                <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
                                    <form onSubmit={handleSubmit}>
                                        <MDBContainer>
                                            <MDBRow className='g-0'>
                                                <MDBCol md='12'>
                                                    <MDBCard className='mx-2 mb-2 p-2 shadow-5'>
                                                        <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
                                                            {submitted && Object.values(errors).every(error => error === '') && (
                                                                <div color='success'>
                                                                    Form submitted successfully!
                                                                </div>
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
                                                            <button type="submit" className="loginBtn btn btn-success mt-3 w-25 m-auto">Submit</button>
                                                        </MDBCardBody>
                                                    </MDBCard>
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBContainer>
                                    </form>
                                </MDBCardBody>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}
export default Login;