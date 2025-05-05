import React, { useContext } from "react";
import './Aside.css';
import Image from '../Images/SBOM.jpg';
import NavMain from "../NavMain/NavMain";
import { UserContext } from "../UserContext";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { NavLink } from 'react-router-dom';

const Aside = () =>{
    const { isLoggedIn, logout } = useContext(UserContext);


    return (
        <header className="top-header">
            <div className="logo-title">
                <h1>SBOM Viewer</h1>
            </div>

            <div className="nav-container">
                <NavMain />
            </div>

            <div className="auth-buttons">
                {!isLoggedIn ? (
                    <NavLink className="cc-nav-button cc-login-button" to="/Login">
                        <FiLogIn style={{ marginRight: "6px" }} />
                        Login
                    </NavLink>
                ) : (
                    <button className="cc-nav-button cc-logout-button" onClick={logout}>Logout</button>
                )}
            </div>
        </header>
    );
}

export default Aside;