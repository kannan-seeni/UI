import React, { useState } from 'react';
import './common.css';
import { MDBTable, MDBTableHead, MDBTableBody, MDBContainer, MDBRow, MDBCol, MDBInput, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdb-react-ui-kit';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
const exportToExcel = (data) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'data.xlsx');
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
    const [dropdownOpen, setDropdownOpen] = useState('');
    const [currentFilterColumn, setCurrentFilterColumn] = useState('');

    // Filter data based on search and filters
    const filteredData = data.filter(item => {
        return (
            (!searchQuery || Object.values(item).some(val => val.toString().toLowerCase().includes(searchQuery))) &&
            (!filters.date || item.date === filters.date) &&
            (!filters.kms || item.kms === filters.kms) &&
            (!filters.godwon || item.godwon === filters.godwon) &&
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
        //setFilters({ ...filters, [column]: value });
        setFilters(prevFilters => ({ ...prevFilters, [column]: value }));
        setCurrentPage(1); // Reset to first page
    };

    // Handle dropdown toggle
    const toggleDropdown = (column) => {
        setDropdownOpen(prev => prev === column ? '' : column);
        setCurrentFilterColumn(column);
    };

    // Handle filter selection from dropdown
    const handleFilterSelect = (value) => {
        handleFilterChange(currentFilterColumn, value);
        toggleDropdown('');
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
    const handleExportToExcel = () => {
        exportToExcel(currentItems);
    };
    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol md='6' className='my-3'>
                    <MDBInput label='Search' onChange={handleSearchChange} />
                </MDBCol>
                <MDBCol md='6' className='my-3'>
                    <button onClick={() => setViewMode('table')} className={`btn btn-${viewMode === 'table' ? 'primary' : 'secondary'} mx-2 `}>Table View</button>
                    <button onClick={() => setViewMode('grid')} className={`btn btn-${viewMode === 'grid' ? 'primary' : 'secondary'}`}>Grid View</button>
                    <button onClick={handleExportToExcel} className="btn btn-success mx-2">
                        <i className="fas fa-file-excel"></i> Export to Excel
                    </button>
                </MDBCol>
            </MDBRow>
            {viewMode === 'table' ? (
                <>
                    <MDBRow className="mt-2 g-0">
                        <MDBCol className="table-bordered ml-auto mt-2 mb-2" md='12'>
                            <MDBTable className="table-bordered border" bordered borderColor="primary" responsive>
                                <MDBTableHead>
                                    <tr>
                                        <th rowSpan="2" className='p-0'>
                                            <div className="d-flex align-items-center">
                                                <span>Date</span>
                                                <MDBDropdown isOpen={dropdownOpen === 'date'} toggle={() => toggleDropdown('date')}>
                                                    <MDBDropdownToggle tag='a' className='btn btn-light ms-2'>
                                                        <i className="fas fa-filter"></i>
                                                    </MDBDropdownToggle>
                                                    <MDBDropdownMenu>
                                                        <MDBDropdownItem onClick={clearFilter}>
                                                            Clear Filter
                                                        </MDBDropdownItem>
                                                        {getUniqueValues('date').map((value, index) => (
                                                            <MDBDropdownItem key={index} onClick={() => handleFilterSelect('date')}>
                                                                {value}
                                                            </MDBDropdownItem>
                                                        ))}
                                                    </MDBDropdownMenu>
                                                </MDBDropdown>
                                            </div>
                                        </th>
                                        <th rowSpan="2" className='p-0'>
                                            <div className="d-flex align-items-center">
                                                <span>KMS</span>
                                                <MDBDropdown>
                                                    <MDBDropdownToggle tag='a' className='btn btn-light ms-2'>
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
                                            <div className="d-flex align-items-center">
                                                <span>Godwon</span>
                                                <MDBDropdown>
                                                    <MDBDropdownToggle tag='a' className='btn btn-light ms-2'>
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
                                            <div className="d-flex align-items-center">
                                                <span>Issue Memo No.</span>
                                                <MDBDropdown>
                                                    <MDBDropdownToggle tag='a' className='btn btn-light ms-2'>
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
                                            <div className="d-flex align-items-center">
                                                <span>Variety</span>
                                                <MDBDropdown>
                                                    <MDBDropdownToggle tag='a' className='btn btn-light ms-2'>
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
                                            <div className="d-flex align-items-center">
                                                <span>% MC</span>
                                                <MDBDropdown>
                                                    <MDBDropdownToggle tag='a' className='btn btn-light ms-2'>
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
                                            <div className="d-flex align-items-center">
                                                <span>Lorry No</span>
                                                <MDBDropdown>
                                                    <MDBDropdownToggle tag='a' className='btn btn-light ms-2'>
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
                                            <div className="d-flex align-items-center">
                                                <span>Bags</span>
                                                <MDBDropdown>
                                                    <MDBDropdownToggle tag='a' className='btn btn-light ms-2'>
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
                                            <div className="d-flex align-items-center">
                                                <span>Weight</span>
                                                <MDBDropdown>
                                                    <MDBDropdownToggle tag='a' className='btn btn-light ms-2'>
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
                                            <div className="d-flex align-items-center">
                                                <span>NB</span>
                                                <MDBDropdown>
                                                    <MDBDropdownToggle tag='a' className='btn btn-light ms-2'>
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
                                            <div className="d-flex align-items-center">
                                                <span>ONB</span>
                                                <MDBDropdown>
                                                    <MDBDropdownToggle tag='a' className='btn btn-light ms-2'>
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
                                            <div className="d-flex align-items-center">
                                                <span>SS</span>
                                                <MDBDropdown>
                                                    <MDBDropdownToggle tag='a' className='btn btn-light ms-2'>
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
                                            <div className="d-flex align-items-center">
                                                <span>SWP</span>
                                                <MDBDropdown>
                                                    <MDBDropdownToggle tag='a' className='btn btn-light ms-2'>
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
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {currentItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.date ? new Date(item.date).toLocaleDateString() : ''}</td>
                                            <td>{item.kms}</td>
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
        </MDBContainer>
    );
};

export default TableComponent;


