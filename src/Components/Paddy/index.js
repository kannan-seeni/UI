import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBInput, MDBCardImage } from 'mdb-react-ui-kit';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import headerImg from '../../assets/paddyfield.jpg';
import './Paddy.css';

const Paddy = ({ onSubmit }) => {
    const [formValues, setFormValues] = useState({
        date: new Date(),
        kmsStartYear: '',
        kmsEndYear: '',
        kms: '',
        issueMemoNo: '',
        godwon: '',
        region: '',
        variety: '',
        moitureContent: '',
        lorryNo: '',
        noOfBags: '',
        weight: '',
        noOfNBBags: '',
        noOfONBBags: '',
        noOfSSBags: '',
        noOfSWPBags: '',
        // yearRange: '',
        // range: '' 
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

    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!formValues.date) newErrors.date = "Date is required";
        if (!formValues.kmsStartYear) newErrors.kmsStartYear = "Start Year is required";
        if (!formValues.kmsEndYear) newErrors.kmsEndYear = "End Year is required";
        if (!formValues.godwon) newErrors.godwon = "Godwon is required";
        if (!formValues.region) newErrors.region = "Region is required";
        if (!formValues.variety) newErrors.variety = "Variety is required";
        if (!formValues.moitureContent) newErrors.moitureContent = "MC is required";
        if (!formValues.issueMemoNo) newErrors.issueMemoNo = "Memo is required";
        if (formValues.noOfBags === '' || isNaN(formValues.noOfBags)) newErrors.noOfBags = "Number of Bags must be a valid number";
        if (formValues.weight === '' || isNaN(formValues.weight)) newErrors.weight = "Weight must be a valid number";
        if (!formValues.lorryNo) newErrors.lorryNo = "Lorry number is required";
        if (formValues.noOfNBBags === '' || isNaN(formValues.noOfNBBags)) newErrors.noOfNBBags = 'NBBags must be a valid number';
        if (formValues.noOfONBBags === '' || isNaN(formValues.noOfONBBags)) newErrors.noOfONBBags = 'ONBBags must be a valid number';
        if (formValues.noOfSSBags === '' || isNaN(formValues.noOfSSBags)) newErrors.noOfSSBags = 'SSBags must be a valid number';
        if (formValues.noOfSWPBags === '' || isNaN(formValues.noOfSWPBags)) newErrors.noOfSWPBags = 'SWPBags must be a valid number';
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
            const response = await fetch('http://localhost:3001/paddyData', {
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
            navigate("/paddyTable");
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    const resetForm = () => {
        setFormValues({
            date: new Date(),
            kmsStartYear: '',
            kmsEndYear: '',
            kms: '',
            issueMemoNo: '',
            region: '',
            godwon: '',
            variety: '',
            moitureContent: '',
            lorryNo: '',
            noOfBags: '',
            weight: '',
            noOfNBBags: '',
            noOfONBBags: '',
            noOfSSBags: '',
            noOfSWPBags: '',
            // yearRange: '',
            // range: '' 
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
    // const [isSelectingEndDate, setIsSelectingEndDate] = useState(false);
    // const handleDateChangeYear = (date) => {
    //     if (!startDate) {
    //         // Set start date if not already set
    //         setStartDate(date);
    //         setIsSelectingEndDate(true);
    //         setErrors({ range: '' });
    //         setFormValues(prevState => ({
    //             ...prevState,
    //             range: ''
    //         }));
    //     } else if (startDate && !endDate) {
    //         // Set end date if start date is already set
    //         if (date < startDate) {
    //             setErrors({ range: 'End date cannot be before start date' });
    //             return;
    //         }
    //         setEndDate(date);
    //         setIsSelectingEndDate(false);
    //         setFormValues(prevState => ({
    //             ...prevState,
    //             range: `${startDate.getFullYear()}-${date.getFullYear()}`
    //         }));
    //     }
    // }
    return (
        <MDBContainer fluid className='background p-0'>
            <MDBRow className='d-flex h-100 p-4'>
                <MDBCol md='4' className="d-none d-md-block text-center">
                    <MDBCardImage src={headerImg} alt="Sample photo" className="rounded-start w-100 h-100" fluid />
                </MDBCol>
                <MDBCol md='8'>
                    <MDBCard className='cardBGImg p-4'>
                        <form onSubmit={handleSubmitPaddy}>
                            <MDBRow className='g-4'>
                                {/* <MDBCol md='4'>
                                    <label htmlFor="date-range" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">Date Range</label>
                                    <DatePicker
                                        selected={isSelectingEndDate ? endDate : startDate}
                                        onChange={handleDateChangeYear}
                                        placeholderText={isSelectingEndDate ? "End Date" : "Start Date"}
                                        selectsStart={!isSelectingEndDate}
                                        selectsEnd={isSelectingEndDate}
                                        startDate={startDate}
                                        endDate={endDate}
                                        dateFormat="yyyy"
                                        showYearPicker
                                        className={`form-control ${errors.range ? 'input-invalid' : ''}`}
                                        maxDate={new Date()}
                                    />
                                    {errors.range && <span className="text-danger fontSize">{errors.range}</span>}
                                </MDBCol> */}
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
                                <MDBCol md='6'>
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
                                        <option value="RailHead">RailHead</option>
                                        <option value="MRM">MRM</option>
                                        <option value="PANDIYARAJAPURAM">PANDIYARAJAPURAM</option>
                                        <option value="THIRUVATHAVUR">THIRUVATHAVUR</option>
                                    </select>
                                    {/* <MDBInput
                                        type="text"
                                        id="godwon"
                                        name="godwon"
                                        value={formValues.godwon}
                                        onChange={handleChange}
                                        className={`form-control ${errors.godwon ? 'is-invalid' : ''}`}
                                        label="Godwon"
                                    /> */}
                                    {errors.godwon && <span className="text-danger fontSize">{errors.godwon}</span>}
                                </MDBCol>
                                <MDBCol md='6 mt-5 pt-1'>
                                    <MDBInput
                                        value={formValues.issueMemoNo}
                                        name='issueMemoNo'
                                        onChange={handleChange}
                                        id='issueMemoNo'
                                        label='Issue Memo No'
                                        className={`form-control ${errors.issueMemoNo ? 'input-invalid' : ''}`}
                                    />
                                    {errors.issueMemoNo && <span className="text-danger fontSize">{errors.issueMemoNo}</span>}
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
                                        <option value="ADT">ADT</option>
                                        <option value="CR">CR</option>
                                    </select>
                                    {errors.variety && <span className="text-danger fontSize">{errors.variety}</span>}
                                </MDBCol>
                                <MDBCol md='6 mt-5 pt-1'>
                                    <MDBInput
                                        value={formValues.moitureContent}
                                        name='moitureContent'
                                        onChange={handleChange}
                                        id='moitureContent'
                                        label='% MC'
                                        className={`form-control ${errors.moitureContent ? 'input-invalid' : ''}`}
                                    />
                                    {errors.moitureContent && <span className="text-danger fontSize">{errors.moitureContent}</span>}
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
                                                id="weight"
                                                name="weight"
                                                value={formValues.weight}
                                                onChange={handleChange}
                                                className={`form-control ${errors.weight ? 'is-invalid' : ''}`}
                                                label="Weight"
                                            />
                                            {errors.weight && <span className="text-danger fontSize">{errors.weight}</span>}
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
                                <MDBCol md='12'>
                                    <label htmlFor="gunnyCondition" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">Gunny Condition</label>
                                    <div className="row w-100">
                                        <MDBCol md='3'>
                                            <MDBInput
                                                type="number"
                                                id="nb"
                                                name="noOfNBBags"
                                                value={formValues.noOfNBBags}
                                                onChange={handleChange}
                                                className={`form-control ${errors.noOfNBBags ? 'is-invalid' : ''}`}
                                                label="NB"
                                            />
                                            {errors.noOfNBBags && <span className="text-danger fontSize">{errors.noOfNBBags}</span>}
                                        </MDBCol>
                                        <MDBCol md='3'>
                                            <MDBInput
                                                type="number"
                                                id="onb"
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
                            <button type="submit" className="loginBtn btn btn-success mb-3 mt-3">Add Data</button>
                        </form>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Paddy;
