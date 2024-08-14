// import React, { useState } from "react";
// import {
//     MDBContainer, MDBRow, MDBCol, MDBCard
// } from 'mdb-react-ui-kit';
// import DatePicker from 'react-datepicker';
// import { useNavigate } from "react-router-dom"
// const Paddy = ({ onSubmit }) => {
//     const [formValues, setFormValues] = useState({
//         date: null,
//         kmsStartYear: '',
//         kmsEndYear: '',
//         issueMemoNo: '',
//         godown: '',
//         variety: '',
//         percentMC: '',
//         lorryNo: '',
//         noOfBags: '',
//         weight: '',
//         gunnyCondition: {
//             noOfNBBags: '',
//             noOfONBBags: '',
//             noOfSSBags: '',
//             noOfSWPBags: ''
//         }
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         if (name.startsWith('gunnyCondition')) {
//             const key = name.split('.')[1];
//             setFormValues(prevState => ({
//                 ...prevState,
//                 gunnyCondition: {
//                     ...prevState.gunnyCondition,
//                     [key]: value
//                 }
//             }));
//         } else {
//             setFormValues(prevState => ({
//                 ...prevState,
//                 [name]: value
//             }));
//         }
//     };

//     const handleDateChange = (date) => {
//         setFormValues(prevState => ({
//             ...prevState,
//             date
//         }));
//     };

//     const navigate = useNavigate();


//     const handleSubmitPaddy = (e) => {
//         e.preventDefault();
//         onSubmit(formValues);

//         resetForm();

//         navigate("/paddyTable");
//     }

//     const resetForm = () => {
//         setFormValues({
//             date: null,
//             kmsStartYear: '',
//             kmsEndYear: '',
//             issueMemoNo: '',
//             godown: '',
//             variety: '',
//             percentMC: '',
//             lorryNo: '',
//             noOfBags: '',
//             weight: '',
//             gunnyCondition: {
//                 noOfNBBags: '',
//                 noOfONBBags: '',
//                 noOfSSBags: '',
//                 noOfSWPBags: ''
//             }
//         });
//         setStartDate(null);
//         setEndDate(null);
//     }

//     const [startDate, setStartDate] = useState(null);
//     const [endDate, setEndDate] = useState(null);

//     const handleStartDateChange = (date) => {
//         setStartDate(date);
//         setFormValues(prevState => ({
//             ...prevState,
//             kmsStartYear: date ? date.getFullYear().toString() : ''
//         }));

//         if (endDate && date > endDate) {
//             setEndDate(null);
//             setFormValues(prevState => ({
//                 ...prevState,
//                 kmsEndYear: '' // Clear end year if the new start date is after the end date
//             }));
//         }
//     };

//     const handleEndDateChange = (date) => {
//         setEndDate(date);
//         setFormValues(prevState => ({
//             ...prevState,
//             kmsEndYear: date ? date.getFullYear().toString() : ''
//         }));

//         if (startDate && date < startDate) {
//             setStartDate(null);
//             setFormValues(prevState => ({
//                 ...prevState,
//                 kmsStartYear: '' // Clear start year if the new end date is before the start date
//             }));
//         }
//     };

//     //const role = "admin";

//     return (
//         //role === "admin" &&
//         <MDBContainer fluid className='background p-0'>
//             <MDBRow className='d-flex h-100'>
//                 <MDBCol md='12'>
//                     <MDBCard className='cardBGImg mt-5'>
//                         <form onSubmit={handleSubmitPaddy}>
//                             <MDBRow className='p-4'>
//                                 <div className='col-md-3'>
//                                     <label htmlFor="date" className="form-label-text mt-2 form-label float-start fst-italic fw-bold">Date</label>
//                                     <DatePicker
//                                         selected={formValues.date}
//                                         onChange={handleDateChange}
//                                         dateFormat="MM/dd/yyyy"
//                                         className={`form-control fst-italic fw-bold w-100`}
//                                     />
//                                 </div>

//                                 <div className='col-md-3'>
//                                     <label htmlFor="kms" className="form-label-text mt-2 form-label float-start fst-italic fw-bold">KMS</label>
//                                     <div className="row w-100">
//                                         <div className="col-md-6">
//                                             <DatePicker
//                                                 selected={startDate}
//                                                 onChange={handleStartDateChange}
//                                                 placeholderText="Start Year"
//                                                 showYearPicker
//                                                 dateFormat="yyyy"
//                                                 className={`form-control fst-italic fw-bold`}
//                                                 maxDate={new Date()} // Prevent future dates
//                                             />
//                                         </div>
//                                         <div className="col-md-6">
//                                             <DatePicker
//                                                 selected={endDate}
//                                                 onChange={handleEndDateChange}
//                                                 placeholderText="End Year"
//                                                 showYearPicker
//                                                 dateFormat="yyyy"
//                                                 className={`form-control fst-italic fw-bold`}
//                                                 maxDate={new Date()} // Prevent future dates
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className='col-md-3'>
//                                     <label htmlFor="godown" className="form-label-text mt-2 form-label float-start fst-italic fw-bold">Godown</label>
//                                     <input
//                                         type="text"
//                                         id="godown"
//                                         name="godown"
//                                         value={formValues.godown}
//                                         onChange={handleChange}
//                                         className={`form-control fst-italic fw-bold`}
//                                     />
//                                 </div>
//                                 <div className='col-md-3'>
//                                     <label htmlFor="issueMemoNo" className="form-label-text mt-2 form-label float-start fst-italic fw-bold">Issue Memo No.</label>
//                                     <input
//                                         type="text"
//                                         id="issueMemoNo"
//                                         name="issueMemoNo"
//                                         value={formValues.issueMemoNo}
//                                         onChange={handleChange}
//                                         className={`form-control fst-italic fw-bold`}
//                                     />
//                                 </div>
//                                 <div className='col-md-3'>
//                                     <label htmlFor="variety" className="form-label-text mt-2 form-label float-start fst-italic fw-bold">Variety</label>
//                                     {/* <input
//                                         type="text"
//                                         id="variety"
//                                         name="variety"
//                                         value={formValues.variety}
//                                         onChange={handleChange}
//                                         className={`form-control fst-italic fw-bold`}
//                                     /> */}
//                                     <select
//                                         id="variety"
//                                         name="variety"
//                                         value={formValues.variety}
//                                         onChange={handleChange}
//                                         className={`form-control fst-italic fw-bold`}
//                                     >
//                                         <option value="">Select Variety</option>
//                                         <option value="ADT">ADT</option>
//                                         <option value="CR">CR</option>
//                                     </select>
//                                 </div>
//                                 <div className='col-md-3'>
//                                     <label htmlFor="percentMC" className="form-label-text mt-2 form-label float-start fst-italic fw-bold">% MC</label>
//                                     <input
//                                         type="text"
//                                         id="percentMC"
//                                         name="percentMC"
//                                         value={formValues.percentMC}
//                                         onChange={handleChange}
//                                         className={`form-control fst-italic fw-bold`}
//                                     />
//                                 </div>
//                                 <div className='col-md-3'>
//                                     <label htmlFor="qtynett" className="form-label-text mt-2 form-label float-start fst-italic fw-bold">Qty Nett</label>
//                                     <div className="row w-100">
//                                         <div className='col-md-6'>
//                                             <input
//                                                 type="text"
//                                                 id="noOfBags"
//                                                 name="noOfBags"
//                                                 value={formValues.noOfBags}
//                                                 onChange={handleChange}
//                                                 className={`form-control fst-italic fw-bold`}
//                                                 placeholder="Bags"
//                                             />
//                                         </div>
//                                         <div className='col-md-6'>
//                                             <input
//                                                 type="text"
//                                                 id="weight"
//                                                 name="weight"
//                                                 value={formValues.weight}
//                                                 onChange={handleChange}
//                                                 className={`form-control fst-italic fw-bold`}
//                                                 placeholder="Weight"
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                                 {/* <div className='col-md-3'>
//                                     <label htmlFor="noOfBags" className="form-label-text mt-2 form-label float-start fst-italic fw-bold">Bags</label>
//                                     <input
//                                         type="text"
//                                         id="noOfBags"
//                                         name="noOfBags"
//                                         value={formValues.noOfBags}
//                                         onChange={handleChange}
//                                         className={`form-control fst-italic fw-bold`}
//                                     />
//                                 </div>
//                                 <div className='col-md-3'>
//                                     <label htmlFor="weight" className="form-label-text mt-2 form-label float-start fst-italic fw-bold">Weight</label>
//                                     <input
//                                         type="text"
//                                         id="weight"
//                                         name="weight"
//                                         value={formValues.weight}
//                                         onChange={handleChange}
//                                         className={`form-control fst-italic fw-bold`}
//                                     />
//                                 </div> */}
//                                 <div className='col-md-3'>
//                                     <label htmlFor="lorryNo" className="form-label-text mt-2 form-label float-start fst-italic fw-bold">Lorry No</label>
//                                     <input
//                                         type="text"
//                                         id="lorryNo"
//                                         name="lorryNo"
//                                         value={formValues.lorryNo}
//                                         onChange={handleChange}
//                                         className={`form-control fst-italic fw-bold`}
//                                     />
//                                 </div>
//                                 <div className="col-md-6">
//                                     <label htmlFor="gunnyCondition" className="form-label-text mt-2 form-label float-start fst-italic fw-bold">Gunny Condition</label>
//                                     <div className="row w-100">
//                                         <div className='col-md-3'>
//                                             <input
//                                                 type="text"
//                                                 id="nb"
//                                                 name="gunnyCondition.noOfNBBags"
//                                                 value={formValues.gunnyCondition.noOfNBBags}
//                                                 onChange={handleChange}
//                                                 className={`form-control fst-italic fw-bold`}
//                                                 placeholder="NB"
//                                             />
//                                         </div>
//                                         <div className='col-md-3'>
//                                             <input
//                                                 type="text"
//                                                 id="onb"
//                                                 name="gunnyCondition.noOfONBBags"
//                                                 value={formValues.gunnyCondition.noOfONBBags}
//                                                 onChange={handleChange}
//                                                 className={`form-control fst-italic fw-bold`}
//                                                 placeholder="ONB"
//                                             />
//                                         </div>
//                                         <div className='col-md-3'>
//                                             <input
//                                                 type="text"
//                                                 id="ss"
//                                                 name="gunnyCondition.noOfSSBags"
//                                                 value={formValues.gunnyCondition.noOfSSBags}
//                                                 onChange={handleChange}
//                                                 className={`form-control fst-italic fw-bold`}
//                                                 placeholder="SS"
//                                             />
//                                         </div>
//                                         <div className='col-md-3'>
//                                             <input
//                                                 type="text"
//                                                 id="swp"
//                                                 name="gunnyCondition.noOfSWPBags"
//                                                 value={formValues.gunnyCondition.noOfSWPBags}
//                                                 onChange={handleChange}
//                                                 className={`form-control fst-italic fw-bold`}
//                                                 placeholder="SWP"
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                                 {/* <div className='col-md-3'>
//                                     <label htmlFor="nb" className="form-label-text mt-2 form-label float-start fst-italic fw-bold">NB</label>
//                                     <input
//                                         type="text"
//                                         id="nb"
//                                         name="gunnyCondition.noOfNBBags"
//                                         value={formValues.gunnyCondition.noOfNBBags}
//                                         onChange={handleChange}
//                                         className={`form-control fst-italic fw-bold`}
//                                     />
//                                 </div>
//                                 <div className='col-md-3'>
//                                     <label htmlFor="onb" className="form-label-text mt-2 form-label float-start fst-italic fw-bold">ONB</label>
//                                     <input
//                                         type="text"
//                                         id="onb"
//                                         name="gunnyCondition.noOfONBBags"
//                                         value={formValues.gunnyCondition.noOfONBBags}
//                                         onChange={handleChange}
//                                         className={`form-control fst-italic fw-bold`}
//                                     />
//                                 </div>
//                                 <div className='col-md-3'>
//                                     <label htmlFor="ss" className="form-label-text mt-2 form-label float-start fst-italic fw-bold">SS</label>
//                                     <input
//                                         type="text"
//                                         id="ss"
//                                         name="gunnyCondition.noOfSSBags"
//                                         value={formValues.gunnyCondition.noOfSSBags}
//                                         onChange={handleChange}
//                                         className={`form-control fst-italic fw-bold`}
//                                     />
//                                 </div>
//                                 <div className='col-md-3'>
//                                     <label htmlFor="swp" className="form-label-text mt-2 form-label float-start fst-italic fw-bold">SWP</label>
//                                     <input
//                                         type="text"
//                                         id="swp"
//                                         name="gunnyCondition.noOfSWPBags"
//                                         value={formValues.gunnyCondition.noOfSWPBags}
//                                         onChange={handleChange}
//                                         className={`form-control fst-italic fw-bold`}
//                                     />
//                                 </div> */}
//                             </MDBRow>
//                             <button type="submit" className="loginBtn btn btn-success mb-3 mt-3 m-auto">Add Data</button>
//                         </form>
//                     </MDBCard>
//                 </MDBCol>
//             </MDBRow>
//         </MDBContainer>
//     );
// }

// export default Paddy;
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
        issueMemoNo: '',
        godown: '',
        variety: '',
        percentMC: '',
        lorryNo: '',
        noOfBags: '',
        weight: '',
        gunnyCondition: {
            noOfNBBags: '',
            noOfONBBags: '',
            noOfSSBags: '',
            noOfSWPBags: ''
        }
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Check if the field requires only numeric input
        const isNumericField = ['noOfBags', 'weight', 'gunnyCondition.noOfNBBags', 'gunnyCondition.noOfONBBags', 'gunnyCondition.noOfSSBags', 'gunnyCondition.noOfSWPBags'].includes(name);
        
        // Allow empty input or numbers only
        if (isNumericField && (value === '' || !/^\d*$/.test(value))) {
            return; // Do not update state if the input is invalid
        }

        if (name.startsWith('gunnyCondition')) {
            const key = name.split('.')[1];
            setFormValues(prevState => ({
                ...prevState,
                gunnyCondition: {
                    ...prevState.gunnyCondition,
                    [key]: value
                }
            }));
        } else {
            setFormValues(prevState => ({
                ...prevState,
                [name]: value
            }));
        }

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
        if (!formValues.godown) {
            newErrors.godown = "Godown is required";
        }
        if (!formValues.variety) {
            newErrors.variety = "Variety is required";
        }
        if (!formValues.percentMC) {
            newErrors.percentMC = "MC is required";
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
        Object.keys(formValues.gunnyCondition).forEach(key => {
            if (formValues.gunnyCondition[key] === '' || isNaN(formValues.gunnyCondition[key])) {
                newErrors[`gunnyCondition.${key}`] = `${key.replace('noOf', '').replace('Bags', '')} must be a valid number`;
            }
        });

        return newErrors;
    };

    const handleSubmitPaddy = (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return; // Prevent submission if there are validation errors
        }

        onSubmit(formValues);
        resetForm();
        navigate("/paddyTable");
    };

    const resetForm = () => {
        setFormValues({
            date: null,
            kmsStartYear: '',
            kmsEndYear: '',
            issueMemoNo: '',
            godown: '',
            variety: '',
            percentMC: '',
            lorryNo: '',
            noOfBags: '',
            weight: '',
            gunnyCondition: {
                noOfNBBags: '',
                noOfONBBags: '',
                noOfSSBags: '',
                noOfSWPBags: ''
            }
        });
        setErrors({});
        setStartDate(null);
        setEndDate(null);
    };

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleStartDateChange = (date) => {
        setStartDate(date);
        setFormValues(prevState => ({
            ...prevState,
            kmsStartYear: date ? date.getFullYear().toString() : ''
        }));

        if (endDate && date > endDate) {
            setEndDate(null);
            setFormValues(prevState => ({
                ...prevState,
                kmsEndYear: '' 
            }));
        }
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        setFormValues(prevState => ({
            ...prevState,
            kmsEndYear: date ? date.getFullYear().toString() : ''
        }));

        if (startDate && date < startDate) {
            setStartDate(null);
            setFormValues(prevState => ({
                ...prevState,
                kmsStartYear: '' 
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
                                    <label htmlFor="godown" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">Godown</label>
                                    <input
                                        type="text"
                                        id="godown"
                                        name="godown"
                                        value={formValues.godown}
                                        onChange={handleChange}
                                        className={`form-control fst-italic fw-bold ${errors.godown ? 'input-invalid' : '' }`}
                                    />
                                    {errors.godown && <span className="text-danger fontSize">{errors.godown}</span>}
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
                                    <label htmlFor="percentMC" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">% MC</label>
                                    <input
                                        type="text"
                                        id="percentMC"
                                        name="percentMC"
                                        value={formValues.percentMC}
                                        onChange={handleChange}
                                        className={`form-control fst-italic fw-bold ${errors.percentMC ? 'input-invalid' : '' }`}
                                    />
                                    {errors.percentMC && <span className="text-danger fontSize">{errors.percentMC}</span>}
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
                                                name="gunnyCondition.noOfNBBags"
                                                value={formValues.gunnyCondition.noOfNBBags}
                                                onChange={handleChange}
                                                className={`form-control fst-italic fw-bold ${errors['gunnyCondition.noOfNBBags'] ? 'input-invalid' : '' }`}
                                                placeholder="NB"
                                            />
                                            {errors['gunnyCondition.noOfNBBags'] && <span className="text-danger fontSize">{errors['gunnyCondition.noOfNBBags']}</span>}
                                        </div>
                                        <div className='col-md-3'>
                                            <input
                                                type="number"
                                                id="onb"
                                                name="gunnyCondition.noOfONBBags"
                                                value={formValues.gunnyCondition.noOfONBBags}
                                                onChange={handleChange}
                                                className={`form-control fst-italic fw-bold ${errors['gunnyCondition.noOfONBBags'] ? 'input-invalid' : '' }`}
                                                placeholder="ONB"
                                            />
                                            {errors['gunnyCondition.noOfONBBags'] && <span className="text-danger fontSize">{errors['gunnyCondition.noOfONBBags']}</span>}
                                        </div>
                                        <div className='col-md-3'>
                                            <input
                                                type="number"
                                                id="ss"
                                                name="gunnyCondition.noOfSSBags"
                                                value={formValues.gunnyCondition.noOfSSBags}
                                                onChange={handleChange}
                                                className={`form-control fst-italic fw-bold ${errors['gunnyCondition.noOfSSBags'] ? 'input-invalid' : '' }`}
                                                placeholder="SS"
                                            />
                                            {errors['gunnyCondition.noOfSSBags'] && <span className="text-danger fontSize">{errors['gunnyCondition.noOfSSBags']}</span>}
                                        </div>
                                        <div className='col-md-3'>
                                            <input
                                                type="number"
                                                id="swp"
                                                name="gunnyCondition.noOfSWPBags"
                                                value={formValues.gunnyCondition.noOfSWPBags}
                                                onChange={handleChange}
                                                className={`form-control fst-italic fw-bold ${errors['gunnyCondition.noOfSWPBags'] ? 'input-invalid' : '' }`}
                                                placeholder="SWP"
                                            />
                                            {errors['gunnyCondition.noOfSWPBags'] && <span className="text-danger fontSize">{errors['gunnyCondition.noOfSWPBags']}</span>}
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
