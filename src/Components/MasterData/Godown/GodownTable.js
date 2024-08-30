import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, MDBInput } from 'mdb-react-ui-kit';
import { Button, DropdownButton, Dropdown, Modal, InputGroup, FormControl, } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';

const GodownTable = ({data}) => {
    const [filters, setFilters] = useState({
        region: "",
        godownId: "",
        godownName: "",
        emailId: "",
        mobileNo: "",
        aqName: "",
        superintendent: "",
        // distance: "",
        address: ""
    });
    const [godwonData, setGodwonData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 20;
    const navigate = useNavigate();

    const handleAddGodown = () => {
        navigate('/masterdatagodowninput');
    };

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3001/godwonData');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            console.log('data',data)
            setGodwonData(data);
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
        const filtered = godwonData.filter(item =>
            Object.keys(filters).every(key =>
                !filters[key] || item[key] === filters[key]
            ) &&
            (searchTerm ? Object.values(item).some(val =>
                (val !== null && val !== undefined && val.toString().toLowerCase().includes(searchTerm.toLowerCase()))
            ) : true)
        );
        setFilteredData(filtered);
        setCurrentPage(0); // Reset to first page on search or filter
    }, [searchTerm, filters, godwonData]);

    const pageCount = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const currentData = filteredData.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );
    const handleEdit = (id) => {
       navigate(`/masterdatagodownEdit/${id}`);
    }
    return (
        <MDBContainer fluid className='mt-5 p-4'>
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
                    <Button variant="success" onClick={handleAddGodown} className="ms-2 mx-2">Add new Godown</Button>
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol className="ml-auto mt-2 mb-2" md='12'>
                    <MDBTable striped bordered hover responsive>
                        <MDBTableHead>
                            <tr>
                                <th className="px-2 fs-6">
                                    Godown Id
                                    <DropdownButton
                                        variant="link"
                                        id="dropdown-godownId"
                                        title={<i className="fas fa-filter"></i>}
                                        className="float-end"
                                    >
                                        <Dropdown.Item onClick={() => handleFilterChange('godownId', '')}>All</Dropdown.Item>
                                        {Array.from(new Set(godwonData.map(item => item.godownId))).map((value, index) => (
                                            <Dropdown.Item key={index} onClick={() => handleFilterChange('godownId', value)}>
                                                {value}
                                            </Dropdown.Item>
                                        ))}
                                    </DropdownButton>
                                </th>
                                <th className="px-2 fs-6">
                                    Region
                                    <DropdownButton
                                        variant="link"
                                        id="dropdown-region"
                                        title={<i className="fas fa-filter"></i>}
                                        className="float-end"
                                    >
                                        <Dropdown.Item onClick={() => handleFilterChange('region', '')}>All</Dropdown.Item>
                                        {Array.from(new Set(godwonData.map(item => item.region))).map((value, index) => (
                                            <Dropdown.Item key={index} onClick={() => handleFilterChange('region', value)}>
                                                {value}
                                            </Dropdown.Item>
                                        ))}
                                    </DropdownButton>
                                </th>
                                <th className="px-2 fs-6">
                                    Godown Name
                                    <DropdownButton
                                        variant="link"
                                        id="dropdown-godownName"
                                        title={<i className="fas fa-filter"></i>}
                                        className="float-end"
                                    >
                                        <Dropdown.Item onClick={() => handleFilterChange('godownName', '')}>All</Dropdown.Item>
                                        {Array.from(new Set(godwonData.map(item => item.godownName))).map((value, index) => (
                                            <Dropdown.Item key={index} onClick={() => handleFilterChange('godownName', value)}>
                                                {value}
                                            </Dropdown.Item>
                                        ))}
                                    </DropdownButton>
                                </th>
                                <th className="px-2 fs-6">
                                    Email Id
                                    <DropdownButton
                                        variant="link"
                                        id="dropdown-emailId"
                                        title={<i className="fas fa-filter"></i>}
                                        className="float-end"
                                    >
                                        <Dropdown.Item onClick={() => handleFilterChange('emailId', '')}>All</Dropdown.Item>
                                        {Array.from(new Set(godwonData.map(item => item.emailId))).map((value, index) => (
                                            <Dropdown.Item key={index} onClick={() => handleFilterChange('emailId', value)}>
                                                {value}
                                            </Dropdown.Item>
                                        ))}
                                    </DropdownButton>
                                </th>
                                {/* <th className="px-2 fs-6">
                                    Distance
                                    <DropdownButton
                                        variant="link"
                                        id="dropdown-distance"
                                        title={<i className="fas fa-filter"></i>}
                                        className="float-end"
                                    >
                                        <Dropdown.Item onClick={() => handleFilterChange('distance', '')}>All</Dropdown.Item>
                                        {Array.from(new Set(godwonData.map(item => item.distance))).map((value, index) => (
                                            <Dropdown.Item key={index} onClick={() => handleFilterChange('distance', value)}>
                                                {value}
                                            </Dropdown.Item>
                                        ))}
                                    </DropdownButton>
                                </th> */}
                                <th className="px-2 fs-6">Actions</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {currentData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.godownId || ''}</td>
                                    <td>{item.region || ''}</td>
                                    <td>{item.godownName || ''}</td>
                                    <td>{item.emailId || ''}</td>
                                    {/* <td>{item.distance || ''}</td> */}
                                    <td>
                                        <i className="fas fa-arrow-right-long" onClick={() => handleEdit(item.id)}></i>
                                    </td>
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
        </MDBContainer>
    );
};

export default GodownTable;