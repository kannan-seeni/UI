import React, { useEffect, useState } from "react";
import { Table, InputGroup, FormControl, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import ReactPaginate from 'react-paginate';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom'; // Add for navigation
// import './rice.css';
const PaddyTable = ({data}) => {
    const [paddydata, setPaddyData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [viewMode, setViewMode] = useState('table'); // State for view mode

    // State for filters
    const [filters, setFilters] = useState({
        date: '',
        kms: '',
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

    const itemsPerPage = 30;
    const navigate = useNavigate(); // Initialize useNavigate
    // Fetch data from server
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3001/paddyData');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setPaddyData(data);
            //setFilters(data);
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
        const filtered = paddydata.filter(item =>
            Object.keys(filters).every(key =>
                !filters[key] || item[key] === filters[key]
            ) &&
            (searchTerm ? Object.values(item).some(val =>
                (val !== null && val !== undefined && val.toString().toLowerCase().includes(searchTerm.toLowerCase()))
            ) : true)
        );
        setFilteredData(filtered);
        setCurrentPage(0); // Reset to first page on search or filter
    }, [searchTerm, filters, paddydata]);

    // Generate PDF
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [["Date", "KMS", "Godwon", "Issue Memo No.", "Variety", "% MC", "Bags", "Weight", "Lorry No", "NB", "ONB", "SS", "SWP"]],
            body: filteredData.map(item => [
                item.date || '',
                item.kms || '',
                item.godwon || '',
                item.issueMemoNo || '',
                item.variety || '',
                item.moitureContent || '',
                item.noOfBags || '',
                item.weight || '',
                item.lorryNo || '',
                item.noOfNBBags || '',
                item.noOfONBBags || '',
                item.noOfSSBags || '',
                item.noOfSWPBags || ''
            ]),
        });
        doc.save('paddyTable.pdf');
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
    const handleAddRiceClick = () => {
        navigate('/paddy'); // Replace with the actual route for adding data
    };
    const handleEdit = (id) => {
        //alert(navigate(`/riceEdit/${id}`))
        navigate(`/paddyEdit/${id}`);
    }
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
                    <Button variant="success" onClick={handleAddRiceClick} className="ms-2 mx-2">Add Paddy</Button>
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
                                        Date
                                        <DropdownButton
                                            variant="link"
                                            id="dropdown-date"
                                            title={<i className="fas fa-filter"></i>}
                                            className="float-end"
                                        >
                                            <Dropdown.Item onClick={() => handleFilterChange('date', '')}>All</Dropdown.Item>
                                            {Array.from(new Set(paddydata.map(item => item.date))).map((value, index) => (
                                                <Dropdown.Item key={index} onClick={() => handleFilterChange('date', value)}>
                                                    {value}
                                                </Dropdown.Item>
                                            ))}
                                        </DropdownButton>
                                    </th>
                                    <th rowSpan="2" className="px-2 fs-6">
                                        KMS
                                        <DropdownButton
                                            variant="link"
                                            id="dropdown-kms"
                                            title={<i className="fas fa-filter"></i>}
                                            className="float-end"
                                        >
                                            <Dropdown.Item onClick={() => handleFilterChange('kms', '')}>All</Dropdown.Item>
                                            {Array.from(new Set(paddydata.map(item => item.kms))).map((value, index) => (
                                                <Dropdown.Item key={index} onClick={() => handleFilterChange('kms', value)}>
                                                    {value}
                                                </Dropdown.Item>
                                            ))}
                                        </DropdownButton>
                                    </th>
                                    <th rowSpan="2" className="px-2 fs-6">
                                         Godwon
                                        <DropdownButton
                                            variant="link"
                                            id="dropdown-godwon"
                                            title={<i className="fas fa-filter"></i>}
                                            className="float-end"
                                        >
                                            <Dropdown.Item onClick={() => handleFilterChange('godwon', '')}>All</Dropdown.Item>
                                            {Array.from(new Set(paddydata.map(item => item.godwon))).map((value, index) => (
                                                <Dropdown.Item key={index} onClick={() => handleFilterChange('godwon', value)}>
                                                    {value}
                                                </Dropdown.Item>
                                            ))}
                                        </DropdownButton>
                                    </th>
                                    <th rowSpan="2" className="px-2 fs-6">
                                         Issue Memo No
                                        <DropdownButton
                                            variant="link"
                                            id="dropdown-issueMemoNo"
                                            title={<i className="fas fa-filter"></i>}
                                            className="float-end"
                                        >
                                            <Dropdown.Item onClick={() => handleFilterChange('issueMemoNo', '')}>All</Dropdown.Item>
                                            {Array.from(new Set(paddydata.map(item => item.issueMemoNo))).map((value, index) => (
                                                <Dropdown.Item key={index} onClick={() => handleFilterChange('issueMemoNo', value)}>
                                                    {value}
                                                </Dropdown.Item>
                                            ))}
                                        </DropdownButton>
                                    </th>
                                    <th rowSpan="2" className="px-2 fs-6">
                                        Variety
                                        <DropdownButton
                                            variant="link"
                                            id="dropdown-variety"
                                            title={<i className="fas fa-filter"></i>}
                                            className="float-end"
                                        >
                                            <Dropdown.Item onClick={() => handleFilterChange('variety', '')}>All</Dropdown.Item>
                                            {Array.from(new Set(paddydata.map(item => item.variety))).map((value, index) => (
                                                <Dropdown.Item key={index} onClick={() => handleFilterChange('variety', value)}>
                                                    {value}
                                                </Dropdown.Item>
                                            ))}
                                        </DropdownButton>
                                    </th>
                                    <th rowSpan="2" className="px-2 fs-6">
                                     % MC
                                        <DropdownButton
                                            variant="link"
                                            id="dropdown-moitureContent"
                                            title={<i className="fas fa-filter"></i>}
                                            className="float-end"
                                        >
                                            <Dropdown.Item onClick={() => handleFilterChange('moitureContent', '')}>All</Dropdown.Item>
                                            {Array.from(new Set(paddydata.map(item => item.moitureContent))).map((value, index) => (
                                                <Dropdown.Item key={index} onClick={() => handleFilterChange('moitureContent', value)}>
                                                    {value}
                                                </Dropdown.Item>
                                            ))}
                                        </DropdownButton>
                                    </th>
                                    <th colSpan="2" className="gunnyColor text-center p-0">
                                        <div className="d-flex align-items-center justify-content-center">
                                            Qty Nett
                                        </div>
                                    </th>
                                    <th rowSpan="2" className="px-2 fs-6">
                                        Lorry No
                                        <DropdownButton
                                            variant="link"
                                            id="dropdown-lorryNo"
                                            title={<i className="fas fa-filter"></i>}
                                            className="float-end"
                                        >
                                            <Dropdown.Item onClick={() => handleFilterChange('lorryNo', '')}>All</Dropdown.Item>
                                            {Array.from(new Set(paddydata.map(item => item.lorryNo))).map((value, index) => (
                                                <Dropdown.Item key={index} onClick={() => handleFilterChange('lorryNo', value)}>
                                                    {value}
                                                </Dropdown.Item>
                                            ))}
                                        </DropdownButton>
                                    </th>
                                    <th colSpan="4" className="gunnyColor text-center p-0">
                                        <div className="d-flex align-items-center text-center justify-content-center">
                                            Gunny Condition
                                        </div>
                                    </th>
                                </tr>
                                <tr>
                                    <th className="qtyColorSub px-2 fs-6">
                                        Bags
                                        <DropdownButton
                                            variant="link"
                                            id="dropdown-noOfBags"
                                            title={<i className="fas fa-filter"></i>}
                                            className="float-end"
                                        >
                                            <Dropdown.Item onClick={() => handleFilterChange('noOfBags', '')}>All</Dropdown.Item>
                                            {Array.from(new Set(paddydata.map(item => item.noOfBags))).map((value, index) => (
                                                <Dropdown.Item key={index} onClick={() => handleFilterChange('noOfBags', value)}>
                                                    {value}
                                                </Dropdown.Item>
                                            ))}
                                        </DropdownButton>
                                    </th>
                                   
                                    <th className="qtyColorSub px-2 fs-6">
                                        Weight
                                        <DropdownButton
                                            variant="link"
                                            id="dropdown-weight"
                                            title={<i className="fas fa-filter"></i>}
                                            className="float-end"
                                        >
                                            <Dropdown.Item onClick={() => handleFilterChange('weight', '')}>All</Dropdown.Item>
                                            {Array.from(new Set(paddydata.map(item => item.weight))).map((value, index) => (
                                                <Dropdown.Item key={index} onClick={() => handleFilterChange('weight', value)}>
                                                    {value}
                                                </Dropdown.Item>
                                            ))}
                                        </DropdownButton>
                                    </th>
                                    <th className="gunnyColorSub px-2 fs-6">
                                    NB
                                        <DropdownButton
                                            variant="link"
                                            id="dropdown-noOfNBBags"
                                            title={<i className="fas fa-filter"></i>}
                                            className="float-end"
                                        >
                                            <Dropdown.Item onClick={() => handleFilterChange('noOfNBBags', '')}>All</Dropdown.Item>
                                            {Array.from(new Set(paddydata.map(item => item.noOfNBBags))).map((value, index) => (
                                                <Dropdown.Item key={index} onClick={() => handleFilterChange('noOfNBBags', value)}>
                                                    {value}
                                                </Dropdown.Item>
                                            ))}
                                        </DropdownButton>
                                    </th>
                                    <th className="gunnyColorSub px-2 fs-6">
                                        ONB
                                        <DropdownButton
                                            variant="link"
                                            id="dropdown-noOfONBBags"
                                            title={<i className="fas fa-filter"></i>}
                                            className="float-end"
                                        >
                                            <Dropdown.Item onClick={() => handleFilterChange('noOfONBBags', '')}>All</Dropdown.Item>
                                            {Array.from(new Set(paddydata.map(item => item.noOfONBBags))).map((value, index) => (
                                                <Dropdown.Item key={index} onClick={() => handleFilterChange('noOfONBBags', value)}>
                                                    {value}
                                                </Dropdown.Item>
                                            ))}
                                        </DropdownButton>
                                    </th>
                                    <th className="gunnyColorSub px-2 fs-6">
                                        SS
                                        <DropdownButton
                                            variant="link"
                                            id="dropdown-noOfSSBags"
                                            title={<i className="fas fa-filter"></i>}
                                            className="float-end"
                                        >
                                            <Dropdown.Item onClick={() => handleFilterChange('noOfSSBags', '')}>All</Dropdown.Item>
                                            {Array.from(new Set(paddydata.map(item => item.noOfSSBags))).map((value, index) => (
                                                <Dropdown.Item key={index} onClick={() => handleFilterChange('noOfSSBags', value)}>
                                                    {value}
                                                </Dropdown.Item>
                                            ))}
                                        </DropdownButton>
                                    </th>
                                    <th className="gunnyColorSub px-2 fs-6">
                                        SWP
                                        <DropdownButton
                                            variant="link"
                                            id="dropdown-noOfSWPBags"
                                            title={<i className="fas fa-filter"></i>}
                                            className="float-end"
                                        >
                                            <Dropdown.Item onClick={() => handleFilterChange('noOfSWPBags', '')}>All</Dropdown.Item>
                                            {Array.from(new Set(paddydata.map(item => item.noOfSWPBags))).map((value, index) => (
                                                <Dropdown.Item key={index} onClick={() => handleFilterChange('noOfSWPBags', value)}>
                                                    {value}
                                                </Dropdown.Item>
                                            ))}
                                        </DropdownButton>
                                    </th>
                                    <th className="px-2 fs-6">Actions</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {currentData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.date ? new Date(item.date).toLocaleDateString() : ''}</td>
                                        <td>{item.kms}</td>
                                        {/* <td>{item.region}</td> */}
                                        <td>{item.godwon}</td>
                                        <td>{item.issueMemoNo}</td>
                                        <td>{item.variety}</td>
                                        <td>{item.moitureContent}</td>
                                        <td>{item.noOfBags}</td>
                                        <td>{item.weight}</td>
                                        <td>{item.lorryNo}</td>
                                        <td>{item.noOfNBBags}</td>
                                        <td>{item.noOfONBBags}</td>
                                        <td>{item.noOfSSBags}</td>
                                        <td>{item.noOfSWPBags}</td>
                                        <td>
                                            <i className="fas fa-arrow-right-long" onClick={() => handleEdit(item.id)}></i>
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
                                    <p className='card-text mb-0'><span className='fst-italic fw-bold fs-6'>Date</span> : {item.date ? new Date(item.date).toLocaleDateString() : ''}</p>
                                    <p className='card-text mb-0'><span className='fst-italic fw-bold fs-6'>KMS</span> : {item.kms}</p>
                                    <p className='card-text mb-0'><span className='fst-italic fw-bold fs-6'>Godwon</span> : {item.godwon}</p>
                                    {/* <p className='card-text mb-0'><span className='fst-italic fw-bold fs-6'>Region</span> : {item.region}</p> */}
                                    <p className='card-text mb-0'><span className='fst-italic fw-bold fs-6'>Variety</span> : {item.variety}</p>
                                    <p className='card-text mb-0'><span className='fst-italic fw-bold fs-6'>% MC</span> : {item.moitureContent}</p>
                                    <p className='card-text mb-0'><span className='fst-italic fw-bold fs-6'>Qty Nett</span> - Bags: {item.noOfBags}, Weight: {item.weight}</p>
                                    <p className='card-text mb-0'><span className='fst-italic fw-bold fs-6'>Gunny Condition</span> - NB: {item.noOfNBBags}, ONB: {item.noOfONBBags}, SS: {item.noOfSSBags}, SWP: {item.noOfSWPBags}</p>
                                    <p className='card-text mb-0'><span className='fst-italic fw-bold fs-6'>Lorry No</span> : {item.lorryNo}</p>
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

export default PaddyTable;