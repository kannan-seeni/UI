import React from "react";
// import { MDBNavbarBrand } from 'mdb-react-ui-kit';
import headerImg from '../../assets/logo.png';
import NavbarComponent from './Navbar';

// import { useSelector,useDispatch } from 'react-redux';
// import { Link, useHistory } from 'react-router-dom';

//const headerImg = require('../../assets/rice-logo.jpg').default;
const Header = ({onLogout}) => {
    return (
        <>
            <div className='header fixed-top'>
                <div className="justify-content-between navbar-brand">
                    <div className='text-white navbar-brand'>
                        <img src={headerImg} alt='Logo' height='60px' width='90px' className='w-100 text-black d-inline-block align-top me-2' />
                        <span className="fs-6 fs-sm-4">TN Hulling Mill Management System</span>
                    </div>
                    <NavbarComponent onLogout={onLogout} />
                </div>
            </div>
        </>

    )
}

export default Header;