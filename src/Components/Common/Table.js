import React,{useState} from 'react';
import './common.css';

import { MDBTable, MDBTableHead, MDBTableBody, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
const TableComponent = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 30;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <>
            <MDBContainer>
                <MDBRow className="mt-2 g-0">
                    <MDBCol className="table-bordered ml-auto mt-2 mb-2" md='12'>
                        <MDBTable className="table-bordered border" bordered borderColor="primary" responsive>
                            <MDBTableHead>
                                <tr>
                                    <th rowSpan="2" className='p-0'>Date</th>
                                    <th rowSpan="2" className='p-0'>KMS</th>
                                    <th rowSpan="2" className='p-0'>Godwon</th>
                                    <th rowSpan="2" className='p-0'>Issue Memo No.</th>
                                    <th rowSpan="2" className='p-0'>Variety</th>
                                    <th rowSpan="2" className='p-0'>% MC</th>
                                    <th colSpan="2" className="qtyColor text-center p-0">Qty Nett</th>
                                    <th rowSpan="2" className='p-0'>Lorry No</th>
                                    <th colSpan="4" className="gunnyColor text-center p-0">Gunny Condition</th>
                                </tr>
                                <tr>
                                    <th className='qtyColorSub p-0'>Bags</th>
                                    <th className='qtyColorSub p-0'>Weight</th>
                                    <th className='gunnyColorSub p-0'>NB</th>
                                    <th className='gunnyColorSub p-0'>ONB</th>
                                    <th className='gunnyColorSub p-0'>SS</th>
                                    <th className='gunnyColorSub p-0'>SWP</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {currentItems.map((item, index) => (
                                    <tr key={index}>
                                         <td>{item.date ? new Date(item.date).toLocaleDateString() : ''}</td>
                                        {/* <td>{item.date ? item.date.toLocaleDateString() : ''}</td> */}
                                        {/* <td>{item.kmsStartYear}-{item.kmsEndYear}</td> */}
                                        {/* <td>{item.kmsStartYear && item.kmsEndYear &&
                                            `${item.kmsStartYear} - ${item.kmsEndYear}`}</td> */}
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
                {/* Uncomment and adjust for pagination if needed */}
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
            </MDBContainer>
            {/* <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>KMS</th>
                        <th>Issue Memo No.</th>
                        <th>Godwon</th>
                        <th>Variety</th>
                        <th>% MC</th>
                        <th colSpan="2" className="text-center">Qty Nett</th>
                        <th>Lorry No</th>
                        <th colSpan="4" className="text-center">Gunny Condition</th>
                    </tr>
                    <tr>
                        <th colSpan="6"></th>
                        <th>Bags</th>
                        <th>Weight</th>
                        <th colSpan="1"></th>
                        <th>NB</th>
                        <th>ONB</th>
                        <th>SS</th>
                        <th>SWP</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.date ? item.date.toLocaleDateString() : ''}</td>
                            <td>{item.kmsStartYear}-{item.kmsEndYear}</td>
                            <td>{item.issueMemoNo}</td>
                            <td>{item.godwon}</td>
                            <td>{item.variety}</td>
                            <td>{item.percentMC}</td>
                            <td>{item.qtyNett}</td>
                            <td>{item.lorryNo}</td>
                            <td>{item.bags}</td>
                            <td>{item.weight}</td>
                            <td>{item.gunnyCondition.nb}</td>
                            <td>{item.gunnyCondition.onb}</td>
                            <td>{item.gunnyCondition.ss}</td>
                            <td>{item.gunnyCondition.swp}</td>

                        </tr>
                    ))}
                </tbody>
            </table> */}
        </>
    );
};

export default TableComponent;
