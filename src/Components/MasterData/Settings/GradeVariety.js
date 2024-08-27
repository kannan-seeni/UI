import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBInput, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { Modal, Button, Dropdown, DropdownButton, FormControl, InputGroup } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

const GradeVariety = () => {
    const [gunnyvariety, setGunnyVariety] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [filters, setFilters] = useState({ grade: '', varietyName: '' });
    const [errors, setErrors] = useState({});
    const [formValues, setFormValues] = useState({ grade: '', varietyName: '' });
    const [varietyList, setVarietyList] = useState([]);
    const itemsPerPage = 20;
    // Fetch data from server
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3001/gunnyvariety');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setGunnyVariety(data);
            setFilteredData(data);
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
        const filtered = gunnyvariety.filter(item =>
            Object.keys(filters).every(key =>
                !filters[key] || item[key] === filters[key]
            ) &&
            (searchTerm ? item.variety.some(v =>
                v.varietyName.toLowerCase().includes(searchTerm.toLowerCase())
            ) : true)
        );
        setFilteredData(filtered);
        setCurrentPage(0); // Reset to first page on search or filter
    }, [searchTerm, filters, gunnyvariety]);
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
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };
    // Add new gunny variety
    const handleRegionAdd = async () => {
        const newGunnyVariety = {
            grade: formValues.grade,
            variety: [
                {
                    varietyName: formValues.varietyName,
                    //gradeId: 1, // Example value, should be updated as needed
                    //status: true
                }
            ],
            status: true
        };
        try {
            const response = await fetch('http://localhost:3001/gunnyvariety', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newGunnyVariety)
            });

            if (!response.ok) throw new Error('Network response was not ok');

            await fetchData(); // Refresh data to include newly added item
            setFormValues({ grade: '', varietyName: '' }); // Reset form values
            setShowModal(false);
        } catch (error) {
            console.error('Error adding gunny variety:', error);
        }
    };
    // Handle cancel for add and edit modals
    const handleRegionCancel = () => {
        setShowModal(false);
    };
    const handleRegionEditCancel = () => {
        setFormValues({ grade: '', varietyName: '' });
        setSelectedItem(null);
        setShowEditModal(false);
    };
    // Handle edit item
    const handleEdit = (variety, grade) => {
        setSelectedItem({ ...variety, grade });
        setFormValues({ grade: grade, varietyName: variety.varietyName });
        setShowEditModal(true);
    };
    // Handle updating gunny variety
    // const handleRegionUpdate = async () => {
    //     if (!selectedItem) return;
    //     const updatedGunnyVariety = {
    //         grade: formValues.grade,
    //         variety: varietyList.map(v =>
    //             v.id === selectedItem.id
    //                 ? { ...v, varietyName: formValues.varietyName }
    //                 : v
    //         ),
    //         status: true
    //     };
    //     try {
    //         const response = await fetch(`http://localhost:3001/gunnyvariety/${selectedItem.id}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(updatedGunnyVariety)
    //         });
    //         if (!response.ok) throw new Error('Network response was not ok');
    //         await fetchData();
    //         setShowEditModal(false);
    //         alert("hi")
    //     } catch (error) {
    //         console.error('Error updating gunny variety:', error);
    //     }
    // };
    const handleRegionUpdate = () => {
        if (!selectedItem) {
            console.error('No item selected for update');
            return;
        }

        const updatedGunnyVariety = {
            grade: formValues.grade,
            variety: varietyList.map(v =>
                v.id === selectedItem.id
                    ? { ...v, varietyName: formValues.varietyName }
                    : v
            ),
            status: true
        };

        // Simulate updating the state
        const updatedData = gunnyvariety.map(item =>
            item.grade === selectedItem.grade
                ? updatedGunnyVariety
                : item
        );

        setGunnyVariety(updatedData);
        setFilteredData(updatedData);
        handleRegionEditCancel();
    };

    // Populate varietyList for editing
    useEffect(() => {
        if (selectedItem) {
            const currentVariety = gunnyvariety.find(gv => gv.grade === selectedItem.grade);
            setVarietyList(currentVariety ? currentVariety.variety : []);
        }
    }, [selectedItem, gunnyvariety]);
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
                    <Button variant="success" onClick={() => setShowModal(true)} className="ms-2 mx-2">Add Grade Variety</Button>
                </MDBCol>
            </MDBRow>

            <MDBRow className="mt-2 g-0">
                <MDBCol className="ml-auto mt-2 mb-2" md='12'>
                    <MDBTable striped bordered hover responsive>
                        <MDBTableHead>
                            <tr>
                                <th rowSpan="2" className="px-2 fs-6">
                                    Grade
                                    <DropdownButton
                                        variant="link"
                                        id="dropdown-grade"
                                        title={<i className="fas fa-filter"></i>}
                                        className="float-end"
                                    >
                                        <Dropdown.Item onClick={() => handleFilterChange('grade', '')}>All</Dropdown.Item>
                                        {Array.from(new Set(gunnyvariety.map(item => item.grade))).map((value, index) => (
                                            <Dropdown.Item key={index} onClick={() => handleFilterChange('grade', value)}>
                                                {value}
                                            </Dropdown.Item>
                                        ))}
                                    </DropdownButton>
                                </th>
                                <th rowSpan="2" className="px-2 fs-6">
                                    Variety Name
                                    <DropdownButton
                                        variant="link"
                                        id="dropdown-varietyName"
                                        title={<i className="fas fa-filter"></i>}
                                        className="float-end"
                                    >
                                        <Dropdown.Item onClick={() => handleFilterChange('varietyName', '')}>All</Dropdown.Item>
                                        {Array.from(new Set(gunnyvariety.flatMap(item => item.variety.map(v => v.varietyName)))).map((value, index) => (
                                            <Dropdown.Item key={index} onClick={() => handleFilterChange('varietyName', value)}>
                                                {value}
                                            </Dropdown.Item>
                                        ))}
                                    </DropdownButton>
                                </th>
                                <th rowSpan="2" className="px-2 fs-6">Actions</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {currentData.flatMap(item =>
                                item.variety.map(v => {
                                    // Use `item.id` and `v.id` to ensure uniqueness
                                    const key = `${item.id}-${v.id}`;
                                    return (
                                        <tr key={key}>
                                            <td>{item.grade}</td>
                                            <td>{v.varietyName}</td>
                                            <td>
                                                <i className="fas fa-arrow-right-long" onClick={() => handleEdit(v, item.grade)}></i>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </MDBTableBody>


                    </MDBTable>
                </MDBCol>
            </MDBRow>

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

            {/* Add Modal */}
            <Modal show={showModal} onHide={handleRegionCancel} className='modalWidth d-flex align-items-center justify-content-center'>
                <Modal.Header closeButton>
                    <Modal.Title className='fst-italic fw-bold fs-5'>Add Gunny Variety</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MDBInput
                        value={formValues.grade}
                        name='grade'
                        onChange={handleChange}
                        id='grade'
                        label='Grade'
                        className={`form-control mb-4 ${errors.grade ? 'input-invalid' : ''}`}
                    />
                    <MDBInput
                        value={formValues.varietyName}
                        name='varietyName'
                        onChange={handleChange}
                        id='varietyName'
                        label='Variety Name'
                        className={`form-control ${errors.varietyName ? 'input-invalid' : ''}`}
                    />
                    <div className='d-flex align-items-center justify-content-center'>
                        <Button variant="primary" onClick={handleRegionAdd} className='loginBtn'>
                            Add
                        </Button>
                        <Button onClick={handleRegionCancel} variant="default" className='loginBtn btn mb-3 mt-3 mx-2'>
                            Cancel
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={handleRegionEditCancel} className='modalWidth d-flex align-items-center justify-content-center'>
                <Modal.Header closeButton>
                    <Modal.Title className='fst-italic fw-bold fs-5'>Edit Gunny Variety</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MDBInput
                        label='Grade'
                        name='grade'
                        id='grade'
                        value={formValues.grade}
                        onChange={handleChange}
                        className={`form-control mb-4 ${errors.grade ? 'input-invalid' : ''}`}
                    />
                    <MDBInput
                        label='Variety Name'
                        name='varietyName'
                        id='varietyName'
                        value={formValues.varietyName}
                        onChange={handleChange}
                        className={`form-control mb-4 ${errors.varietyName ? 'input-invalid' : ''}`}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleRegionEditCancel}>Cancel</Button>
                    <Button variant="primary" onClick={handleRegionUpdate}>Update</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default GradeVariety;