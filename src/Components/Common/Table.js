import React from 'react';

const TableComponent = ({ data }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Month</th>
                    <th>KMS</th>
                    <th>Issue Memo No.</th>
                    <th>Godown</th>
                    <th>Variety</th>
                    <th>% MC</th>
                    <th>Qty Nett</th>
                    <th>Lorry No</th>
                    <th>Bags</th>
                    <th>Weight</th>
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
                        <td>{item.month ? item.month.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : ''}</td>
                        <td>{item.kmsStartYear}-{item.kmsEndYear}</td>
                        <td>{item.issueMemoNo}</td>
                        <td>{item.godown}</td>
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
        </table>
    );
};

export default TableComponent;
