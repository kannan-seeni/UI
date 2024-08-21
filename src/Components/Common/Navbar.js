import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarItem, MDBBtn, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';
import './common.css';


const useActiveSection = () => {
  const { pathname } = useLocation();

  return {
    isActivePaddy: pathname.startsWith('/paddy'),
    isActiveRice: pathname.startsWith('/rice'),
    isActiveRegion: pathname.startsWith('/masterdataregion'),
    isActiveGodown: pathname.startsWith('/masterdatagodown'),
    isActiveSettings: pathname.startsWith('/masterdatasettings'),
  };
};
const NavbarComponent = ({ onLogout }) => {
  const navigate = useNavigate();
  const [options, setOptions] = useState([
    { name: 'Region', path: '/masterdataregion' },
    { name: 'Godown', path: '/masterdatagodown' },
    { name: 'Settings', path: '/masterdatasettings' }
  ]);
  const { isActivePaddy, isActiveRice, isActiveRegion, isActiveGodown, isActiveSettings } = useActiveSection();
  const isDropdownActive = isActiveRegion || isActiveGodown || isActiveSettings;
  return (
    <MDBNavbar expand="lg" className='shadow-0 px-4 navBar'>
      <MDBNavbarBrand>
      </MDBNavbarBrand>
      <MDBNavbarNav>
        <MDBNavbarItem>
          <NavLink
            to="/paddyTable"
            className={isActivePaddy ? 'active nav-link' : 'nav-link'}
          // className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')}
          >
            Paddy
          </NavLink>
        </MDBNavbarItem>
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
          <MDBDropdown>
            <MDBDropdownToggle tag='a' className={isDropdownActive ? 'active nav-link' : 'nav-link'}>
              Master Data
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              {options.map((option, index) => {
                const isActive = 
                  option.path === '/masterdataregion' ? isActiveRegion :
                  option.path === '/masterdatagodown' ? isActiveGodown :
                  option.path === '/masterdatasettings' ? isActiveSettings :
                  false;
                return (
                  <MDBDropdownItem key={index}>
                    <NavLink
                      to={option.path}
                      className={isActive ? 'active nav-link' : 'nav-link'}
                    >
                      {option.name}
                    </NavLink>
                  </MDBDropdownItem>
                );
              })}
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBNavbarItem>
      </MDBNavbarNav>
      <MDBBtn color="danger" onClick={onLogout} className='w-100'>
        Logout
      </MDBBtn>
    </MDBNavbar>
  );
};

export default NavbarComponent;