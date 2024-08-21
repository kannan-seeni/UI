import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

const Footer = () => {
    return (
        <MDBFooter className='text-center text-lg-left bgFooter'>
            <div className='text-center p-3 text-white' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                &copy; {new Date().getFullYear()} Copyright:{' '}
                TNCSC Hulling Mill Management System
            </div>
        </MDBFooter>
    );
}
export default Footer;
