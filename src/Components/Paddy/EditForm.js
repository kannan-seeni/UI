import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardImage, MDBInput } from 'mdb-react-ui-kit';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import headerImg from '../../assets/paddyfield.jpg';

const EditForm = () => {
    const [formValues, setFormValues] = useState({
        date: new Date(),
        kmsStartYear: null,
        kmsEndYear: null,
        region: '',
        godwon: '',
        issueMemoNo: '',
        variety: '',
        moitureContent: '',
        noOfBags: '',
        weight: '',
        lorryNo: '',
        noOfNBBags: '',
        noOfONBBags: '',
        noOfSSBags: '',
        noOfSWPBags: ''
    });
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:3001/paddyData/${id}`)
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

    const handleDateChange = (date) => {
        setFormValues(prevValues => ({
            ...prevValues,
            date: date
        }));
    };

    // const handleStartDateChange = (date) => {
    //     setFormValues(prevValues => ({
    //         ...prevValues,
    //         kmsStartYear: date
    //     }));
    // };

    // const handleEndDateChange = (date) => {
    //     setFormValues(prevValues => ({
    //         ...prevValues,
    //         kmsEndYear: date
    //     }));
    // };
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
        fetch(`http://localhost:3001/paddyData/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                navigate('/paddyTable'); // Redirect back to the main page after saving
            })
            .catch(error => console.error('Error updating data:', error));
    };

    const handleCancel = () => {
        navigate('/paddyTable');
    };

    const toggleEditMode = () => {
        setEditMode(prevMode => !prevMode);
    };

    return (
        <MDBContainer fluid className='p-0 bgImgPaddy'>
            <MDBRow className='d-flex h-100 p-4'>
                {/* <MDBCol md='4' className="d-none d-md-block text-center">
                    <MDBCardImage src={headerImg} alt="Sample photo" className="rounded-start w-100 h-100" fluid />
                </MDBCol> */}
                <MDBCol md='12'>
                    <form onSubmit={handleSubmitPaddy} className='bgColor'>
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
                                    disabled={!editMode}
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
                                            disabled={!editMode}
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
                                            disabled={!editMode}
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
                                    disabled={!editMode}
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
                                    disabled={!editMode}
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
                                    disabled={!editMode}
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
                                    disabled={!editMode}
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
                                    disabled={!editMode}
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
                                            disabled={!editMode}
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
                                            disabled={!editMode}
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
                                    disabled={!editMode}
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
                                            disabled={!editMode}
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
                                            disabled={!editMode}
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
                                            disabled={!editMode}
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
                                            disabled={!editMode}
                                        />
                                        {errors.noOfSWPBags && <span className="text-danger fontSize">{errors.noOfSWPBags}</span>}
                                    </MDBCol>
                                </div>
                            </MDBCol>
                        </MDBRow>
                        {/* <button type="submit" className="loginBtn btn btn-success mb-3 mt-3" onClick={handleSubmitPaddy}>Add Paddy</button> */}
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

export default EditForm;