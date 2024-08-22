import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, MDBInput } from 'mdb-react-ui-kit';
import { Button, DropdownButton, Dropdown, Modal,InputGroup, FormControl, } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';

const RegionTable = () => {
    const [filters, setFilters] = useState({
        region: '',
        frk: ''
    });
    const [ricedata, setRiceData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [formValues, setFormValues] = useState({ region: '', frk: '' });
    const [errors, setErrors] = useState({});
    const itemsPerPage = 20;
    const navigate = useNavigate();

    const handleAddRClick = () => {
        setShowModal(true);
    };

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3001/addRegion');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setRiceData(data);
            setFilteredData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (field, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [field]: value
        }));
    };

    useEffect(() => {
        const filtered = ricedata.filter(item =>
            Object.keys(filters).every(key =>
                !filters[key] || item[key] === filters[key]
            ) &&
            (searchTerm ? Object.values(item).some(val =>
                (val !== null && val !== undefined && val.toString().toLowerCase().includes(searchTerm.toLowerCase()))
            ) : true)
        );
        setFilteredData(filtered);
        setCurrentPage(0); // Reset to first page on search or filter
    }, [searchTerm, filters, ricedata]);

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

    const validateForm = () => {
        const newErrors = {};
        if (!formValues.region.trim()) newErrors.region = 'Region is required';
        if (!formValues.frk.trim()) newErrors.frk = 'FRK is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegionAdd = async () => {
        if (!validateForm()) return;

        try {
            const response = await fetch('http://localhost:3001/addRegion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValues)
            });
            if (!response.ok) throw new Error('Network response was not ok');
            
            await fetchData();
            setFormValues({ region: '', frk: '' });
            setShowModal(false);
        } catch (error) {
            console.error('Error adding region:', error);
        }
    };

    return (
        <MDBContainer fluid className='p-0 mt-5'>
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
                    <Button variant="success" onClick={handleAddRClick} className="ms-2 mx-2">Add Region</Button>
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol className="ml-auto mt-2 mb-2" md='12'>
                    <MDBTable striped bordered hover responsive>
                        <MDBTableHead>
                            <tr>
                                <th className="px-2 fs-6">
                                    Region
                                    <DropdownButton
                                        variant="link"
                                        id="dropdown-region"
                                        title={<i className="fas fa-filter"></i>}
                                        className="float-end"
                                    >
                                        <Dropdown.Item onClick={() => handleFilterChange('region', '')}>All</Dropdown.Item>
                                        {Array.from(new Set(ricedata.map(item => item.region))).map((value, index) => (
                                            <Dropdown.Item key={index} onClick={() => handleFilterChange('region', value)}>
                                                {value}
                                            </Dropdown.Item>
                                        ))}
                                    </DropdownButton>
                                </th>
                                <th className="px-2 fs-6">
                                    FRK%
                                    <DropdownButton
                                        variant="link"
                                        id="dropdown-frk"
                                        title={<i className="fas fa-filter"></i>}
                                        className="float-end"
                                    >
                                        <Dropdown.Item onClick={() => handleFilterChange('frk', '')}>All</Dropdown.Item>
                                        {Array.from(new Set(ricedata.map(item => item.frk))).map((value, index) => (
                                            <Dropdown.Item key={index} onClick={() => handleFilterChange('frk', value)}>
                                                {value}
                                            </Dropdown.Item>
                                        ))}
                                    </DropdownButton>
                                </th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {currentData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.region || ''}</td>
                                    <td>{item.frk || ''}</td>
                                </tr>
                            ))}
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
            {/* Add Region Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Region</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MDBInput
                        value={formValues.region}
                        name='region'
                        onChange={handleChange}
                        id='region'
                        label='Region'
                        className={`form-control ${errors.region ? 'input-invalid' : ''}`}
                    />
                    <MDBInput
                        value={formValues.frk}
                        name='frk'
                        onChange={handleChange}
                        id='frk'
                        label='FRK%'
                        className={`form-control ${errors.frk ? 'input-invalid' : ''}`}
                    />
                    <Button variant="primary" onClick={handleRegionAdd}>
                        Add
                    </Button>
                </Modal.Body>
            </Modal>
        </MDBContainer>
    );
};

export default RegionTable;