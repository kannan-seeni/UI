import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';

const GodownInput = ({ handleFormGodownInput }) => {
    const [formValues, setFormValues] = useState({
        godownId: "",
        region: "",
        godownName: "",
        emailId: "",
        mobileNo: "",
        aqName: "",
        superintendent: "",
        // distance: "",
        address: "",
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }));
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formValues.godownId) newErrors.godownId = "Godown Id is required";
        if (!formValues.region) newErrors.region = "Region is required";
        if (!formValues.godownName) newErrors.godownName = "Godown Name is required";
        if (!formValues.emailId) newErrors.emailId = "Email Id is required";
        if (!formValues.mobileNo) newErrors.mobileNo = "Mobile No is required";
        if (!formValues.aqName) newErrors.aqName = "AQ Name is required";
        if (!formValues.superintendent) newErrors.superintendent = "Superintendent is required";
        // if (!formValues.distance) newErrors.distance = "Distance is required";
        if (!formValues.address) newErrors.address = "Address is required";
        return newErrors;
    };

    const handleSubmitGodown = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const response = await fetch('http://localhost:3001/godwonData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            console.log('Data submitted successfully:', data);
            resetForm();
            handleFormGodownInput(formValues);
            navigate('/masterdatagodown');
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    const handleBackGodownTable = () => {
        navigate('/masterdatagodown');
    };

    const resetForm = () => {
        setFormValues({
            godownId: "",
            region: "",
            godownName: "",
            emailId: "",
            mobileNo: "",
            aqName: "",
            superintendent: "",
            // distance: "",
            address: "",
        });
        setErrors({});
    };

    return (
        <MDBContainer fluid className='p-0 bgImg mt-5'>
            <MDBRow className='d-flex h-100 p-4 align-items-center'>
                <MDBCol md='12'>
                    <form onSubmit={handleSubmitGodown} className='bgColor p-4 rounded shadow'>
                        <MDBRow className='g-4'>
                            {/* Godown Id */}
                            <MDBCol md='4 mt-5 pt-3'>
                                <MDBInput
                                    type="text"
                                    id="godownId"
                                    name="godownId"
                                    value={formValues.godownId}
                                    onChange={handleChange}
                                    className={`form-control ${errors.godownId ? 'is-invalid' : ''}`}
                                    label="Godown Id"
                                />
                                {errors.godownId && <span className="text-danger fontSize">{errors.godownId}</span>}
                            </MDBCol>
                            {/* Region */}
                            <MDBCol md='4'>
                                <label htmlFor="region" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">Region</label>
                                <select
                                    id="region"
                                    name="region"
                                    value={formValues.region}
                                    onChange={handleChange}
                                    className={`form-control ${errors.region ? 'input-invalid' : ''}`}
                                >
                                    <option value="">Select Region</option>
                                    <option value="Madurai">Madurai</option>
                                    <option value="Tiruchirappalli">Tiruchirappalli</option>
                                    <option value="Thanjavur">Thanjavur</option>
                                </select>
                                {errors.region && <span className="text-danger fontSize">{errors.region}</span>}
                            </MDBCol>

                            {/* Godown Name */}
                            <MDBCol md='4 mt-4'>
                                <label htmlFor="godownName" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">Godown Name</label>
                                <select
                                    id="godownName"
                                    name="godownName"
                                    value={formValues.godownName}
                                    onChange={handleChange}
                                    className={`form-control ${errors.godownName ? 'input-invalid' : ''}`}
                                >
                                    <option value="">Select Godown Name</option>
                                    <option value="MELLUR">MELLUR</option>
                                    <option value="USILAMPATTI">USILAMPATTI</option>
                                    <option value="THIRUMANGALAM">THIRUMANGALAM</option>
                                    <option value="VADIPATTI">VADIPATTI</option>
                                    <option value="V.K.Puram II">V.K.Puram II</option>
                                </select>
                                {errors.godownName && <span className="text-danger fontSize">{errors.godownName}</span>}
                            </MDBCol>

                            {/* Email Id */}
                            <MDBCol md='4 mt-4 pt-3'>
                                <MDBInput
                                    type='email'
                                    value={formValues.emailId}
                                    name='emailId'
                                    onChange={handleChange}
                                    id='emailId'
                                    label='Email Id'
                                    className={`form-control ${errors.emailId ? 'input-invalid' : ''}`}
                                />
                                {errors.emailId && <span className="text-danger fontSize">{errors.emailId}</span>}
                            </MDBCol>
                            {/* Mobile No */}
                            <MDBCol md='4'>
                                <MDBInput
                                    type="number"
                                    id="mobileNo"
                                    name="mobileNo"
                                    value={formValues.mobileNo}
                                    onChange={handleChange}
                                    className={`form-control ${errors.mobileNo ? 'is-invalid' : ''}`}
                                    label="Mobile No"
                                />
                                {errors.mobileNo && <span className="text-danger fontSize">{errors.mobileNo}</span>}
                            </MDBCol>
                            <MDBCol md='4'>
                                <MDBInput
                                    type="text"
                                    id="aqName"
                                    name="aqName"
                                    value={formValues.aqName}
                                    onChange={handleChange}
                                    className={`form-control ${errors.aqName ? 'is-invalid' : ''}`}
                                    label="AQ Name"
                                />
                                {errors.aqName && <span className="text-danger fontSize">{errors.aqName}</span>}
                            </MDBCol>
                            <MDBCol md='4'>
                                <MDBInput
                                    type="text"
                                    id="superintendent"
                                    name="superintendent"
                                    value={formValues.superintendent}
                                    onChange={handleChange}
                                    className={`form-control ${errors.superintendent ? 'is-invalid' : ''}`}
                                    label="Superintendent"
                                />
                                {errors.superintendent && <span className="text-danger fontSize">{errors.superintendent}</span>}
                            </MDBCol>
                            {/* <MDBCol md='4'>
                                <MDBInput
                                    type="text"
                                    id="distance"
                                    name="distance"
                                    value={formValues.distance}
                                    onChange={handleChange}
                                    className={`form-control ${errors.distance ? 'is-invalid' : ''}`}
                                    label="Distance"
                                />
                                {errors.distance && <span className="text-danger fontSize">{errors.distance}</span>}
                            </MDBCol> */}
                            <MDBCol md='4'>
                                <MDBInput
                                    value={formValues.address}
                                    name='address'
                                    onChange={handleChange}
                                    id='address'
                                    label='Address'
                                    type='text'
                                    className={`form-control ${errors.address ? 'input-invalid' : ''}`}
                                />
                                {errors.address && <span className="text-danger fontSize">{errors.address}</span>}
                            </MDBCol>
                        </MDBRow>
                        <button type="submit" className="loginBtn btn btn-success mb-3 mt-3 mx-2" onClick={handleSubmitGodown}>Save</button>
                        <button type="button" className="loginBtn btn mb-3 mt-3" onClick={handleBackGodownTable}>Back</button>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default GodownInput;
