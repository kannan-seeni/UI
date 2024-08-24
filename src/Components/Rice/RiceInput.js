import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBInput, MDBCardImage } from 'mdb-react-ui-kit';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import headerImg from '../../assets/rice-bags.jpg';

const Rice = ({ onSubmit }) => {
    const [formValues, setFormValues] = useState({
        godwon: "",
        date: new Date(),
        kms: "",
        region: "",
        truckMemoNo: "",
        variety: "",
        frk: "",
        qutturn: "",
        noOfBags: "",
        weightOfRice: "",
        weightOfRiceWithFRK: "",
        weightOfFRK: "",
        adNo: "",
        adDate: new Date(),
        qcMoitureContent: "",
        qcNo: "",
        qcDeHUsted: "",
        qcfrk: "",
        lorryNo: "",
        noOfONBBags: "",
        noOfSSBags: "",
        noOfSWPBags: "",
    });

    const [errors, setErrors] = useState({});
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     const isNumericField = ['noOfBags', 'weight', 'noOfNBBags', 'noOfONBBags', 'noOfSSBags', 'noOfSWPBags'].includes(name);
    //     if (isNumericField && (value === '' || !/^\d*$/.test(value))) {
    //         return;
    //     }
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
        setFormValues(prevState => ({
            ...prevState,
            date
        }));
    };
    const handleADDateChange = (adDate) => {
        setFormValues(prevState => ({
            ...prevState,
            adDate
        }));
    };
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!formValues.date) newErrors.date = "Date is required";
        if (!formValues.kmsStartYear) newErrors.kmsStartYear = "Start Year is required";
        if (!formValues.kmsEndYear) newErrors.kmsEndYear = "End Year is required";
        if (!formValues.godwon) newErrors.godwon = "Godwon is required";
        if (!formValues.region) newErrors.region = "Region is required";
        if (!formValues.variety) newErrors.variety = "Variety is required";
        if (!formValues.truckMemoNo) newErrors.truckMemoNo = "Memo is required";
        if (formValues.noOfBags === '' || isNaN(formValues.noOfBags)) newErrors.noOfBags = "Number of Bags must be a valid number";
        if (formValues.weightOfRiceWithFRK === '' || isNaN(formValues.weightOfRiceWithFRK)) newErrors.weightOfRiceWithFRK = "Weight must be a valid number";
        if (!formValues.lorryNo) newErrors.lorryNo = "Lorry number is required";
        if (formValues.noOfONBBags === '' || isNaN(formValues.noOfONBBags)) newErrors.noOfONBBags = 'noOfONBBags must be a valid number';
        if (formValues.noOfSSBags === '' || isNaN(formValues.noOfSSBags)) newErrors.noOfSSBags = 'noOfSSBags must be a valid number';
        if (formValues.noOfSWPBags === '' || isNaN(formValues.noOfSWPBags)) newErrors.noOfSWPBags = 'noOfSWPBags must be a valid number';
        if (formValues.weightOfRice === '' || isNaN(formValues.weightOfRice)) newErrors.weightOfRice = 'Rice is required';
        if (formValues.weightOfFRK === '' || isNaN(formValues.weightOfFRK)) newErrors.weightOfFRK = "FRK is required";
        if (!formValues.adNo) newErrors.adNo = "End Year is required";
        if (!formValues.adDate) newErrors.adDate = "AD Date is required";
        if (formValues.qcMoitureContent === '' || isNaN(formValues.qcMoitureContent)) newErrors.qcMoitureContent = "Moiture Content is required";
        if (formValues.qcNo === '' || isNaN(formValues.qcNo)) newErrors.qcNo = "qc no is required";
        if (formValues.qcDeHUsted === '' || isNaN(formValues.qcDeHUsted)) newErrors.qcDeHUsted = "qc no is required";
        if (formValues.qcfrk === '' || isNaN(formValues.qcfrk)) newErrors.qcfrk = "qcfrk is required";


        const validateWeight = () => {
            const { noOfBags, noOfONBBags, noOfSSBags, noOfSWPBags } = formValues;
            const totalBags = parseFloat(noOfONBBags || 0) + parseFloat(noOfSSBags || 0) + parseFloat(noOfSWPBags || 0);
            return parseFloat(noOfBags) === totalBags;
        };
        if (!validateWeight()) newErrors.noOfBags = 'Bags must be equal to the sum of No of NB Bags, No of ONB Bags, No of SS Bags, and No of SWP Bags';
        return newErrors;
    };
    const handleSubmitRice = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const response = await fetch('http://localhost:3001/riceData', {
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
            onSubmit(formValues);
            navigate("/riceTable");
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    const resetForm = () => {
        setFormValues({
            godwon: "",
            date: new Date(),
            kms: "",
            region: "",
            frk: "",
            outturn: "",
            truckMemoNo: "",
            variety: "",
            noOfBags: "",
            weightOfRice: "",
            weightOfRiceWithFRK: "",
            weightOfFRK: "",
            adNo: "",
            adDate: new Date(),
            qcMoitureContent: "",
            qcNo: "",
            qcDeHUsted: "",
            qcfrk: "",
            lorryNo: "",
            noOfONBBags: "",
            noOfSSBags: "",
            noOfSWPBags: "",
        });
        setErrors({});
        setStartDate(null);
        setEndDate(null);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
        setFormValues(prevState => {
            const startYear = date ? date.getFullYear() : '';
            const endYear = prevState.kmsEndYear || '';
            const kms = endYear ? `${startYear}-${endYear.toString().slice(-2)}` : '';
            return {
                ...prevState,
                kmsStartYear: startYear.toString(),
                kms
            };
        });
        if (endDate && date > endDate) {
            setEndDate(null);
            setFormValues(prevState => ({
                ...prevState,
                kmsEndYear: '',
                kms: ''
            }));
        }
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        setFormValues(prevState => {
            const endYear = date ? date.getFullYear() : '';
            const startYear = prevState.kmsStartYear || '';
            const kms = startYear ? `${startYear}-${endYear.toString().slice(-2)}` : '';
            return {
                ...prevState,
                kmsEndYear: endYear.toString(),
                kms
            };
        });
        if (startDate && date < startDate) {
            setStartDate(null);
            setFormValues(prevState => ({
                ...prevState,
                kmsStartYear: '',
                kms: ''
            }));
        }
    };

    return (
        <MDBContainer fluid className='p-0 bgImg mt-5'>
            <MDBRow className='d-flex h-100 p-4 align-items-center'>
                <MDBCol md='12'>
                    <form onSubmit={handleSubmitRice} className='bgColor p-4 rounded shadow'>
                        <MDBRow className='g-4'>
                            {/* Date */}
                            <MDBCol md='4'>
                                <label htmlFor="date" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">Date</label>
                                <DatePicker
                                    selected={formValues.date}
                                    onChange={handleDateChange}
                                    dateFormat="MM/dd/yyyy"
                                    className={`form-control ${errors.date ? 'input-invalid' : ''}`}
                                />
                                {errors.date && <span className="text-danger fontSize">{errors.date}</span>}
                            </MDBCol>

                            {/* KMS Start and End */}
                            <MDBCol md='4'>
                                <label htmlFor="kms" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">KMS</label>
                                <MDBRow className="w-100">
                                    <MDBCol md='6'>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={handleStartDateChange}
                                            placeholderText="Start Year"
                                            showYearPicker
                                            dateFormat="yyyy"
                                            className={`form-control ${errors.kmsStartYear ? 'input-invalid' : ''}`}
                                            maxDate={new Date()}
                                        />
                                        {errors.kmsStartYear && <span className="text-danger fontSize">{errors.kmsStartYear}</span>}
                                    </MDBCol>
                                    <MDBCol md='6'>
                                        <DatePicker
                                            selected={endDate}
                                            onChange={handleEndDateChange}
                                            placeholderText="End Year"
                                            showYearPicker
                                            dateFormat="yyyy"
                                            className={`form-control ${errors.kmsEndYear ? 'input-invalid' : ''}`}
                                            maxDate={new Date()}
                                        />
                                        {errors.kmsEndYear && <span className="text-danger fontSize">{errors.kmsEndYear}</span>}
                                    </MDBCol>
                                </MDBRow>
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

                            {/* Godwon */}
                            <MDBCol md='4 mt-0'>
                                <label htmlFor="godwon" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">Godwon</label>
                                <select
                                    id="godwon"
                                    name="godwon"
                                    value={formValues.godwon}
                                    onChange={handleChange}
                                    className={`form-control ${errors.godwon ? 'input-invalid' : ''}`}
                                >
                                    <option value="">Select Godwon</option>
                                    <option value="MELLUR">MELLUR</option>
                                    <option value="USILAMPATTI">USILAMPATTI</option>
                                    <option value="THIRUMANGALAM">THIRUMANGALAM</option>
                                    <option value="VADIPATTI">VADIPATTI</option>
                                    <option value="V.K.Puram II">V.K.Puram II</option>
                                </select>
                                {errors.godwon && <span className="text-danger fontSize">{errors.godwon}</span>}
                            </MDBCol>

                            {/* Truck Memo */}
                            <MDBCol md='4 mt-4 pt-3'>
                                <MDBInput
                                    value={formValues.truckMemoNo}
                                    name='truckMemoNo'
                                    onChange={handleChange}
                                    id='truckMemoNo'
                                    label='Truck Memo'
                                    className={`form-control ${errors.truckMemoNo ? 'input-invalid' : ''}`}
                                />
                                {errors.truckMemoNo && <span className="text-danger fontSize">{errors.truckMemoNo}</span>}
                            </MDBCol>

                            {/* Variety */}
                            <MDBCol md='4 mt-0'>
                                <label htmlFor="variety" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">Variety</label>
                                <select
                                    id="variety"
                                    name="variety"
                                    value={formValues.variety}
                                    onChange={handleChange}
                                    className={`form-control ${errors.variety ? 'input-invalid' : ''}`}
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
                                        />
                                        {errors.weightOfRiceWithFRK && <span className="text-danger fontSize">{errors.weightOfRiceWithFRK}</span>}
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                            {/* FRK and OutTurn */}
                            <MDBCol md='12'>
                                <MDBRow className='g-2'>
                                    <MDBCol md='4'>
                                        <MDBInput
                                            value='1%'
                                            name='frk'
                                            onChange={handleChange}
                                            id='frk'
                                            label='FRK'
                                            disabled
                                            className={`form-control ${errors.frk ? 'input-invalid' : ''}`}
                                        />
                                        {errors.frk && <span className="text-danger fontSize">{errors.frk}</span>}
                                    </MDBCol>
                                    <MDBCol md='4'>
                                        <MDBInput
                                            value='68%'
                                            name='outturn'
                                            onChange={handleChange}
                                            id='outturn'
                                            label='OutTurn'
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
                                        />
                                        {errors.qcfrk && <span className="text-danger fontSize">{errors.qcfrk}</span>}
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                        </MDBRow>
                        <button type="submit" className="loginBtn btn btn-success mb-3 mt-3" onClick={handleSubmitRice}>Add Rice</button>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>

    );
}

export default Rice;
