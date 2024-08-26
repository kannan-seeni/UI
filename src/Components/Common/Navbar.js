import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MDBNavbar, MDBNavbarNav, MDBNavbarItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';
import './common.css';
import { useUser } from './UserContext';

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
  const options = ([
    { name: 'Region', path: '/masterdataregion' },
    { name: 'Godown', path: '/masterdatagodown' },
    { name: 'Settings', path: '/masterdatasettings' }
  ]);
  const { isActivePaddy, isActiveRice, isActiveRegion, isActiveGodown, isActiveSettings } = useActiveSection();
  const isDropdownActive = isActiveRegion || isActiveGodown || isActiveSettings;
  const { user } = useUser();
  return (
    <MDBNavbar expand="lg" className='shadow-0 px-4 navBar'>
      {/* <MDBNavbarBrand> */}
        {/* <div>
          {user && <span>{user.email} ({user.role})</span>}
        </div> */}
      {/* </MDBNavbarBrand> */}
      <MDBNavbarNav>
        <MDBNavbarItem>
          <NavLink
            to="/paddyTable"
            className={isActivePaddy ? 'active nav-link' : 'nav-link'}
          // className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')}
          >
            Incoming Googds
          </NavLink>
        </MDBNavbarItem>
        <MDBNavbarItem>
          <NavLink
            to="/riceTable"
            className={isActiveRice ? 'active nav-link' : 'nav-link'}
          // className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')}
          >
            Delivered Googds
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
        <MDBNavbarItem>
          <MDBDropdown>
            <MDBDropdownToggle tag='a'  className="nav-link w-100">
                {user && <span>{user.email} ({user.role})</span>}
            </MDBDropdownToggle>
            <MDBDropdownMenu>
                  <MDBDropdownItem>
                    <NavLink onClick={onLogout} className="w-100">
                      Logout
                    </NavLink>
                  </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBNavbarItem>
      </MDBNavbarNav>
      {/* <MDBBtn color="danger" onClick={onLogout} className='w-100'>
        Logout
      </MDBBtn>  */}
    </MDBNavbar>
  );
};

export default NavbarComponent;