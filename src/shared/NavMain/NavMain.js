import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../UserContext';
import './NavMain.css';

function NavMain(){
  const { isLoggedIn } = useContext(UserContext);

    return(
      <nav className="navbar">
      <ul className="nav-links">
          <NavLink to="/Home" className="cc-nav-link">Home</NavLink>
          {isLoggedIn && (
              <>
                  <NavLink to="/ViewApplication" className="cc-nav-link">Applications</NavLink>
                  <NavLink to="/ViewSBOM" className="cc-nav-link">Components</NavLink>
                  <NavLink to="/Statistics" className="cc-nav-link">Statistics</NavLink>
              </>
          )}
          <NavLink to="/CompareSBOM" className="cc-nav-link">Compare SBOM</NavLink>
          <NavLink to="/File-Upload" className="cc-nav-link">File Upload</NavLink>
      </ul>
  </nav>
    );
}


export default NavMain;