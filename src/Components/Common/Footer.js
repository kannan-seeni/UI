import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

const Footer = () => {
    return (
        <MDBFooter className='text-end text-lg-left bgFooter fixed-bottom'>
            <div className='text-end p-2 text-white' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                &copy; {new Date().getFullYear()} Copyright:{' '}
                TNCSC Hulling Mill Management System
            </div>
        </MDBFooter>
    );
}
export default Footer;
