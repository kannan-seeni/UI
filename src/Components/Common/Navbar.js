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
// const useActiveSectionDeliveredGoogds = () => {
//   const {pathActiveName} = useLocation();
//   return {
//     isActivePaddy: pathname.startsWith('/paddy'),
//     isActiveRice: pathname.startsWith('/rice'),
//     isActiveRegion: pathname.startsWith('/masterdataregion'),
//     isActiveGodown: pathname.startsWith('/masterdatagodown'),
//     isActiveSettings: pathname.startsWith('/masterdatasettings'),
//   };
// }
const NavbarComponent = ({ onLogout }) => {
  const options = ([
    { name: 'Region', path: '/masterdataregion' },
    { name: 'Godown', path: '/masterdatagodown' },
    { name: 'Settings', path: '/masterdatasettings' }
  ]);
  const deliveredOptions = ([
    { name: 'Rice', path: '/riceTable' },
    { name: 'Gunnys', path: '/dashboard' },
    { name: 'FRK', path: '/dashboar' }
  ]);
  const incomingOptions = ([
    { name: 'Paddy', path: '/paddyTable'},
    { name: 'FRK', path: '/dashboard' }
  ])
  const { isActivePaddy, isActivePaddyFRK,isActiveRice, isActiveRiceFRK, isActiveRiceGunnys, isActiveRegion, isActiveGodown, isActiveSettings } = useActiveSection();
  const isDropdownActive = isActiveRegion || isActiveGodown || isActiveSettings;
  const isDropdownRiceActive = isActiveRice || isActiveRiceGunnys || isActiveRiceFRK;
  const isDropdownPaddyActive = isActivePaddy || isActivePaddyFRK;
  const { user } = useUser();
  return (
    <MDBNavbar expand="lg" className='shadow-0 px-4 navBar'>
      <MDBNavbarNav className="w-100">
        <MDBNavbarItem>
          {/* <NavLink
            to="/paddyTable"
            className={isActivePaddy ? 'active nav-link' : 'nav-link'}
          >
              Incoming Googds
          </NavLink> */}
          <MDBDropdown>
            <MDBDropdownToggle
              className={`${isDropdownPaddyActive ? 'active ' : ''}nav-link bg-transparent shadow-0 text-capitalize`}
            >
              Incoming Googds
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              {incomingOptions.map((incomingOption, index) => {
                const isActive =
                  incomingOption.path === '/riceTable' ? isActivePaddy :
                      incomingOption.path === '/dashboar' ? isActivePaddyFRK :
                        false;
                return (
                  <MDBDropdownItem key={index}>
                    <NavLink
                      to={incomingOption.path}
                      className={isActive ? 'active nav-link' : 'nav-link'}
                    >
                      {incomingOption.name}
                    </NavLink>
                  </MDBDropdownItem>
                );
              })}
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBNavbarItem>
        <MDBNavbarItem>
          {/* <NavLink
            to="/riceTable"
            className={isActiveRice ? 'active nav-link' : 'nav-link'}
          >
           Delivered Googds
          </NavLink> */}
          <MDBDropdown>
            <MDBDropdownToggle
              className={`${isDropdownRiceActive ? 'active ' : ''}nav-link bg-transparent shadow-0 text-capitalize`}
            >
              Delivered Googds
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              {deliveredOptions.map((deliveredOption, index) => {
                const isActive =
                  deliveredOption.path === '/riceTable' ? isActiveRice :
                    deliveredOption.path === '/dashboard' ? isActiveRiceGunnys :
                      deliveredOption.path === '/dashboar' ? isActiveRiceFRK :
                        false;
                return (
                  <MDBDropdownItem key={index}>
                    <NavLink
                      to={deliveredOption.path}
                      className={isActive ? 'active nav-link' : 'nav-link'}
                    >
                      {deliveredOption.name}
                    </NavLink>
                  </MDBDropdownItem>
                );
              })}
            </MDBDropdownMenu>
          </MDBDropdown>
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