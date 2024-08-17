import React, { useEffect, useState } from "react";
import { Table, InputGroup, FormControl, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import ReactPaginate from 'react-paginate';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom'; // Add for navigation

const RiceTable = () => {
    const [ricedata, setRiceData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [viewMode, setViewMode] = useState('table'); // State for view mode

    // State for filters
    const [filters, setFilters] = useState({
        date: '',
        truckMemoNo: '',
        variety: '',
        noOfBags: '',
        weightOfRice: '',
        weightOfRiceWithFRK: '',
        weightOfFRK: '',
        adNo: '',
        adDate: '',
        qcMoitureContent: '',
        qcNo: '',
        qcDeHUsted: '',
        qcfrk: '',
        lorryNo: '',
        noOfONBBags: '',
        noOfSSBags: '',
        noOfSWPBags: ''
    });

    const itemsPerPage = 10;
    const navigate = useNavigate(); // Initialize useNavigate

    // Fetch data from server
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3001/riceData');
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

    // Generate PDF
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Date', 'Truck Memo No', 'Variety', 'No Of Bags', 'Weight Of Rice', 'Weight Of Rice With FRK', 'Weight Of FRK', 'AD No', 'AD Date', 'QC Moiture Content', 'QC No', 'QC De HUsted', 'QC FRK', 'Lorry No', 'No Of ONB Bags', 'No Of SS Bags', 'No Of SWP Bags']],
            body: filteredData.map(item => [
                item.date || '',
                item.truckMemoNo || '',
                item.variety || '',
                item.noOfBags || '',
                item.weightOfRice || '',
                item.weightOfRiceWithFRK || '',
                item.weightOfFRK || '',
                item.adNo || '',
                item.adDate || '',
                item.qcMoitureContent || '',
                item.qcNo || '',
                item.qcDeHUsted || '',
                item.qcfrk || '',
                item.lorryNo || '',
                item.noOfONBBags || '',
                item.noOfSSBags || '',
                item.noOfSWPBags || ''
            ]),
        });
        doc.save('data.pdf');
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

    // Switch view mode
    const toggleViewMode = (mode) => {
        setViewMode(mode);
    };

    // Navigate to add data form
    const handleAddDataClick = () => {
        navigate('/add-data'); // Replace with the actual route for adding data
    };

    return (
        <div className="mt-4 container-fluid p-4">
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
                <Button variant="primary" onClick={generatePDF}>Download PDF</Button>
                <Button variant="success" onClick={handleAddDataClick} className="ms-2 mx-2">Add Data</Button>
                    <Button variant="info" onClick={() => toggleViewMode('table')}>Table View</Button>
                    <Button variant="info" onClick={() => toggleViewMode('grid')} className="ms-2">Grid View</Button>
                </MDBCol>
            </MDBRow>

            {viewMode === 'table' ? (
                <MDBRow className="mt-2 g-0">
                    <MDBCol className="ml-auto mt-2 mb-2" md='12'>
                        <MDBTable striped bordered hover responsive>
                            <MDBTableHead>
                                <tr>
                                    {Object.keys(filters).map((key) => (
                                        <th key={key} className="px-2 fs-6">
                                            {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                                            <DropdownButton
                                                variant="link"
                                                id={`dropdown-${key}`}
                                                title={<i className="fas fa-filter"></i>} // Filter icon
                                                className="float-end"
                                            >
                                                <Dropdown.Item onClick={() => handleFilterChange(key, '')}>All</Dropdown.Item>
                                                {Array.from(new Set(ricedata.map(item => item[key]))).map((value, index) => (
                                                    <Dropdown.Item key={index} onClick={() => handleFilterChange(key, value)}>
                                                        {value}
                                                    </Dropdown.Item>
                                                ))}
                                            </DropdownButton>
                                        </th>
                                    ))}
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {currentData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.date || ''}</td>
                                        <td>{item.truckMemoNo || ''}</td>
                                        <td>{item.variety || ''}</td>
                                        <td>{item.noOfBags || ''}</td>
                                        <td>{item.weightOfRice || ''}</td>
                                        <td>{item.weightOfRiceWithFRK || ''}</td>
                                        <td>{item.weightOfFRK || ''}</td>
                                        <td>{item.adNo || ''}</td>
                                        <td>{item.adDate || ''}</td>
                                        <td>{item.qcMoitureContent || ''}</td>
                                        <td>{item.qcNo || ''}</td>
                                        <td>{item.qcDeHUsted || ''}</td>
                                        <td>{item.qcfrk || ''}</td>
                                        <td>{item.lorryNo || ''}</td>
                                        <td>{item.noOfONBBags || ''}</td>
                                        <td>{item.noOfSSBags || ''}</td>
                                        <td>{item.noOfSWPBags || ''}</td>
                                    </tr>
                                ))}
                            </MDBTableBody>
                        </MDBTable>
                    </MDBCol>
                </MDBRow>
            ) : (
                <MDBRow className="mt-2 g-0">
                    {currentData.map((item, index) => (
                        <MDBCol md="4" key={index} className="mb-3">
                            <MDBCard>
                                <MDBCardBody>
                                    <h5>Date: {item.date || ''}</h5>
                                    <p>Truck Memo No: {item.truckMemoNo || ''}</p>
                                    <p>Variety: {item.variety || ''}</p>
                                    <p>No Of Bags: {item.noOfBags || ''}</p>
                                    <p>Weight Of Rice: {item.weightOfRice || ''}</p>
                                    <p>Weight Of Rice With FRK: {item.weightOfRiceWithFRK || ''}</p>
                                    <p>Weight Of FRK: {item.weightOfFRK || ''}</p>
                                    <p>AD No: {item.adNo || ''}</p>
                                    <p>AD Date: {item.adDate || ''}</p>
                                    <p>QC Moiture Content: {item.qcMoitureContent || ''}</p>
                                    <p>QC No: {item.qcNo || ''}</p>
                                    <p>QC De HUsted: {item.qcDeHUsted || ''}</p>
                                    <p>QC FRK: {item.qcfrk || ''}</p>
                                    <p>Lorry No: {item.lorryNo || ''}</p>
                                    <p>No Of ONB Bags: {item.noOfONBBags || ''}</p>
                                    <p>No Of SS Bags: {item.noOfSSBags || ''}</p>
                                    <p>No Of SWP Bags: {item.noOfSWPBags || ''}</p>
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
        </div>
    );
};

export default RiceTable;