import React, { useEffect, useState } from "react";
import { InputGroup, FormControl, Button, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import { MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import ReactPaginate from 'react-paginate';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom'; // Add for navigation
// import './rice.css';
const GunnyCondition = ({ gunnyconditionData }) => {
    const [gunnycondition, setGunnyCondition] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [viewMode, setViewMode] = useState('table'); // State for view mode
    const [showModal, setShowModal] = useState(false);
    // State for filters
    const [filters, setFilters] = useState({
        condition: '',
        downgrade: '',
    });
    const [errors, setErrors] = useState({});
    const [formValues, setFormValues] = useState({ regionName: '', frkPercentage: '' });
    const itemsPerPage = 20;
    const navigate = useNavigate(); // Initialize useNavigate
    // Fetch data from server
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3001/gunnycondition');
            if (!response.ok) throw new Error('Network response was not ok');
            const gunnyconditionData = await response.json();
            setGunnyCondition(gunnyconditionData);
            setFilteredData(gunnyconditionData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    // Handle search input
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };
    // Handle filter changes
    const handleFilterChange = (field, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [field]: value
        }));
    };
    // Filter data based on search term and filter values
    useEffect(() => {
        const filtered = gunnycondition.filter(item =>
            Object.keys(filters).every(key =>
                !filters[key] || item[key] === filters[key]
            ) &&
            (searchTerm ? Object.values(item).some(val =>
                (val !== null && val !== undefined && val.toString().toLowerCase().includes(searchTerm.toLowerCase()))
            ) : true)
        );
        setFilteredData(filtered);
        setCurrentPage(0); // Reset to first page on search or filter
    }, [searchTerm, filters, gunnycondition]);

    // Generate PDF
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [["Condition", "Downgrade"]],
            body: filteredData.map(item => [
                item.condition || '',
                item.downgrade || '',
            ]),
        });
        doc.save('gunnycondition.pdf');
    };
    // Pagination logic
    const pageCount = Math.ceil(filteredData.length / itemsPerPage);
    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const currentData = filteredData.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevValues => ({ ...prevValues, [name]: value }));
    };
    // Navigate to add data form
    const handleAddRiceClick = () => {
        setShowModal(true);
    };
    const handleRegionAdd = async () => {
        try {
            const response = await fetch('http://localhost:3001/gunnycondition', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValues)
            });
            if (!response.ok) throw new Error('Network response was not ok');
            await fetchData();
            setFormValues({ condition: '', downgrade: '' });
            setShowModal(false);
        } catch (error) {
            console.error('Error adding region:', error);
        }
    };
    const handleAddCancel = () => {
        setShowModal(false)
    }
    const handleEditCancel = () =>{
        setShowEditModal(false)
    }
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); 
    // Handle edit item
    const handleEdit = (item) => {
        setSelectedItem(item);
        setFormValues({ condition: item.condition, downgrade: item.downgrade });
        setShowEditModal(true);
    };
    
    // Handle updating region
    const handleRegionUpdate = async () => {
        if (!selectedItem) return;
        try {
            const response = await fetch(`http://localhost:3001/gunnycondition/${selectedItem.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValues)
            });
            if (!response.ok) throw new Error('Network response was not ok');
            await fetchData();
            setShowEditModal(false);
        } catch (error) {
            console.error('Error updating region:', error);
        }
    };

    return (
        <div className="container-fluid p-4">
            <MDBRow>
                <MDBCol md='6' className='my-3'>
                    <InputGroup>
                        <FormControl
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </InputGroup>
                </MDBCol>
                <MDBCol md='6' className='my-3 text-end'>
                    {/* <Button variant="primary" onClick={generatePDF}>Download PDF</Button> */}
                    <Button variant="success" onClick={handleAddRiceClick} className="ms-2 mx-2">Add Gunny Condition</Button>
                    {/* <Button variant="info" onClick={() => toggleViewMode('table')}>Table View</Button>
                    <Button variant="info" onClick={() => toggleViewMode('grid')} className="ms-2">Grid View</Button> */}
                </MDBCol>
            </MDBRow>

            {viewMode === 'table' ? (
                <MDBRow className="mt-2 g-0">
                    <MDBCol className="ml-auto mt-2 mb-2" md='12'>
                        <MDBTable striped bordered hover responsive>
                            <MDBTableHead>
                                <tr>
                                    <th rowSpan="2" className="px-2 fs-6">
                                        Condition
                                        <DropdownButton
                                            variant="link"
                                            id="dropdown-condition"
                                            title={<i className="fas fa-filter"></i>}
                                            className="float-end"
                                        >
                                            <Dropdown.Item onClick={() => handleFilterChange('condition', '')}>All</Dropdown.Item>
                                            {Array.from(new Set(gunnycondition.map(item => item.condition))).map((value, index) => (
                                                <Dropdown.Item key={index} onClick={() => handleFilterChange('condition', value)}>
                                                    {value}
                                                </Dropdown.Item>
                                            ))}
                                        </DropdownButton>
                                    </th>
                                    <th rowSpan="2" className="px-2 fs-6">
                                        Downgrade
                                        <DropdownButton
                                            variant="link"
                                            id="dropdown-downgrade"
                                            title={<i className="fas fa-filter"></i>}
                                            className="float-end"
                                        >
                                            <Dropdown.Item onClick={() => handleFilterChange('downgrade', '')}>All</Dropdown.Item>
                                            {Array.from(new Set(gunnycondition.map(item => item.downgrade))).map((value, index) => (
                                                <Dropdown.Item key={index} onClick={() => handleFilterChange('downgrade', value)}>
                                                    {value}
                                                </Dropdown.Item>
                                            ))}
                                        </DropdownButton>
                                    </th>
                                </tr>
                                <tr>
                                    <th className="px-2 fs-6">Actions</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {currentData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.downgrade}</td>
                                        <td>{item.condition}</td>
                                        <td>
                                            <i className="fas fa-arrow-right-long" onClick={() => handleEdit(item)}></i>
                                        </td>
                                    </tr>
                                ))}
                            </MDBTableBody>
                        </MDBTable>
                    </MDBCol>
                </MDBRow>
            ) : (
                <MDBRow className="mt-2 g-0">
                    {currentData.map((item, index) => (
                        <MDBCol md="3" key={index} className="mb-3">
                            <MDBCard>
                                <MDBCardBody>
                                    <h5 className='card-title'>{item.issueMemoNo}</h5>
                                    <p className='card-text mb-0'><span className='fst-italic fw-bold fs-6'>Condition</span> : {item.condition}</p>
                                    <p className='card-text mb-0'><span className='fst-italic fw-bold fs-6'>Downgrade</span> : {item.downgrade}</p>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    ))}
                </MDBRow>
            )}

            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
            <Modal show={showModal} onHide={handleAddCancel} className='modalWidth d-flex align-items-center justify-content-center;'>
                <Modal.Header closeButton>
                    <Modal.Title className='fst-italic fw-bold fs-5'>Add Gunny Condition</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MDBInput
                        value={formValues.condition}
                        name='condition'
                        onChange={handleChange}
                        id='condition'
                        label='Condition'
                        className={`form-control mb-4 ${errors.condition ? 'input-invalid' : ''}`}
                    />
                    <MDBInput
                        value={formValues.downgrade}
                        name='downgrade'
                        onChange={handleChange}
                        id='downgrade'
                        label='Downgrade'
                        className={`form-control ${errors.downgrade ? 'input-invalid' : ''}`}
                    />
                    <div className='d-flex align-items-center justify-content-center'>
                        <Button variant="primary" onClick={handleRegionAdd} className='loginBtn'>
                            Add
                        </Button>
                        <Button onClick={handleAddCancel} variant="default" className='loginBtn btn mb-3 mt-3 mx-2'>
                            Cancel
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={handleEditCancel} className='modalWidth d-flex align-items-center justify-content-center;'>
                <Modal.Header closeButton>
                    <Modal.Title className='fst-italic fw-bold fs-5'>Edit Gunny Condition</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MDBInput
                        label='Condition'
                        name='condition'
                        id='condition'
                        value={formValues.condition}
                        onChange={handleChange}
                        className={`form-control mb-4 ${errors.condition ? 'input-invalid' : ''}`}
                    />
                    <MDBInput
                        label='Downgrade'
                        name='downgrade'
                        id='downgrade'
                        value={formValues.downgrade}
                        onChange={handleChange}
                        className={`form-control mb-4 ${errors.downgrade ? 'input-invalid' : ''}`}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditCancel}>Cancel</Button>
                    <Button variant="primary" onClick={handleRegionUpdate}>Update</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default GunnyCondition;