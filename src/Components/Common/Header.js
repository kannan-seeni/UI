import React from "react";
import { MDBNavbarBrand } from 'mdb-react-ui-kit';
import headerImg from '../../assets/logo.png';
import NavbarComponent from './Navbar';

// import { useSelector,useDispatch } from 'react-redux';
// import { Link, useHistory } from 'react-router-dom';

//const headerImg = require('../../assets/rice-logo.jpg').default;
const Header = ({onLogout}) => {
   const getHeader = () => {
    console.log('ggg')
    }
    return (
        <>
            <div className='header fixed-top'>
                <MDBNavbarBrand className="justify-content-between">
                    <MDBNavbarBrand className='text-black'>
                        <img src={headerImg} alt='Logo' height='60px' width='90px' className='w-100 text-black d-inline-block align-top me-2' />
                        {/* TNCSC Hulling Mill Management System */}
                    </MDBNavbarBrand>
                    <NavbarComponent onLogout={onLogout} />
                    { getHeader() }
                </MDBNavbarBrand>
            </div>
        </>

    )
}

export default Header;