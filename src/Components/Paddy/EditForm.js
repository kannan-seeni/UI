import React, { useState,useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardImage, MDBInput } from 'mdb-react-ui-kit';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import headerImg from '../../assets/paddyfield.jpg';
const EditForm = () => {
    // State to manage form values and errors
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

    useEffect(() => {
        // Fetch the data for the selected item
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
    const [errors, setErrors] = useState({});
    const [editIndex, setEditIndex] = useState(null);
    const [data, setData] = useState([]);

    // Handle form input changes
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

    // Handle date changes
    const handleDateChange = (date) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            date: date
        }));
    };

    const handleStartDateChange = (date) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            kmsStartYear: date
        }));
    };

    const handleEndDateChange = (date) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            kmsEndYear: date
        }));
    };

    // Handle form submission
    const handleSubmitPaddy = (e) => {
        e.preventDefault();

        // Validate form values
        const newErrors = {};
        if (!formValues.date) newErrors.date = 'Date is required';
        // Add other validations as needed

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Update the data
        const updatedData = [...data];
        if (editIndex !== null) {
            updatedData[editIndex] = formValues;
            setData(updatedData);
        } else {
            setData([...data, formValues]);
        }

        // Reset form and edit state
        setFormValues({
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
        setEditIndex(null);
    };

    // Handle editing a row
    const handleEdit = (index) => {
        const itemToEdit = data[index];
        setEditIndex(index);
        setFormValues({
            date: itemToEdit.date ? new Date(itemToEdit.date) : new Date(),
            kmsStartYear: itemToEdit.kmsStartYear ? new Date(itemToEdit.kmsStartYear) : null,
            kmsEndYear: itemToEdit.kmsEndYear ? new Date(itemToEdit.kmsEndYear) : null,
            region: itemToEdit.region,
            godwon: itemToEdit.godwon,
            issueMemoNo: itemToEdit.issueMemoNo,
            variety: itemToEdit.variety,
            moitureContent: itemToEdit.moitureContent,
            noOfBags: itemToEdit.noOfBags,
            weight: itemToEdit.weight,
            lorryNo: itemToEdit.lorryNo,
            noOfNBBags: itemToEdit.noOfNBBags,
            noOfONBBags: itemToEdit.noOfONBBags,
            noOfSSBags: itemToEdit.noOfSSBags,
            noOfSWPBags: itemToEdit.noOfSWPBags
        });
    };
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

    const handleSave = async () => {
        // Validate and save data
        try {
            const response = await fetch(`http://localhost:3001/paddyData/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            navigate('/paddyTable'); // Redirect back to the main page after saving
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };
    const handleCancel = () =>{
        navigate('/paddyTable');  
    }
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
                                    <label htmlFor="kmsStartYear" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">KMS Start Year</label>
                                    <DatePicker
                                        selected={formValues.kmsStartYear}
                                        onChange={handleStartDateChange}
                                        placeholderText="Start Year"
                                        showYearPicker
                                        dateFormat="yyyy"
                                        className={`form-control ${errors.kmsStartYear ? 'input-invalid' : ''}`}
                                        maxDate={new Date()}
                                    />
                                    {errors.kmsStartYear && <span className="text-danger fontSize">{errors.kmsStartYear}</span>}
                                </MDBCol>
                                <MDBCol md='4'>
                                    <label htmlFor="kmsEndYear" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">KMS End Year</label>
                                    <DatePicker
                                        selected={formValues.kmsEndYear}
                                        onChange={handleEndDateChange}
                                        placeholderText="End Year"
                                        showYearPicker
                                        dateFormat="yyyy"
                                        className={`form-control ${errors.kmsEndYear ? 'input-invalid' : ''}`}
                                        maxDate={new Date()}
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
                                        <option value="Samba">Samba</option>
                                        <option value="Thaladi">Thaladi</option>
                                    </select>
                                    {errors.variety && <span className="text-danger fontSize">{errors.variety}</span>}
                                </MDBCol>
                                <MDBCol md='6 mt-2'>
                                    <label htmlFor="moitureContent" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">Moisture Content (%)</label>
                                    <MDBInput
                                        value={formValues.moitureContent}
                                        name='moitureContent'
                                        onChange={handleChange}
                                        id='moitureContent'
                                        className={`form-control ${errors.moitureContent ? 'input-invalid' : ''}`}
                                    />
                                    {errors.moitureContent && <span className="text-danger fontSize">{errors.moitureContent}</span>}
                                </MDBCol>
                                <MDBCol md='6 mt-2'>
                                    <label htmlFor="noOfBags" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">No of Bags</label>
                                    <MDBInput
                                        value={formValues.noOfBags}
                                        name='noOfBags'
                                        onChange={handleChange}
                                        id='noOfBags'
                                        className={`form-control ${errors.noOfBags ? 'input-invalid' : ''}`}
                                    />
                                    {errors.noOfBags && <span className="text-danger fontSize">{errors.noOfBags}</span>}
                                </MDBCol>
                                <MDBCol md='6 mt-2'>
                                    <label htmlFor="weight" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">Weight</label>
                                    <MDBInput
                                        value={formValues.weight}
                                        name='weight'
                                        onChange={handleChange}
                                        id='weight'
                                        className={`form-control ${errors.weight ? 'input-invalid' : ''}`}
                                    />
                                    {errors.weight && <span className="text-danger fontSize">{errors.weight}</span>}
                                </MDBCol>
                                <MDBCol md='6 mt-2'>
                                    <label htmlFor="lorryNo" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">Lorry No</label>
                                    <MDBInput
                                        value={formValues.lorryNo}
                                        name='lorryNo'
                                        onChange={handleChange}
                                        id='lorryNo'
                                        className={`form-control ${errors.lorryNo ? 'input-invalid' : ''}`}
                                    />
                                    {errors.lorryNo && <span className="text-danger fontSize">{errors.lorryNo}</span>}
                                </MDBCol>
                                <MDBCol md='6 mt-2'>
                                    <label htmlFor="noOfNBBags" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">No of NB Bags</label>
                                    <MDBInput
                                        value={formValues.noOfNBBags}
                                        name='noOfNBBags'
                                        onChange={handleChange}
                                        id='noOfNBBags'
                                        className={`form-control ${errors.noOfNBBags ? 'input-invalid' : ''}`}
                                    />
                                    {errors.noOfNBBags && <span className="text-danger fontSize">{errors.noOfNBBags}</span>}
                                </MDBCol>
                                <MDBCol md='6 mt-2'>
                                    <label htmlFor="noOfONBBags" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">No of ONB Bags</label>
                                    <MDBInput
                                        value={formValues.noOfONBBags}
                                        name='noOfONBBags'
                                        onChange={handleChange}
                                        id='noOfONBBags'
                                        className={`form-control ${errors.noOfONBBags ? 'input-invalid' : ''}`}
                                    />
                                    {errors.noOfONBBags && <span className="text-danger fontSize">{errors.noOfONBBags}</span>}
                                </MDBCol>
                                <MDBCol md='6 mt-2'>
                                    <label htmlFor="noOfSSBags" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">No of SS Bags</label>
                                    <MDBInput
                                        value={formValues.noOfSSBags}
                                        name='noOfSSBags'
                                        onChange={handleChange}
                                        id='noOfSSBags'
                                        className={`form-control ${errors.noOfSSBags ? 'input-invalid' : ''}`}
                                    />
                                    {errors.noOfSSBags && <span className="text-danger fontSize">{errors.noOfSSBags}</span>}
                                </MDBCol>
                                <MDBCol md='6 mt-2'>
                                    <label htmlFor="noOfSWPBags" className="form-label-text mt-2 form-label float-start fst-italic fw-bold fs-6">No of SWP Bags</label>
                                    <MDBInput
                                        value={formValues.noOfSWPBags}
                                        name='noOfSWPBags'
                                        onChange={handleChange}
                                        id='noOfSWPBags'
                                        className={`form-control ${errors.noOfSWPBags ? 'input-invalid' : ''}`}
                                    />
                                    {errors.noOfSWPBags && <span className="text-danger fontSize">{errors.noOfSWPBags}</span>}
                                </MDBCol>
                            </MDBRow>
                            <button type="submit" className="loginBtn btn btn-success mb-3 mt-3" onClick={handleSave}>Update Data</button>
                            <button type="submit" className="loginBtn btn btn-default mb-3 mt-3 mx-2" onClick={handleCancel}>Cancel</button>
                        </form>
                        {/* <MDBRow className="mt-4">
                            {data.map((item, index) => (
                                <MDBCol key={index} md="4" className="mb-3">
                                    <MDBCard className='p-3'>
                                        <MDBCard.Body>
                                            <h5>Entry {index + 1}</h5>
                                            <p>Date: {item.date ? item.date.toDateString() : 'N/A'}</p>
                                            <p>KMS Start Year: {item.kmsStartYear ? item.kmsStartYear.getFullYear() : 'N/A'}</p>
                                            <p>KMS End Year: {item.kmsEndYear ? item.kmsEndYear.getFullYear() : 'N/A'}</p>
                                            <button onClick={() => handleEdit(index)} className="btn btn-primary">Edit</button>
                                        </MDBCard.Body>
                                    </MDBCard>
                                </MDBCol>
                            ))}
                        </MDBRow> */}
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default EditForm;
