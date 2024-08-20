import React from 'react';
import { NavLink, useNavigate,useLocation } from 'react-router-dom';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarItem, MDBBtn } from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';
import './common.css';


const useActiveSection = () => {
  const { pathname } = useLocation();
  
  return {
    isActivePaddy: pathname.startsWith('/paddy'),
    isActiveRice: pathname.startsWith('/rice'),
  };
};
const NavbarComponent = ({onLogout}) => {
  const navigate = useNavigate();

  const { isActivePaddy, isActiveRice } = useActiveSection();
  return (
    <MDBNavbar expand="lg" className='shadow-0 px-4 navBar'>
      <MDBNavbarBrand>
      </MDBNavbarBrand>
      <MDBNavbarNav>
        <MDBNavbarItem>
          <NavLink 
            to="/riceTable"
            className={isActiveRice ? 'active nav-link' : 'nav-link'}
            // className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')}
          >
            Rice
          </NavLink>
        </MDBNavbarItem>
        <MDBNavbarItem>
          <NavLink 
            to="/paddyTable"
            className={isActivePaddy ? 'active nav-link' : 'nav-link'}
            // className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')}
          >
            Paddy
          </NavLink>
        </MDBNavbarItem>
      </MDBNavbarNav>
      <MDBBtn color="danger" onClick={onLogout} className='w-100'>
        Logout
      </MDBBtn>
    </MDBNavbar>
  );
};

export default NavbarComponent;