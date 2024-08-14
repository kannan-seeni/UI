import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard,/*MDBCardImage*/ } from 'mdb-react-ui-kit';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
// import headerImg from '../../assets/rice-logo.jpg';
const Paddy = ({ onSubmit }) => {
    const [formValues, setFormValues] = useState({
        date: null,
        kmsStartYear: '',
        kmsEndYear: '',
        kms:'',
        issueMemoNo: '',
        godwon: '',
        variety: '',
        moitureContent: '',
        lorryNo: '',
        noOfBags: '',
        weight: '',
        noOfNBBags: '',
        noOfONBBags: '',
        noOfSSBags: '',
        noOfSWPBags: ''
        // gunnyCondition: {
        //     noOfNBBags: '',
        //     noOfONBBags: '',
        //     noOfSSBags: '',
        //     noOfSWPBags: ''
        // }
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Check if the field requires only numeric input
        //const isNumericField = ['noOfBags', 'weight', 'gunnyCondition.noOfNBBags', 'gunnyCondition.noOfONBBags', 'gunnyCondition.noOfSSBags', 'gunnyCondition.noOfSWPBags'].includes(name);
        const isNumericField = ['noOfBags', 'weight', 'noOfNBBags', 'noOfONBBags', 'noOfSSBags', 'noOfSWPBags'].includes(name);

        // Allow empty input or numbers only
        if (isNumericField && (value === '' || !/^\d*$/.test(value))) {
            return; // Do not update state if the input is invalid
        }

        // if (name.startsWith('gunnyCondition')) {
        //     const key = name.split('.')[1];
        //     setFormValues(prevState => ({
        //         ...prevState,
        //         gunnyCondition: {
        //             ...prevState.gunnyCondition,
        //             [key]: value
        //         }
        //     }));
        // } else {
        //     setFormValues(prevState => ({
        //         ...prevState,
        //         [name]: value
        //     }));
        // }
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }));
        // Clear the error for the field being changed
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
        if (!formValues.date) {
            newErrors.date = "Date is required";
        }
        if (!formValues.kmsStartYear) {
            newErrors.kmsStartYear = "Start Year is required";
        }
        if (!formValues.kmsEndYear) {
            newErrors.kmsEndYear = "End Year is required";
        }
        if (!formValues.godwon) {
            newErrors.godwon = "godwon is required";
        }
        if (!formValues.variety) {
            newErrors.variety = "Variety is required";
        }
        if (!formValues.moitureContent) {
            newErrors.moitureContent = "MC is required";
        }
        if (!formValues.issueMemoNo) {
            newErrors.issueMemoNo = "Memo is required";
        }
        if (formValues.noOfBags === '' || isNaN(formValues.noOfBags)) {
            newErrors.noOfBags = "Number of Bags must be a valid number";
        }
        if (formValues.weight === '' || isNaN(formValues.weight)) {
            newErrors.weight = "Weight must be a valid number";
        }
        if (!formValues.lorryNo) {
            newErrors.lorryNo = "Lorry number is required";
        }
        // Object.keys(formValues.gunnyCondition).forEach(key => {
        //     if (formValues.gunnyCondition[key] === '' || isNaN(formValues.gunnyCondition[key])) {
        //         newErrors[`gunnyCondition.${key}`] = `${key.replace('noOf', '').replace('Bags', '')} must be a valid number`;
        //     }
        // });
        if (!formValues.kmsStartYear) {
            newErrors.kmsStartYear = 'Start year is required';
        }
        if (!formValues.kmsEndYear) {
            newErrors.kmsEndYear = 'End year is required';
        }
        return newErrors;
    };

    const handleSubmitPaddy = async(e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return; // Prevent submission if there are validation errors
        }

        // onSubmit(formValues);
        // resetForm();
        // navigate("/paddyTable");
        try {
            const response = await fetch('http://localhost:3001/paddyData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log('Data submitted successfully:', data);
    
            // Optional: Reset the form after successful submission
            resetForm();
            onSubmit(formValues);
            navigate("/paddyTable");
    
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    const resetForm = () => {
        setFormValues({
            date: null,
            kmsStartYear: '',
            kmsEndYear: '',
            kms:'',
            issueMemoNo: '',
            godwon: '',
            variety: '',
            moitureContent: '',
            lorryNo: '',
            noOfBags: '',
            weight: '',
            noOfNBBags: '',
            noOfONBBags: '',
            noOfSSBags: '',
            noOfSWPBags: ''
            // gunnyCondition: {
            //     noOfNBBags: '',
            //     noOfONBBags: '',
            //     noOfSSBags: '',
            //     noOfSWPBags: ''
            // }
        });
        setErrors({});
        setStartDate(null);
        setEndDate(null);
    };

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // const handleStartDateChange = (date) => {
    //     setStartDate(date);
    //     setFormValues(prevState => ({
    //         ...prevState,
    //         kmsStartYear: date ? date.getFullYear().toString() : ''
    //     }));

    //     if (endDate && date > endDate) {
    //         setEndDate(null);
    //         setFormValues(prevState => ({
    //             ...prevState,
    //             kmsEndYear: '' 
    //         }));
    //     }
    // };

    // const handleEndDateChange = (date) => {
    //     setEndDate(date);
    //     setFormValues(prevState => ({
    //         ...prevState,
    //         kmsEndYear: date ? date.getFullYear().toString() : ''
    //     }));

    //     if (startDate && date < startDate) {
    //         setStartDate(null);
    //         setFormValues(prevState => ({
    //             ...prevState,
    //             kmsStartYear: '' 
    //         }));
    //     }
    // };
    const handleStartDateChange = (date) => {
        setStartDate(date);
        setFormValues(prevState => {
            const startYear = date ? date.getFullYear() : '';
            const endYear = prevState.kmsEndYear || ''; // Retain existing end year
            const kms = endYear ? `${startYear}-${endYear.toString().slice(-2)}` : ''; // Construct kms
            return {
                ...prevState,
                kmsStartYear: startYear.toString(),
                kms: kms // Set the kms value
            };
        });

        if (endDate && date > endDate) {
            setEndDate(null);
            setFormValues(prevState => ({
                ...prevState,
                kmsEndYear: '',
                kms: '' // Reset kms if the end date is cleared
            }));
        }
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        setFormValues(prevState => {
            const endYear = date ? date.getFullYear() : '';
            const startYear = prevState.kmsStartYear || ''; // Retain existing start year
            const kms = startYear ? `${startYear}-${endYear.toString().slice(-2)}` : ''; // Construct kms
            return {
                ...prevState,
                kmsEndYear: endYear.toString(),
                kms: kms // Set the kms value
            };
        });

        if (startDate && date < startDate) {
            setStartDate(null);
            setFormValues(prevState => ({
                ...prevState,
                kmsStartYear: '',
                kms: '' // Reset kms if the start date is cleared
            }));
        }
    };
    return (
        <MDBContainer fluid className='background p-0'>
            <MDBRow className='d-flex h-100 p-4'>
            {/* <MDBCol md='4' className="d-none d-md-block text-center">
                <MDBCardImage src={headerImg} alt="Sample photo" className="rounded-start w-100" fluid />
            </MDBCol>  */}
                <MDBCol md='12'>
                    <MDBCard className='cardBGImg mt-5'>
                        <form onSubmit={handleSubmitPaddy}>
                            <MDBRow className='p-4'>
                                <div className='col-md-3'>
                                    <label htmlFor="date" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">Date</label>
                                    <DatePicker
                                        selected={formValues.date}
                                        onChange={handleDateChange}
                                        dateFormat="MM/dd/yyyy"
                                        className={`form-control fst-italic fw-bold w-100 ${errors.date ? 'input-invalid' : '' }`}
                                    />
                                    {errors.date && <span className="text-danger fontSize">{errors.date}</span>}
                                </div>

                                <div className='col-md-3'>
                                    <label htmlFor="kms" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">KMS</label>
                                    <div className="row w-100">
                                        <div className="col-md-6">
                                            <DatePicker
                                                selected={startDate}
                                                onChange={handleStartDateChange}
                                                placeholderText="Start Year"
                                                showYearPicker
                                                dateFormat="yyyy"
                                                className={`form-control fst-italic fw-bold ${errors.kmsStartYear ? 'input-invalid' : '' }`}
                                                maxDate={new Date()} // Prevent future dates
                                            />
                                            {errors.kmsStartYear && <span className="text-danger fontSize">{errors.kmsStartYear}</span>}
                                        </div>
                                        <div className="col-md-6">
                                            <DatePicker
                                                selected={endDate}
                                                onChange={handleEndDateChange}
                                                placeholderText="End Year"
                                                showYearPicker
                                                dateFormat="yyyy"
                                                className={`form-control fst-italic fw-bold ${errors.kmsEndYear ? 'input-invalid' : '' }`}
                                                maxDate={new Date()} // Prevent future dates
                                            />
                                            {errors.kmsEndYear && <span className="text-danger fontSize">{errors.kmsEndYear}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-3'>
                                    <label htmlFor="godwon" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">godwon</label>
                                    <input
                                        type="text"
                                        id="godwon"
                                        name="godwon"
                                        value={formValues.godwon}
                                        onChange={handleChange}
                                        className={`form-control fst-italic fw-bold ${errors.godwon ? 'input-invalid' : '' }`}
                                    />
                                    {errors.godwon && <span className="text-danger fontSize">{errors.godwon}</span>}
                                </div>
                                <div className='col-md-3'>
                                    <label htmlFor="issueMemoNo" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">Issue Memo No.</label>
                                    <input
                                        type="text"
                                        id="issueMemoNo"
                                        name="issueMemoNo"
                                        value={formValues.issueMemoNo}
                                        onChange={handleChange}
                                        className={`form-control fst-italic fw-bold ${errors.issueMemoNo ? 'input-invalid' : '' }`}
                                    />
                                     {errors.issueMemoNo && <span className="text-danger fontSize">{errors.issueMemoNo}</span>}
                                </div>
                                <div className='col-md-3'>
                                    <label htmlFor="variety" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">Variety</label>
                                    <select
                                        id="variety"
                                        name="variety"
                                        value={formValues.variety}
                                        onChange={handleChange}
                                        className={`form-control fst-italic fw-bold ${errors.variety ? 'input-invalid' : '' }`}
                                    >
                                        <option value="">Select Variety</option>
                                        <option value="ADT">ADT</option>
                                        <option value="CR">CR</option>
                                    </select>
                                    {errors.variety && <span className="text-danger fontSize">{errors.variety}</span>}
                                </div>
                                <div className='col-md-3'>
                                    <label htmlFor="moitureContent" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">% MC</label>
                                    <input
                                        type="text"
                                        id="moitureContent"
                                        name="moitureContent"
                                        value={formValues.moitureContent}
                                        onChange={handleChange}
                                        className={`form-control fst-italic fw-bold ${errors.moitureContent ? 'input-invalid' : '' }`}
                                    />
                                    {errors.moitureContent && <span className="text-danger fontSize">{errors.moitureContent}</span>}
                                </div>
                                <div className='col-md-3'>
                                    <label htmlFor="qtynett" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">Qty Nett</label>
                                    <div className="row w-100">
                                        <div className='col-md-6'>
                                            <input
                                                type="number"
                                                id="noOfBags"
                                                name="noOfBags"
                                                value={formValues.noOfBags}
                                                onChange={handleChange}
                                                className={`form-control fst-italic fw-bold ${errors.noOfBags ? 'input-invalid' : '' }`}
                                                placeholder="Bags"
                                            />
                                            {errors.noOfBags && <span className="text-danger fontSize">{errors.noOfBags}</span>}
                                        </div>
                                        <div className='col-md-6'>
                                            <input
                                                type="number"
                                                id="weight"
                                                name="weight"
                                                value={formValues.weight}
                                                onChange={handleChange}
                                                className={`form-control fst-italic fw-bold ${errors.weight ? 'input-invalid' : '' }`}
                                                placeholder="Weight"
                                            />
                                            {errors.weight && <span className="text-danger fontSize">{errors.weight}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-3'>
                                    <label htmlFor="lorryNo" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">Lorry No</label>
                                    <input
                                        type="text"
                                        id="lorryNo"
                                        name="lorryNo"
                                        value={formValues.lorryNo}
                                        onChange={handleChange}
                                        className={`form-control fst-italic fw-bold ${errors.lorryNo ? 'input-invalid' : '' }`}
                                    />
                                     {errors.lorryNo && <span className="text-danger fontSize">{errors.lorryNo}</span>}
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="gunnyCondition" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">Gunny Condition</label>
                                    <div className="row w-100">
                                        <div className='col-md-3'>
                                            <input
                                                type="number"
                                                id="nb"
                                                //name="gunnyCondition.noOfNBBags"
                                                name="noOfNBBags"
                                                value={formValues.noOfNBBags}
                                                onChange={handleChange}
                                                className={`form-control fst-italic fw-bold ${errors.noOfNBBags ? 'input-invalid' : '' }`}
                                                placeholder="NB"
                                            />
                                            {errors.noOfNBBags && <span className="text-danger fontSize">{errors.noOfNBBags}</span>}
                                        </div>
                                        <div className='col-md-3'>
                                            <input
                                                type="number"
                                                id="onb"
                                                name="noOfONBBags"
                                                value={formValues.noOfONBBags}
                                                onChange={handleChange}
                                                className={`form-control fst-italic fw-bold ${errors.noOfONBBags ? 'input-invalid' : '' }`}
                                                placeholder="ONB"
                                            />
                                            {errors.noOfONBBags && <span className="text-danger fontSize">{errors.noOfONBBags}</span>}
                                        </div>
                                        <div className='col-md-3'>
                                            <input
                                                type="number"
                                                id="ss"
                                                name="noOfSSBags"
                                                value={formValues.noOfSSBags}
                                                onChange={handleChange}
                                                className={`form-control fst-italic fw-bold ${errors.noOfSSBags ? 'input-invalid' : '' }`}
                                                placeholder="SS"
                                            />
                                            {errors.noOfSSBags && <span className="text-danger fontSize">{errors.noOfSSBags}</span>}
                                        </div>
                                        <div className='col-md-3'>
                                            <input
                                                type="number"
                                                id="swp"
                                                name="noOfSWPBags"
                                                value={formValues.noOfSWPBags}
                                                onChange={handleChange}
                                                className={`form-control fst-italic fw-bold ${errors.noOfSWPBags ? 'input-invalid' : '' }`}
                                                placeholder="SWP"
                                            />
                                            {errors.noOfSWPBags && <span className="text-danger fontSize">{errors.noOfSWPBags}</span>}
                                        </div>
                                    </div>
                                </div>
                            </MDBRow>
                            <button type="submit" className="loginBtn btn btn-success mb-3 mt-3 m-auto">Add Data</button>
                        </form>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Paddy;
