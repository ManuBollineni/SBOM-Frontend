import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavMain.css';

function NavMain(){
    return(
    <nav className="navbar">
        <ul className="nav-links">
          <NavLink to="/Home" className="cc-nav-link">Home</NavLink>
          <NavLink to="/About" className="cc-nav-link">About</NavLink>
          <NavLink to="/services" className="cc-nav-link">Services</NavLink>
          <NavLink to="/ViewApplication" className="cc-nav-link">Applications</NavLink>
          <NavLink to="/ViewSBOM" className="cc-nav-link">Components</NavLink>
          <NavLink to="/CompareSBOM" className="cc-nav-link">Compare SBOM</NavLink>
          <NavLink to="/File-Upload" className="cc-nav-link">File Upload</NavLink>
      </ul>
    </nav>
    );
}


export default NavMain;