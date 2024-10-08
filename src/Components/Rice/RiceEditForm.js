import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardImage, MDBInput } from 'mdb-react-ui-kit';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import headerImg from '../../assets/paddyfield.jpg';

const RiceEditForm = () => {
    const [formValues, setFormValues] = useState({
        date: new Date(),
        kmsStartYear: null,
        kmsEndYear: null,
        region: '',
        truckMemoNo: '',
        godown: '',
        issueMemoNo: '',
        variety: '',
        moitureContent: '',
        noOfBags: '',
        weight: '',
        outturn:'1%',
        frk: '68%',
        lorryNo: '',
        adDate: new Date(),
        noOfNBBags: '',
        noOfONBBags: '',
        noOfSSBags: '',
        noOfSWPBags: '',
        qcfrk: "",
        qcMoitureContent: "",
    });
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3001/riceData/${id}`)
            .then(response => response.json())
            .then(data => {
                setItem(data);
                setFormValues({
                    ...data,
                    date: data.date ? new Date(data.date) : new Date(),
                    kmsStartYear: data.kmsStartYear ? new Date(data.kmsStartYear) : null,
                    kmsEndYear: data.kmsEndYear ? new Date(data.kmsEndYear) : null
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [id]);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormValues(prevState => ({
    //         ...prevState,
    //         [name]: value
    //     }));
    //     setErrors(prevErrors => ({
    //         ...prevErrors,
    //         [name]: ''
    //     }));
    // };
    const handleChange = (e) => {
        const { name, value } = e.target;
        const isNumericField = ['noOfBags', 'weightOfRiceWithFRK', 'weightOfRice', 'weightOfFRK'].includes(name);
        
        // Validate numeric fields
        if (isNumericField && (value === '' || !/^\d*\.?\d*$/.test(value))) {
            return;
        }
    
        setFormValues(prevState => {
            const newState = {
                ...prevState,
                [name]: value
            };
    
            // Calculate weightOfRiceWithFRK, weightOfFRK, and weightOfRice
            if (name === 'noOfBags') {
                const weightOfRiceWithFRK = parseFloat(value) * 50;
                newState.weightOfRiceWithFRK = weightOfRiceWithFRK;
                newState.weightOfFRK = weightOfRiceWithFRK * 0.01; // 1% of weightOfRiceWithFRK
                newState.weightOfRice = weightOfRiceWithFRK - newState.weightOfFRK;
            } else if (name === 'weightOfRiceWithFRK') {
                const weightOfFRK = parseFloat(value) * 0.01; // 1% of weightOfRiceWithFRK
                newState.weightOfFRK = weightOfFRK;
                newState.weightOfRice = parseFloat(value) - weightOfFRK;
            }
    
            return newState;
        });
    
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };
    const handleDateChange = (date) => {
        setFormValues(prevValues => ({
            ...prevValues,
            date: date
        }));
    };
    const handleADDateChange = (adDate) => {
        setFormValues(prevState => ({
            ...prevState,
            adDate
        }));
    };
    const handleStartDateChange = (date) => {
        setFormValues(prevValues => ({
            ...prevValues,
            kmsStartYear: date
        }));
    };

    const handleEndDateChange = (date) => {
        setFormValues(prevValues => ({
            ...prevValues,
            kmsEndYear: date
        }));
    };

    const handleSubmitPaddy = (e) => {
        e.preventDefault();

        const newErrors = {};
        const validateWeight = () => {
            const { noOfBags, noOfNBBags, noOfONBBags, noOfSSBags, noOfSWPBags } = formValues;
            const totalBags = parseFloat(noOfNBBags || 0) + parseFloat(noOfONBBags || 0) + parseFloat(noOfSSBags || 0) + parseFloat(noOfSWPBags || 0);
            return parseFloat(noOfBags) === totalBags;
        };
        if (!validateWeight()) newErrors.noOfBags = 'Bags must be equal to the sum of No of NB Bags, No of ONB Bags, No of SS Bags, and No of SWP Bags';
        if (!formValues.date) newErrors.date = 'Date is required';
        // Add other validations as needed

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const updatedData = { ...formValues };
        fetch(`http://localhost:3001/riceData/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                navigate('/riceTable'); // Redirect back to the main page after saving
            })
            .catch(error => console.error('Error updating data:', error));
    };

    const handleCancel = () => {
        navigate('/riceTable');
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
                            <MDBCol md='2'>
                                <label htmlFor="date" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">Date</label>
                                <DatePicker
                                    selected={formValues.date}
                                    onChange={handleDateChange}
                                    dateFormat="MM/dd/yyyy"
                                    className={`form-control ${errors.date ? 'input-invalid' : ''}`}
                                    disabled={!editMode}
                                />
                                {errors.date && <span className="text-danger fontSize">{errors.date}</span>}
                            </MDBCol>
                            <MDBCol md='2'>
                                <label htmlFor="kmsStartYear" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">KMS Start Year</label>
                                <DatePicker
                                    selected={formValues.kmsStartYear}
                                    onChange={handleStartDateChange}
                                    placeholderText="Start Year"
                                    showYearPicker
                                    dateFormat="yyyy"
                                    className={`form-control ${errors.kmsStartYear ? 'input-invalid' : ''}`}
                                    maxDate={new Date()}
                                    disabled={!editMode}
                                />
                                {errors.kmsStartYear && <span className="text-danger fontSize">{errors.kmsStartYear}</span>}
                            </MDBCol>
                            <MDBCol md='2'>
                                <label htmlFor="kmsEndYear" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">KMS End Year</label>
                                <DatePicker
                                    selected={formValues.kmsEndYear}
                                    onChange={handleEndDateChange}
                                    placeholderText="End Year"
                                    showYearPicker
                                    dateFormat="yyyy"
                                    className={`form-control ${errors.kmsEndYear ? 'input-invalid' : ''}`}
                                    maxDate={new Date()}
                                    disabled={!editMode}
                                />
                                {errors.kmsEndYear && <span className="text-danger fontSize">{errors.kmsEndYear}</span>}
                            </MDBCol>
                            <MDBCol md='6'>
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
                            <MDBCol md='4 mt-2'>
                                <label htmlFor="godown" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">Godown</label>
                                <select
                                    id="godown"
                                    name="godown"
                                    value={formValues.godown}
                                    onChange={handleChange}
                                    className={`form-control ${errors.godown ? 'input-invalid' : ''}`}
                                    disabled={!editMode}
                                >
                                    <option value="">Select Godown</option>
                                    <option value="RailHead">RailHead</option>
                                    <option value="MRM">MRM</option>
                                    <option value="PANDIYARAJAPURAM">PANDIYARAJAPURAM</option>
                                    <option value="THIRUVATHAVUR">THIRUVATHAVUR</option>
                                </select>
                                {errors.godown && <span className="text-danger fontSize">{errors.godown}</span>}
                            </MDBCol>
                            {/* Truck Memo */}
                            <MDBCol md='4 mt-5 pt-1'>
                                <MDBInput
                                    value={formValues.truckMemoNo}
                                    name='truckMemoNo'
                                    onChange={handleChange}
                                    id='truckMemoNo'
                                    label='Truck Memo'
                                    className={`form-control ${errors.truckMemoNo ? 'input-invalid' : ''}`}
                                    disabled={!editMode}
                                />
                                {errors.truckMemoNo && <span className="text-danger fontSize">{errors.truckMemoNo}</span>}
                            </MDBCol>
                            {/* Variety */}
                            <MDBCol md='4 mt-2'>
                                <label htmlFor="variety" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">Variety</label>
                                <select
                                    id="variety"
                                    name="variety"
                                    value={formValues.variety}
                                    onChange={handleChange}
                                    className={`form-control ${errors.variety ? 'input-invalid' : ''}`}
                                    disabled={!editMode}
                                >
                                    <option value="">Select Variety</option>
                                    <option value="ADT FRK">ADT FRK</option>
                                    <option value="CR FRK">CR FRK</option>
                                </select>
                                {errors.variety && <span className="text-danger fontSize">{errors.variety}</span>}
                            </MDBCol>
                            {/* Qty Nett */}
                            <MDBCol md='12'>
                                <label htmlFor="qtynett" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">Qty Nett</label>
                                <MDBRow className='g-2 w-100'>
                                    <MDBCol md='3'>
                                        <MDBInput
                                            type="number"
                                            id="noOfBags"
                                            name="noOfBags"
                                            value={formValues.noOfBags}
                                            onChange={handleChange}
                                            className={`form-control ${errors.noOfBags ? 'is-invalid' : ''}`}
                                            label="Bags"
                                            disabled={!editMode}
                                        />
                                        {errors.noOfBags && <span className="text-danger fontSize">{errors.noOfBags}</span>}
                                    </MDBCol>
                                    <MDBCol md='3'>
                                        <MDBInput
                                            type="number"
                                            id="weightOfFRK"
                                            name="weightOfFRK"
                                            value={formValues.weightOfFRK}
                                            onChange={handleChange}
                                            className={`form-control ${errors.weightOfFRK ? 'is-invalid' : ''}`}
                                            label="FRK"
                                            disabled={!editMode}
                                        />
                                        {errors.weightOfFRK && <span className="text-danger fontSize">{errors.weightOfFRK}</span>}
                                    </MDBCol>
                                    <MDBCol md='3'>
                                        <MDBInput
                                            type="number"
                                            id="weightOfRice"
                                            name="weightOfRice"
                                            value={formValues.weightOfRice}
                                            onChange={handleChange}
                                            className={`form-control ${errors.weightOfRice ? 'is-invalid' : ''}`}
                                            label="Rice"
                                            disabled={!editMode}
                                        />
                                        {errors.weightOfRice && <span className="text-danger fontSize">{errors.weightOfRice}</span>}
                                    </MDBCol>
                                    <MDBCol md='3'>
                                        <MDBInput
                                            type="number"
                                            id="weightOfRiceWithFRK"
                                            name="weightOfRiceWithFRK"
                                            value={formValues.weightOfRiceWithFRK}
                                            onChange={handleChange}
                                            className={`form-control ${errors.weightOfRiceWithFRK ? 'is-invalid' : ''}`}
                                            label="Weight"
                                            disabled={!editMode}
                                        />
                                        {errors.weightOfRiceWithFRK && <span className="text-danger fontSize">{errors.weightOfRiceWithFRK}</span>}
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                            {/* FRK and OutTurn */}
                            <MDBCol md='12'>
                                <MDBRow className='g-2 w-100'>
                                    <MDBCol md='4'>
                                        <MDBInput
                                            type="number"
                                            value='1%'
                                            name='frk'
                                            onChange={handleChange}
                                            id='frk'
                                            label='FRK'
                                            placeholder='1%'
                                            disabled
                                            className={`form-control ${errors.frk ? 'input-invalid' : ''}`}
                                        />
                                        {errors.frk && <span className="text-danger fontSize">{errors.frk}</span>}
                                    </MDBCol>
                                    <MDBCol md='4'>
                                        <MDBInput
                                            type="number"
                                            value='68%'
                                            name='outturn'
                                            onChange={handleChange}
                                            id='outturn'
                                            label='outturn'
                                            placeholder='68%'
                                            disabled
                                            className={`form-control ${errors.outturn ? 'input-invalid' : ''}`}
                                        />
                                        {errors.outturn && <span className="text-danger fontSize">{errors.outturn}</span>}
                                    </MDBCol>
                                    <MDBCol md='4'>
                                        <MDBInput
                                            value={formValues.lorryNo}
                                            name='lorryNo'
                                            onChange={handleChange}
                                            id='lorryNo'
                                            label='Lorry No'
                                            className={`form-control ${errors.lorryNo ? 'input-invalid' : ''}`}
                                            disabled={!editMode}
                                        />
                                        {errors.lorryNo && <span className="text-danger fontSize">{errors.lorryNo}</span>}
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                            {/* Lorry No and AD Number */}
                            <MDBCol md="12">
                                <label htmlFor="addetails" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">Ad Date & Ad Details</label>
                                <MDBRow className='w-100'>
                                    <MDBCol md='5'>
                                        <MDBInput
                                            value={formValues.adNo}
                                            name='adNo'
                                            onChange={handleChange}
                                            id='adNo'
                                            label='AD Number'
                                            className={`form-control ${errors.adNo ? 'input-invalid' : ''}`}
                                            disabled={!editMode}
                                        />
                                        {errors.adNo && <span className="text-danger fontSize">{errors.adNo}</span>}
                                    </MDBCol>

                                    {/* Ad Date */}
                                    <MDBCol md='5'>
                                        {/* <label htmlFor="addate" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">Ad Date</label> */}
                                        <DatePicker
                                            selected={formValues.adDate}
                                            onChange={handleADDateChange}
                                            dateFormat="MM/dd/yyyy"
                                            className={`form-control ${errors.adDate ? 'input-invalid' : ''}`}
                                            disabled={!editMode}
                                        />
                                        {errors.adDate && <span className="text-danger fontSize">{errors.adDate}</span>}
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                            {/* Gunny Condition */}
                            <MDBCol md='12'>
                                <label htmlFor="gunnyCondition" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">Gunny Condition</label>
                                <MDBRow className='g-2 w-100'>
                                    <MDBCol md='4'>
                                        <MDBInput
                                            type="number"
                                            id="nb"
                                            name="noOfONBBags"
                                            value={formValues.noOfONBBags}
                                            onChange={handleChange}
                                            className={`form-control ${errors.noOfONBBags ? 'is-invalid' : ''}`}
                                            label="ONB"
                                            disabled={!editMode}
                                        />
                                        {errors.noOfONBBags && <span className="text-danger fontSize">{errors.noOfONBBags}</span>}
                                    </MDBCol>
                                    <MDBCol md='4'>
                                        <MDBInput
                                            type="number"
                                            id="ss"
                                            name="noOfSSBags"
                                            value={formValues.noOfSSBags}
                                            onChange={handleChange}
                                            className={`form-control ${errors.noOfSSBags ? 'is-invalid' : ''}`}
                                            label="SS"
                                            disabled={!editMode}
                                        />
                                        {errors.noOfSSBags && <span className="text-danger fontSize">{errors.noOfSSBags}</span>}
                                    </MDBCol>
                                    <MDBCol md='4'>
                                        <MDBInput
                                            type="number"
                                            id="swp"
                                            name="noOfSWPBags"
                                            value={formValues.noOfSWPBags}
                                            onChange={handleChange}
                                            className={`form-control ${errors.noOfSWPBags ? 'is-invalid' : ''}`}
                                            label="SWP"
                                            disabled={!editMode}
                                        />
                                        {errors.noOfSWPBags && <span className="text-danger fontSize">{errors.noOfSWPBags}</span>}
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                            {/* QC Numbers and Conditions */}
                            <MDBCol md='12'>
                                <label htmlFor="qc" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">QC</label>
                                <MDBRow className='g-2 w-100'>
                                    <MDBCol md='3'>
                                        <MDBInput
                                            value={formValues.qcNo}
                                            name='qcNo'
                                            onChange={handleChange}
                                            id='qcNo'
                                            label='QC Number'
                                            className={`form-control ${errors.qcNo ? 'input-invalid' : ''}`}
                                            disabled={!editMode}
                                        />
                                        {errors.qcNo && <span className="text-danger fontSize">{errors.qcNo}</span>}
                                    </MDBCol>
                                    <MDBCol md='3'>
                                        <MDBInput
                                            value={formValues.qcMoitureContent}
                                            name='qcMoitureContent'
                                            onChange={handleChange}
                                            id='qcMoitureContent'
                                            label='Moisture Content'
                                            className={`form-control ${errors.qcMoitureContent ? 'input-invalid' : ''}`}
                                            disabled={!editMode}
                                        />
                                        {errors.qcMoitureContent && <span className="text-danger fontSize">{errors.qcMoitureContent}</span>}
                                    </MDBCol>
                                    <MDBCol md='3'>
                                        <MDBInput
                                            value={formValues.qcDeHUsted}
                                            name='qcDeHUsted'
                                            onChange={handleChange}
                                            id='qcDeHUsted'
                                            label='De-Husked'
                                            className={`form-control ${errors.qcDeHUsted ? 'input-invalid' : ''}`}
                                            disabled={!editMode}
                                        />
                                        {errors.qcDeHUsted && <span className="text-danger fontSize">{errors.qcDeHUsted}</span>}
                                    </MDBCol>
                                    <MDBCol md='3'>
                                        <MDBInput
                                            value={formValues.qcfrk}
                                            name='qcfrk'
                                            onChange={handleChange}
                                            id='qcfrk'
                                            label='QC FRK'
                                            className={`form-control ${errors.qcfrk ? 'input-invalid' : ''}`}
                                            disabled={!editMode}
                                        />
                                        {errors.qcfrk && <span className="text-danger fontSize">{errors.qcfrk}</span>}
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
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

export default RiceEditForm;
