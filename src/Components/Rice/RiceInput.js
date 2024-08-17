import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBInput, MDBCardImage } from 'mdb-react-ui-kit';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import headerImg from '../../assets/riceimg.jpg';

const Rice = ({ onSubmit }) => {
    const [formValues, setFormValues] = useState({
        godwon: "",
        date: new Date(),
        kms: "",
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

    const [errors, setErrors] = useState({});
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const isNumericField = ['noOfBags', 'weight', 'noOfNBBags', 'noOfONBBags', 'noOfSSBags', 'noOfSWPBags'].includes(name);
        if (isNumericField && (value === '' || !/^\d*$/.test(value))) {
            return;
        }
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }));
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
        if (!formValues.variety) newErrors.variety = "Variety is required";
        if (!formValues.truckMemoNo) newErrors.truckMemoNo = "Memo is required";
        if (formValues.noOfBags === '' || isNaN(formValues.noOfBags)) newErrors.noOfBags = "Number of Bags must be a valid number";
        if (formValues.weightOfRiceWithFRK === '' || isNaN(formValues.weightOfRiceWithFRK)) newErrors.weight = "Weight must be a valid number";
        if (!formValues.lorryNo) newErrors.lorryNo = "Lorry number is required";
        if (formValues.noOfONBBags === '' || isNaN(formValues.noOfONBBags)) newErrors.noOfONBBags = 'noOfONBBags must be a valid number';
        if (formValues.noOfSSBags === '' || isNaN(formValues.noOfSSBags)) newErrors.noOfSSBags = 'noOfSSBags must be a valid number';
        if (formValues.noOfSWPBags === '' || isNaN(formValues.noOfSWPBags)) newErrors.noOfSWPBags = 'noOfSWPBags must be a valid number';
        if (formValues.weightOfRice === '' || isNaN(formValues.weightOfRice)) newErrors.weightOfRice = 'weight of rice is required';
        if (formValues.weightOfFRK === '' || isNaN(formValues.weightOfFRK)) newErrors.weightOfFRK = "FRK is required";
        if (!formValues.adNo) newErrors.adNo = "End Year is required";
        if (formValues.adDate) newErrors.date = "Date is required";
        if (formValues.qcMoitureContent === '' || isNaN(formValues.qcMoitureContent)) newErrors.qcMoitureContent = "Moiture Content is required";
        if (formValues.qcNo === '' || isNaN(formValues.qcNo)) newErrors.qcNo = "qc no is required";
        if (formValues.qcDeHUsted === '' || isNaN(formValues.qcDeHUsted)) newErrors.qcDeHUsted = "qc no is required";
        if (formValues.qcfrk === '' || isNaN(formValues.qcfrk)) newErrors.qcfrk = "qcfrk is required";


        // const validateWeight = () => {
        //     const { noOfBags, noOfNBBags, noOfONBBags, noOfSSBags, noOfSWPBags } = formValues;
        //     const totalBags = parseFloat(noOfNBBags || 0) + parseFloat(noOfONBBags || 0) + parseFloat(noOfSSBags || 0) + parseFloat(noOfSWPBags || 0);
        //     return parseFloat(noOfBags) === totalBags;
        // };
        // if (!validateWeight()) newErrors.noOfBags = 'Bags must be equal to the sum of No of NB Bags, No of ONB Bags, No of SS Bags, and No of SWP Bags';
        return newErrors;
    };
    const handleSubmitPaddy = async (e) => {
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
        <MDBContainer fluid className='p-0'>
            <MDBRow className='d-flex h-100 p-4'>
                <MDBCol md='4' className="d-none d-md-block text-center">
                    <MDBCardImage src={headerImg} alt="Sample photo" className="rounded-start w-100 h-100" fluid />
                </MDBCol>
                <MDBCol md='8'>
                    <MDBCard className='cardBGImg p-4'>
                        <form onSubmit={handleSubmitPaddy}>
                            <MDBRow className='g-4'>
                                <MDBCol md='2'>
                                    <label htmlFor="date" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">Date</label>
                                    <DatePicker
                                        selected={formValues.date}
                                        onChange={handleDateChange}
                                        dateFormat="MM/dd/yyyy"
                                        className={`form-control ${errors.date ? 'input-invalid' : ''}`}
                                    />
                                    {errors.date && <span className="text-danger fontSize">{errors.date}</span>}
                                </MDBCol>
                                <MDBCol md='4'>
                                    <label htmlFor="kms" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">KMS</label>
                                    <div className="row w-100">
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
                                    </div>
                                </MDBCol>
                                
                                <MDBCol md='6 mt-2'>
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
                                <MDBCol md='6 mt-5 pt-1'>
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

                                <MDBCol md='6 mt-2'>
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
                                <MDBCol md='6 mt-5 pt-1'>
                                    <MDBInput
                                        value={formValues.qcMoitureContent}
                                        name='qcMoitureContent'
                                        onChange={handleChange}
                                        id='qcMoitureContent'
                                        label='QC Moisture'
                                        className={`form-control ${errors.qcMoitureContent ? 'input-invalid' : ''}`}
                                    />
                                    {errors.qcMoitureContent && <span className="text-danger fontSize">{errors.qcMoitureContent}</span>}
                                </MDBCol>
                                <MDBCol md='6'>
                                    <label htmlFor="qtynett" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">Qty Nett</label>
                                    <div className="row w-100">
                                        <MDBCol md='6'>
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
                                        <MDBCol md='6'>
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
                                    </div>
                                </MDBCol>
                                <MDBCol md='6'>
                                    <label htmlFor="qtynett" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">Qty Nett</label>
                                    <div className="row w-100">
                                        <MDBCol md='6'>
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
                                        <MDBCol md='6'>
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
                                    </div>
                                </MDBCol>
                                <MDBCol md='6 mt-5 pt-3'>
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
                                <MDBCol md='6 mt-5 pt-3'>
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
                                <MDBCol md='2'>
                                    <label htmlFor="addate" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">Date</label>
                                    <DatePicker
                                        selected={formValues.adDate}
                                        onChange={handleADDateChange}
                                        dateFormat="MM/dd/yyyy"
                                        className={`form-control ${errors.adDate ? 'input-invalid' : ''}`}
                                    />
                                    {errors.adDate && <span className="text-danger fontSize">{errors.adDate}</span>}
                                </MDBCol>
                                <MDBCol md='6 mt-5 pt-3'>
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
                                <MDBCol md='6 mt-5 pt-3'>
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
                                <MDBCol md='6 mt-5 pt-3'>
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
                                <MDBCol md='12'>
                                    <label htmlFor="gunnyCondition" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">Gunny Condition</label>
                                    <div className="row w-100">
                                        <MDBCol md='3'>
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
                                        <MDBCol md='3'>
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
                                        <MDBCol md='3'>
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
                                    </div>
                                </MDBCol>
                            </MDBRow>
                            <button type="submit" className="loginBtn btn btn-success mb-3 mt-3" onClick={handleSubmitPaddy}>Add Data</button>
                        </form>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Rice;
