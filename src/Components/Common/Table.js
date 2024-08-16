import React, { useState,useEffect } from 'react';
import './common.css';
import { MDBTable, MDBTableHead, MDBTableBody, MDBContainer, MDBRow, MDBCol, MDBInput, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdb-react-ui-kit';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useNavigate } from 'react-router-dom';
const exportToPDF = (data) => {
    const doc = new jsPDF();
    autoTable(doc, {
        head: [
            ["Date", "KMS", "Region", "Godwon", "Issue Memo No.", "Variety", "% MC", "Bags", "Weight", "Lorry No", "NB", "ONB", "SS", "SWP"]
        ],
        body: data.map(item => [
            item.date ? new Date(item.date).toLocaleDateString() : '',
            item.kms,
            item.region,
            item.godwon,
            item.issueMemoNo,
            item.variety,
            item.moitureContent,
            item.noOfBags,
            item.weight,
            item.lorryNo,
            item.noOfNBBags,
            item.noOfONBBags,
            item.noOfSSBags,
            item.noOfSWPBags
        ])
    });
    doc.save("data.pdf");
};
// Grid View Component
const GridView = ({ items }) => (
    <MDBRow>
        {items.map((item, index) => (
            <MDBCol key={index} md='3' className='mb-3 mt-2'>
                <div className='card'>
                    <div className='card-body'>
                        <h5 className='card-title'>{item.issueMemoNo}</h5>
                        <p className='card-text mb-0'><span className='fst-italic fw-bold fs-6'>Date</span> : {item.date ? new Date(item.date).toLocaleDateString() : ''}</p>
                        <p className='card-text mb-0'><span className='fst-italic fw-bold fs-6'>KMS</span> : {item.kms}</p>
                        <p className='card-text mb-0'><span className='fst-italic fw-bold fs-6'>Godwon</span> : {item.godwon}</p>
                        <p className='card-text mb-0'><span className='fst-italic fw-bold fs-6'>Region</span> : {item.region}</p>
                        <p className='card-text mb-0'><span className='fst-italic fw-bold fs-6'>Variety</span> : {item.variety}</p>
                        <p className='card-text mb-0'><span className='fst-italic fw-bold fs-6'>% MC</span> : {item.moitureContent}</p>
                        <p className='card-text mb-0'><span className='fst-italic fw-bold fs-6'>Qty Nett</span> - Bags: {item.noOfBags}, Weight: {item.weight}</p>
                        <p className='card-text mb-0'><span className='fst-italic fw-bold fs-6'>Gunny Condition</span> - NB: {item.noOfNBBags}, ONB: {item.noOfONBBags}, SS: {item.noOfSSBags}, SWP: {item.noOfSWPBags}</p>
                        <p className='card-text mb-0'><span className='fst-italic fw-bold fs-6'>Lorry No</span> : {item.lorryNo}</p>
                    </div>
                </div>
            </MDBCol>
        ))}
    </MDBRow>
);

const TableComponent = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        date: '',
        kms: '',
        godwon: '',
        region:'',
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
    const [dropdownOpen, setDropdownOpen] = useState('');
    const [currentFilterColumn, setCurrentFilterColumn] = useState('');
    const [filteredData, setFilteredData] = useState(data); 
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3001/paddyData');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setFilteredData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData(); // Fetch data when component mounts
    }, []);

    useEffect(() => {
        applyFilters(); // Reapply filters when data or filters change
    }, [data, filters, searchQuery]);
    // Filter data based on search and filters
    const applyFilters = () => {
    const filtered = data.filter(item => {
        return (
            (!searchQuery || Object.values(item).some(val => val.toString().toLowerCase().includes(searchQuery))) &&
            (!filters.date || item.date === filters.date) &&
            (!filters.kms || item.kms === filters.kms) &&
            (!filters.godwon || item.godwon === filters.godwon) &&
            (!filters.region || item.region === filters.region) &&
            (!filters.issueMemoNo || item.issueMemoNo === filters.issueMemoNo) &&
            (!filters.variety || item.variety === filters.variety) &&
            (!filters.moitureContent || item.moitureContent === filters.moitureContent) &&
            (!filters.noOfBags || item.noOfBags === filters.noOfBags) &&
            (!filters.weight || item.weight === filters.weight) &&
            (!filters.lorryNo || item.lorryNo === filters.lorryNo) &&
            (!filters.noOfNBBags || item.noOfNBBags === filters.noOfNBBags) &&
            (!filters.noOfONBBags || item.noOfONBBags === filters.noOfONBBags) &&
            (!filters.noOfSSBags || item.noOfSSBags === filters.noOfSSBags) &&
            (!filters.noOfSWPBags || item.noOfSWPBags === filters.noOfSWPBags)
        );
    });
    setFilteredData(filtered);
};
    const itemsPerPage = 30;
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle search
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
        setCurrentPage(1); // Reset to first page
    };

    // Handle filter change
    const handleFilterChange = (column, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [column]: value
        }));
        setCurrentPage(1); // Reset to first page
    };

    // Handle filter selection from dropdown
    const handleFilterSelect = (value) => {
        if (currentFilterColumn && value !== undefined) {
            handleFilterChange(currentFilterColumn, value);
        }
        //setFilters(currentFilterColumn[value]); 
        toggleDropdown('');
    };

    // Handle dropdown toggle
    const toggleDropdown = (column) => {
        setDropdownOpen(prev => prev === column ? '' : column);
        setCurrentFilterColumn(column);
    };

    // Clear filter for a column
    const clearFilter = () => {
        handleFilterChange(currentFilterColumn, '');
        toggleDropdown('');
    };

    // Get unique values for dropdown options
    const getUniqueValues = (column) => {
        const values = new Set(data.map(item => item[column]).filter(Boolean));
        return Array.from(values);
    };
    const handleExportToPDF = () => {
        exportToPDF(currentItems);
    }
    const handleAddData = () => {
        navigate("/paddy");
    }
    const [editIndex, setEditIndex] = useState(null);
    const handleEdit = (id) =>{
        alert(id)
        // setEditIndex(index);
        // setFilters(data[index]); 
        navigate(`/edit/${id}`);
    }
    const handleDelete = async (id) => {
        // Send a delete request to the server
        try {
            const response = await fetch(`http://localhost:3001/paddyData/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Network response was not ok');

            // Update the state to remove the deleted item
            setFilteredData(prevData => prevData.filter(item => item.id !== id));
            applyFilters();
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };
    return (
        <div className='container-fluid p-4'>
            <MDBRow>
                <MDBCol md='6' className='my-3'>
                    <MDBInput label='Search' onChange={handleSearchChange} />
                </MDBCol>
                <MDBCol md='6' className='my-3'>
                    <button onClick={() => setViewMode('table')} className={`btn btn-${viewMode === 'table' ? 'primary' : 'secondary'} mx-2 `}>Table View</button>
                    <button onClick={() => setViewMode('grid')} className={`btn btn-${viewMode === 'grid' ? 'primary' : 'secondary'}`}>Grid View</button>
                    <button onClick={handleExportToPDF} className="btn btn-light mx-2 btn-outline-primary">
                        <i className="fas fa-file-pdf"></i> Export to PDF
                    </button>
                    <button className="btn btn-success mx-2" onClick={handleAddData}>
                        Add Data
                    </button>
                </MDBCol>
            </MDBRow>
            {viewMode === 'table' ? (
                <>
                    <MDBRow className="mt-2 g-0">
                        <MDBCol className="ml-auto mt-2 mb-2" md='12'>
                            <MDBTable  responsive className='table table-striped table-bordered table-hover table-sm'>
                                <MDBTableHead>
                                    <tr>
                                        <th rowSpan="2" className='p-0'>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <span>Date</span>
                                                <MDBDropdown>
                                                    <MDBDropdownToggle tag='a' className='btn  ms-2 p-0'>
                                                        <i className="fas fa-filter"></i>
                                                    </MDBDropdownToggle>
                                                    <MDBDropdownMenu>
                                                        <MDBDropdownItem onClick={() => clearFilter()}>
                                                            Clear Filter
                                                        </MDBDropdownItem>
                                                        {getUniqueValues('date').map((value, index) => (
                                                            <MDBDropdownItem key={index} onClick={() => handleFilterSelect(value)}>
                                                                {value}
                                                            </MDBDropdownItem>
                                                        ))}
                                                    </MDBDropdownMenu>
                                                </MDBDropdown>
                                            </div>
                                        </th>
                                        <th rowSpan="2" className='p-0'>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <span>KMS</span>
                                                <MDBDropdown>
                                                    <MDBDropdownToggle tag='a' className='btn ms-2 p-0'>
                                                        <i className="fas fa-filter"></i>
                                                    </MDBDropdownToggle>
                                                    <MDBDropdownMenu>
                                                        <MDBDropdownItem onClick={clearFilter}>
                                                            Clear Filter
                                                        </MDBDropdownItem>
                                                        {getUniqueValues('kms').map((value, index) => (
                                                            <MDBDropdownItem key={index} onClick={() => handleFilterSelect(value)}>
                                                                {value}
                                                            </MDBDropdownItem>
                                                        ))}
                                                    </MDBDropdownMenu>
                                                </MDBDropdown>
                                            </div>
                                        </th>
                                        <th rowSpan="2" className='p-0'>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <span>Region</span>
                                                <MDBDropdown>
                                                    <MDBDropdownToggle tag='a' className='btn p-0 ms-2'>
                                                        <i className="fas fa-filter"></i>
                                                    </MDBDropdownToggle>
                                                    <MDBDropdownMenu>
                                                        <MDBDropdownItem onClick={clearFilter}>
                                                            Clear Filter
                                                        </MDBDropdownItem>
                                                        {getUniqueValues('region').map((value, index) => (
                                                            <MDBDropdownItem key={index} onClick={() => handleFilterSelect(value)}>
                                                                {value}
                                                            </MDBDropdownItem>
                                                        ))}
                                                    </MDBDropdownMenu>
                                                </MDBDropdown>
                                            </div>
                                        </th>
                                        <th rowSpan="2" className='p-0'>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <span>Godwon</span>
                                                <MDBDropdown>
                                                    <MDBDropdownToggle tag='a' className='btn p-0 ms-2'>
                                                        <i className="fas fa-filter"></i>
                                                    </MDBDropdownToggle>
                                                    <MDBDropdownMenu>
                                                        <MDBDropdownItem onClick={clearFilter}>
                                                            Clear Filter
                                                        </MDBDropdownItem>
                                                        {getUniqueValues('godwon').map((value, index) => (
                                                            <MDBDropdownItem key={index} onClick={() => handleFilterSelect(value)}>
                                                                {value}
                                                            </MDBDropdownItem>
                                                        ))}
                                                    </MDBDropdownMenu>
                                                </MDBDropdown>
                                            </div>
                                        </th>
                                        <th rowSpan="2" className='p-0'>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <span>Issue Memo No.</span>
                                                <MDBDropdown>
                                                    <MDBDropdownToggle tag='a' className='btn p-0 ms-2'>
                                                        <i className="fas fa-filter"></i>
                                                    </MDBDropdownToggle>
                                                    <MDBDropdownMenu>
                                                        {getUniqueValues('issueMemoNo').map((value, index) => (
                                                            <MDBDropdownItem key={index} onClick={() => handleFilterSelect(value)}>
                                                                {value}
                                                            </MDBDropdownItem>
                                                        ))}
                                                    </MDBDropdownMenu>
                                                </MDBDropdown>
                                            </div>
                                        </th>
                                        <th rowSpan="2" className='p-0'>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <span>Variety</span>
                                                <MDBDropdown>
                                                    <MDBDropdownToggle tag='a' className='btn p-0 ms-2'>
                                                        <i className="fas fa-filter"></i>
                                                    </MDBDropdownToggle>
                                                    <MDBDropdownMenu>
                                                        <MDBDropdownItem onClick={clearFilter}>
                                                            Clear Filter
                                                        </MDBDropdownItem>
                                                        {getUniqueValues('variety').map((value, index) => (
                                                            <MDBDropdownItem key={index} onClick={() => handleFilterSelect(value)}>
                                                                {value}
                                                            </MDBDropdownItem>
                                                        ))}
                                                    </MDBDropdownMenu>
                                                </MDBDropdown>
                                            </div>
                                        </th>
                                        <th rowSpan="2" className='p-0'>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <span>% MC</span>
                                                <MDBDropdown>
                                                    <MDBDropdownToggle tag='a' className='btn p-0 ms-2'>
                                                        <i className="fas fa-filter"></i>
                                                    </MDBDropdownToggle>
                                                    <MDBDropdownMenu>
                                                        <MDBDropdownItem onClick={clearFilter}>
                                                            Clear Filter
                                                        </MDBDropdownItem>
                                                        {getUniqueValues('moitureContent').map((value, index) => (
                                                            <MDBDropdownItem key={index} onClick={() => handleFilterSelect(value)}>
                                                                {value}
                                                            </MDBDropdownItem>
                                                        ))}
                                                    </MDBDropdownMenu>
                                                </MDBDropdown>
                                            </div>
                                        </th>
                                        <th colSpan="2" className="text-center p-0">
                                            <div className="d-flex align-items-center justify-content-center">
                                                Qty Nett
                                            </div>
                                        </th>
                                        <th rowSpan="2" className='p-0'>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <span>Lorry No</span>
                                                <MDBDropdown>
                                                    <MDBDropdownToggle tag='a' className='btn p-0 ms-2'>
                                                        <i className="fas fa-filter"></i>
                                                    </MDBDropdownToggle>
                                                    <MDBDropdownMenu>
                                                        <MDBDropdownItem onClick={clearFilter}>
                                                            Clear Filter
                                                        </MDBDropdownItem>
                                                        {getUniqueValues('lorryNo').map((value, index) => (
                                                            <MDBDropdownItem key={index} onClick={() => handleFilterSelect(value)}>
                                                                {value}
                                                            </MDBDropdownItem>
                                                        ))}
                                                    </MDBDropdownMenu>
                                                </MDBDropdown>
                                            </div>
                                        </th>
                                        <th colSpan="4" className="gunnyColor text-center p-0">
                                            <div className="d-flex align-items-center text-center justify-content-center">
                                                Gunny Condition
                                            </div>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className='qtyColorSub p-0'>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <span>Bags</span>
                                                <MDBDropdown>
                                                    <MDBDropdownToggle tag='a' className='btn p-0 ms-2'>
                                                        <i className="fas fa-filter"></i>
                                                    </MDBDropdownToggle>
                                                    <MDBDropdownMenu>
                                                        <MDBDropdownItem onClick={clearFilter}>
                                                            Clear Filter
                                                        </MDBDropdownItem>
                                                        {getUniqueValues('noOfBags').map((value, index) => (
                                                            <MDBDropdownItem key={index} onClick={() => handleFilterSelect(value)}>
                                                                {value}
                                                            </MDBDropdownItem>
                                                        ))}
                                                    </MDBDropdownMenu>
                                                </MDBDropdown>
                                            </div>
                                        </th>
                                        <th className='qtyColorSub p-0'>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <span>Weight</span>
                                                <MDBDropdown>
                                                    <MDBDropdownToggle tag='a' className='btn p-0 ms-2'>
                                                        <i className="fas fa-filter"></i>
                                                    </MDBDropdownToggle>
                                                    <MDBDropdownMenu>
                                                        <MDBDropdownItem onClick={clearFilter}>
                                                            Clear Filter
                                                        </MDBDropdownItem>
                                                        {getUniqueValues('weight').map((value, index) => (
                                                            <MDBDropdownItem key={index} onClick={() => handleFilterSelect(value)}>
                                                                {value}
                                                            </MDBDropdownItem>
                                                        ))}
                                                    </MDBDropdownMenu>
                                                </MDBDropdown>
                                            </div>
                                        </th>
                                        <th className='gunnyColorSub p-0'>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <span>NB</span>
                                                <MDBDropdown>
                                                    <MDBDropdownToggle tag='a' className='btn p-0 ms-2'>
                                                        <i className="fas fa-filter"></i>
                                                    </MDBDropdownToggle>
                                                    <MDBDropdownMenu>
                                                        <MDBDropdownItem onClick={clearFilter}>
                                                            Clear Filter
                                                        </MDBDropdownItem>
                                                        {getUniqueValues('noOfNBBags').map((value, index) => (
                                                            <MDBDropdownItem key={index} onClick={() => handleFilterSelect(value)}>
                                                                {value}
                                                            </MDBDropdownItem>
                                                        ))}
                                                    </MDBDropdownMenu>
                                                </MDBDropdown>
                                            </div>
                                        </th>
                                        <th className='gunnyColorSub p-0'>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <span>ONB</span>
                                                <MDBDropdown>
                                                    <MDBDropdownToggle tag='a' className='btn p-0 ms-2'>
                                                        <i className="fas fa-filter"></i>
                                                    </MDBDropdownToggle>
                                                    <MDBDropdownMenu>
                                                        <MDBDropdownItem onClick={clearFilter}>
                                                            Clear Filter
                                                        </MDBDropdownItem>
                                                        {getUniqueValues('noOfONBBags').map((value, index) => (
                                                            <MDBDropdownItem key={index} onClick={() => handleFilterSelect(value)}>
                                                                {value}
                                                            </MDBDropdownItem>
                                                        ))}
                                                    </MDBDropdownMenu>
                                                </MDBDropdown>
                                            </div>
                                        </th>
                                        <th className='gunnyColorSub p-0'>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <span>SS</span>
                                                <MDBDropdown>
                                                    <MDBDropdownToggle tag='a' className='btn p-0 ms-2'>
                                                        <i className="fas fa-filter"></i>
                                                    </MDBDropdownToggle>
                                                    <MDBDropdownMenu>
                                                        <MDBDropdownItem onClick={clearFilter}>
                                                            Clear Filter
                                                        </MDBDropdownItem>
                                                        {getUniqueValues('noOfSSBags').map((value, index) => (
                                                            <MDBDropdownItem key={index} onClick={() => handleFilterSelect(value)}>
                                                                {value}
                                                            </MDBDropdownItem>
                                                        ))}
                                                    </MDBDropdownMenu>
                                                </MDBDropdown>
                                            </div>
                                        </th>
                                        <th className='gunnyColorSub p-0'>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <span>SWP</span>
                                                <MDBDropdown>
                                                    <MDBDropdownToggle tag='a' className='btn p-0 ms-2'>
                                                        <i className="fas fa-filter"></i>
                                                    </MDBDropdownToggle>
                                                    <MDBDropdownMenu>
                                                        <MDBDropdownItem onClick={clearFilter}>
                                                            Clear Filter
                                                        </MDBDropdownItem>
                                                        {getUniqueValues('noOfSWPBags').map((value, index) => (
                                                            <MDBDropdownItem key={index} onClick={() => handleFilterSelect(value)}>
                                                                {value}
                                                            </MDBDropdownItem>
                                                        ))}
                                                    </MDBDropdownMenu>
                                                </MDBDropdown>
                                            </div>
                                        </th>
                                        <th>Actions</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {currentItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.date ? new Date(item.date).toLocaleDateString() : ''}</td>
                                            <td>{item.kms}</td>
                                            <td>{item.region}</td>
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
                                                <i className="fas fa-xs fa-pen p-1 " onClick={() => handleEdit(item.id)}></i>
                                                <i className="fas fa-trash" onClick={() => handleDelete(item.id)}></i>
                                            </td>
                                        </tr>
                                    ))}
                                </MDBTableBody>
                            </MDBTable>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol className="text-center">
                            <nav>
                                <ul className="pagination justify-content-center">
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                            <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </MDBCol>
                    </MDBRow>
                </>
            ) : (
                <GridView items={currentItems} />
            )}
        </div>
    );
};

export default TableComponent;


