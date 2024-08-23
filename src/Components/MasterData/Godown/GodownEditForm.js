import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBTextArea, MDBInput } from 'mdb-react-ui-kit';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const GodownEditForm = () => {
    const [formValues, setFormValues] = useState({
        region: "",
        godownId: "",
        godownName: "",
        emailId: "",
        mobileNo: "",
        aqName: "",
        superintendent: "",
        distance: "",
        address: ""
    });
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3001/godwonData/${id}`)
            .then(response => response.json())
            .then(data => {
                setItem(data);
                setFormValues({
                    ...data
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [id]);

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
    const handleSubmitPaddy = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formValues.date) newErrors.date = 'Date is required';
        // Add other validations as needed

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const updatedData = { ...formValues };
        fetch(`http://localhost:3001/godwonData/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                navigate('/masterdatagodown'); // Redirect back to the main page after saving
            })
            .catch(error => console.error('Error updating data:', error));
    };

    const handleCancel = () => {
        navigate('/masterdatagodown');
    };

    const toggleEditMode = () => {
        setEditMode(prevMode => !prevMode);
    };

    return (
        <MDBContainer fluid className='p-0 bgImg mt-5'>
            <MDBRow className='d-flex h-100 p-4 align-items-center'>
                {/* <MDBCol md='4' className="d-none d-md-block text-center">
                    <MDBCardImage src={headerImg} alt="Sample photo" className="rounded-start w-100 h-100" fluid />
                </MDBCol> */}
                <MDBCol md='12'>
                    <form onSubmit={handleSubmitPaddy} className="bgColor">
                        <MDBRow className='g-4'>
                            <MDBRow className='g-4'>
                                {/* Godown Id*/}
                                <MDBCol md='4'>
                                    <MDBInput
                                        value={formValues.godownId}
                                        name='godownId'
                                        onChange={handleChange}
                                        id='godownId'
                                        label='Godown Id'
                                        className={`form-control ${errors.godownId ? 'input-invalid' : ''}`}
                                        disabled={!editMode}
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
                                        disabled={!editMode}
                                    >
                                        <option value="">Select Region</option>
                                        <option value="Madurai">Madurai</option>
                                        <option value="Tiruchirappalli">Tiruchirappalli</option>
                                        <option value="Thanjavur">Thanjavur</option>
                                    </select>
                                    {errors.region && <span className="text-danger fontSize">{errors.region}</span>}
                                </MDBCol>
                                {/* Godwon Name*/}
                                <MDBCol md='4'>
                                    <label htmlFor="godownName" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">Godwon Name</label>
                                    <select
                                        id="godownName"
                                        name="godownName"
                                        value={formValues.godownName}
                                        onChange={handleChange}
                                        className={`form-control ${errors.godownName ? 'input-invalid' : ''}`}
                                        disabled={!editMode}
                                    >
                                        <option value="">Select Godwon Name</option>
                                        <option value="MADURAI">Madurai</option>
                                        <option value="SIVAGANGA">Sivaganga</option>
                                        <option value="Pudukkottai">Pudukkottai</option>
                                        <option value="VADIPATTI">VADIPATTI</option>
                                        <option value="V.K.Puram II">V.K.Puram II</option>
                                    </select>
                                    {errors.godownName && <span className="text-danger fontSize">{errors.godownName}</span>}
                                </MDBCol>
                                {/* Email Id */}
                                <MDBCol md='4 '>
                                    <MDBInput
                                        value={formValues.emailId}
                                        type='email'
                                        name='emailId'
                                        onChange={handleChange}
                                        id='emailId'
                                        label='Email Id'
                                        className={`form-control ${errors.emailId ? 'input-invalid' : ''}`}
                                        disabled={!editMode}
                                    />
                                    {errors.emailId && <span className="text-danger fontSize">{errors.emailId}</span>}
                                </MDBCol>
                                {/* Mobile Number */}
                                <MDBCol md='4 '>
                                    <MDBInput
                                        value={formValues.mobileNo}
                                        type='number'
                                        name='mobileNo'
                                        onChange={handleChange}
                                        id='mobileNo'
                                        label='Mobile Number'
                                        className={`form-control ${errors.mobileNo ? 'input-invalid' : ''}`}
                                        disabled={!editMode}
                                    />
                                    {errors.mobileNo && <span className="text-danger fontSize">{errors.mobileNo}</span>}
                                </MDBCol>
                                {/* AQ Name */}
                                <MDBCol md='4 '>
                                    <MDBInput
                                        value={formValues.aqName}
                                        type='text'
                                        name='aqName'
                                        onChange={handleChange}
                                        id='aqName'
                                        label='AQ Name'
                                        className={`form-control ${errors.aqName ? 'input-invalid' : ''}`}
                                        disabled={!editMode}
                                    />
                                    {errors.aqName && <span className="text-danger fontSize">{errors.aqName}</span>}
                                </MDBCol>
                                {/* Superintendent */}
                                <MDBCol md='4 '>
                                    <MDBInput
                                        value={formValues.superintendent}
                                        type='text'
                                        name='superintendent'
                                        onChange={handleChange}
                                        id='superintendent'
                                        label='Superintendent'
                                        className={`form-control ${errors.superintendent ? 'input-invalid' : ''}`}
                                        disabled={!editMode}
                                    />
                                    {errors.superintendent && <span className="text-danger fontSize">{errors.superintendent}</span>}
                                </MDBCol>
                                {/* Superintendent */}
                                <MDBCol md='4 '>
                                    <MDBTextArea
                                        value={formValues.address}
                                        type='text'
                                        name='address'
                                        onChange={handleChange}
                                        id='address'
                                        label='address'
                                        className={`form-control ${errors.address ? 'input-invalid' : ''}`}
                                        disabled={!editMode}
                                    />
                                    {errors.address && <span className="text-danger fontSize">{errors.address}</span>}
                                </MDBCol>
                            </MDBRow>
                        </MDBRow>

                        {editMode && (
                            <>
                                <button type="submit" className="loginBtn btn btn-success mb-3 mt-3" onClick={handleSubmitPaddy}>Update Data</button>
                                {/* <button type="button" className="loginBtn btn btn-default mb-3 mt-3 mx-2" onClick={handleCancel}>Cancel</button> */}
                            </>
                        )}
                        {!editMode && (
                            <button type="button" className="loginBtn btn btn-primary mb-3 mt-3  mx-2" onClick={toggleEditMode}>
                                {/* {editMode ? 'Disable Editing' : 'Enable Editing'} */}
                                Enable Editing
                            </button>
                        )}
                        <button type="button" className="loginBtn btn btn-default mb-3 mt-3 mx-2" onClick={handleCancel}>Cancel</button>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default GodownEditForm;
