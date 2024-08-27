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
      <MDBNavbarNav className="w-100">
        <MDBNavbarItem>
          <NavLink
            to="/paddyTable"
            className={isActivePaddy ? 'active nav-link' : 'nav-link'}
          >
            Incoming Goods
          </NavLink>
        </MDBNavbarItem>
        <MDBNavbarItem>
          <NavLink
            to="/riceTable"
            className={isActiveRice ? 'active nav-link' : 'nav-link'}
          >
            Delivered Goods
          </NavLink>
        </MDBNavbarItem>
        <MDBNavbarItem>
          <MDBDropdown>
            <MDBDropdownToggle 
              className={`${isDropdownActive ? 'active ' : ''}nav-link bg-transparent shadow-0 text-capitalize`}
            >
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
        <MDBNavbarItem className='mx-0'>
          <MDBDropdown>
            <MDBDropdownToggle 
              className="nav-link w-100 square bg-primary rounded-circle p-3"
            >
              {user && <span className='text-uppercase'>{user.role[0]}</span>}
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem className="p-2">
                <NavLink onClick={onLogout} className="bg-transparent">
                  Logout
                </NavLink>
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBNavbarItem>
      </MDBNavbarNav>
    </MDBNavbar>
  );
};

export default NavbarComponent;