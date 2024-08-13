import React, { useState } from "react";
import {
    MDBContainer, MDBRow, MDBCol, MDBCard
} from 'mdb-react-ui-kit';
import DatePicker from 'react-datepicker';
const Paddy = ({ onSubmit }) => {
    const [formValues, setFormValues] = useState({
        date: null,
        month: null,
        kmsStartYear: '',
        kmsEndYear: '',
        issueMemoNo: '',
        godown: '',
        variety: '',
        percentMC: '',
        qtyNett: '',
        lorryNo: '',
        bags: '',
        weight: '',
        gunnyCondition: {
            nb: '',
            onb: '',
            ss: '',
            swp: ''
        }
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('gunnyCondition')) {
            //const [key] = name.split('.');
            const key = name.split('.')[1];
            setFormValues(prevState => ({
                ...prevState,
                gunnyCondition: {
                    ...prevState.gunnyCondition,
                    [key]: value
                }
            }));
        } else {
            setFormValues(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };
    const handleDateChange = (date) => {
        setFormValues(prevState => ({
            ...prevState,
            date
        }));
    };

    const handleMonthChange = (date) => {
        setFormValues(prevState => ({
            ...prevState,
            month: date
        }));
    };

    const handleYearRangeChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmitPaddy = (e) => {
        e.preventDefault();
        onSubmit(formValues);
        setFormValues({
            date: null,
            month: null,
            kmsStartYear: '',
            kmsEndYear: '',
            issueMemoNo: '',
            godown: '',
            variety: '',
            percentMC: '',
            qtyNett: '',
            lorryNo: '',
            bags: '',
            weight: '',
            gunnyCondition: {
                nb: '',
                onb: '',
                ss: '',
                swp: ''
            }
        });
    }
    return (
        <>
            <MDBContainer fluid className='background p-0'>
                <MDBRow className='d-flex  h-100'>
                    <MDBCol md='12'>
                        <MDBCard className='cardBGImg mt-5'>
                            <form onSubmit={handleSubmitPaddy}>
                                <MDBRow className='p-4'>
                                    <div className='col-md-4'>
                                        <label htmlFor="date" className="form-label-text form-label float-start fst-italic fw-bold">Date</label>
                                        {/* <input
                                            type="text"
                                            id="date"
                                            name="date"
                                            value={formValues.date}
                                            onChange={handleChange}
                                            className={`form-control fst-italic fw-bold`}
                                        /> */}
                                        <DatePicker
                                            selected={formValues.date}
                                            onChange={handleDateChange}
                                            dateFormat="MM/dd/yyyy"
                                            className={`form-control fst-italic fw-bold w-100`}
                                        />

                                    </div>
                                    <div className='col-md-4'>
                                        <label htmlFor="month" className="form-label-text form-label float-start fst-italic fw-bold">Month</label>
                                        {/* <input
                                            type="text"
                                            id="month"
                                            name="month"
                                            value={formValues.month}
                                            onChange={handleChange}
                                            className={`form-control fst-italic fw-bold`}
                                        /> */}
                                        <DatePicker
                                            selected={formValues.month}
                                            onChange={handleMonthChange}
                                            dateFormat="MM/yyyy"
                                            showMonthYearPicker
                                            className={`form-control fst-italic fw-bold w-100`}
                                        />

                                    </div>
                                    <div className='col-md-4'>
                                        <label htmlFor="kms" className="form-label-text form-label float-start fst-italic fw-bold">KMS</label>
                                        {/* <input
                                            type="text"
                                            id="kms"
                                            name="kms"
                                            value={formValues.kms}
                                            onChange={handleChange}
                                            className={`form-control fst-italic fw-bold`}
                                        /> */}
                                        <input
                                            type="number"
                                            name="kmsStartYear"
                                            value={formValues.kmsStartYear}
                                            onChange={handleYearRangeChange}
                                            placeholder="Start Year"
                                            className={`form-control fst-italic fw-bold w-50`}
                                        />
                                        <input
                                            type="number"
                                            name="kmsEndYear"
                                            value={formValues.kmsEndYear}
                                            onChange={handleYearRangeChange}
                                            placeholder="End Year"
                                            className={`form-control fst-italic fw-bold w-50`}
                                        />
                                    </div>
                                    <div className='col-md-4'>
                                        <label htmlFor="issueMemoNo" className="form-label-text form-label float-start fst-italic fw-bold">Issue Memo No.</label>
                                        <input
                                            type="text"
                                            id="issueMemoNo"
                                            name="issueMemoNo"
                                            value={formValues.issueMemoNo}
                                            onChange={handleChange}
                                            className={`form-control fst-italic fw-bold`}
                                        />
                                    </div>
                                    <div className='col-md-4'>
                                        <label htmlFor="godown" className="form-label-text form-label float-start fst-italic fw-bold">Godown</label>
                                        <input
                                            type="text"
                                            id="godown"
                                            name="godown"
                                            value={formValues.godown}
                                            onChange={handleChange}
                                            className={`form-control fst-italic fw-bold`}
                                        />
                                    </div>
                                    <div className='col-md-4'>
                                        <label htmlFor="variety" className="form-label-text form-label float-start fst-italic fw-bold">Variety</label>
                                        <input
                                            type="text"
                                            id="variety"
                                            name="variety"
                                            value={formValues.variety}
                                            onChange={handleChange}
                                            className={`form-control fst-italic fw-bold`}
                                        />
                                    </div>
                                    <div className='col-md-4'>
                                        <label htmlFor="percentMC" className="form-label-text form-label float-start fst-italic fw-bold">% MC</label>
                                        <input
                                            type="text"
                                            id="percentMC"
                                            name="percentMC"
                                            value={formValues.percentMC}
                                            onChange={handleChange}
                                            className={`form-control fst-italic fw-bold`}
                                        />
                                    </div>
                                    <div className='col-md-4'>
                                        <label htmlFor="qtyNett" className="form-label-text form-label float-start fst-italic fw-bold">Qty Nett</label>
                                        <input
                                            type="text"
                                            id="qtyNett"
                                            name="qtyNett"
                                            value={formValues.qtyNett}
                                            onChange={handleChange}
                                            className={`form-control fst-italic fw-bold`}
                                        />
                                    </div>
                                    <div className='col-md-4'>
                                        <label htmlFor="lorryNo" className="form-label-text form-label float-start fst-italic fw-bold">Lorry No</label>
                                        <input
                                            type="text"
                                            id="lorryNo"
                                            name="lorryNo"
                                            value={formValues.lorryNo}
                                            onChange={handleChange}
                                            className={`form-control fst-italic fw-bold`}
                                        />
                                    </div>
                                    <div className='col-md-4'>
                                        <label htmlFor="bags" className="form-label-text form-label float-start fst-italic fw-bold">Bags</label>
                                        <input
                                            type="text"
                                            id="bags"
                                            name="bags"
                                            value={formValues.bags}
                                            onChange={handleChange}
                                            className={`form-control fst-italic fw-bold`}
                                        />
                                    </div>
                                    <div className='col-md-4'>
                                        <label htmlFor="weight" className="form-label-text form-label float-start fst-italic fw-bold"> Weight</label>
                                        <input
                                            type="text"
                                            id="weight"
                                            name="weight"
                                            value={formValues.weight}
                                            onChange={handleChange}
                                            className={`form-control fst-italic fw-bold`}
                                        />
                                    </div>
                                    <div className='col-md-4'>
                                        <label htmlFor="nb" className="form-label-text form-label float-start fst-italic fw-bold">Gunny Condition - NB</label>
                                        <input
                                            type="text"
                                            id="nb"
                                            name="gunnyCondition.nb"
                                            value={formValues.gunnyCondition.nb}
                                            onChange={handleChange}
                                            className={`form-control fst-italic fw-bold`}
                                        />
                                    </div>
                                    <div className='col-md-4'>
                                        <label htmlFor="onb" className="form-label-text form-label float-start fst-italic fw-bold">Gunny Condition - ONB</label>
                                        <input type="text" id="onb" name="gunnyCondition.onb" value={formValues.gunnyCondition.onb} onChange={handleChange} className={`form-control fst-italic fw-bold`} />
                                    </div>
                                    <div className='col-md-4'>
                                        <label htmlFor="ss" className="form-label-text form-label float-start fst-italic fw-bold">Gunny Condition - SS</label>
                                        <input type="text" id="ss" name="gunnyCondition.ss" value={formValues.gunnyCondition.ss} onChange={handleChange} className={`form-control fst-italic fw-bold`} />
                                    </div>
                                    <div className='col-md-4'>
                                        <label htmlFor="swp" className="form-label-text form-label float-start fst-italic fw-bold">Gunny Condition - SWP</label>
                                        <input type="text" id="swp" name="gunnyCondition.swp" value={formValues.gunnyCondition.swp} onChange={handleChange} className={`form-control fst-italic fw-bold`} />
                                    </div>
                                    <button type="submit" className="loginBtn btn btn-success mt-3 w-25 m-auto">Add Data</button>
                                </MDBRow>
                            </form>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    )
}

export default Paddy;