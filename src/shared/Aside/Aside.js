import React, { useContext } from "react";
import './Aside.css';
import Image from '../Images/SBOM.jpg';
import NavMain from "../NavMain/NavMain";
import { UserContext } from "../UserContext";
import { FiLogIn, FiLogOut } from "react-icons/fi";

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
                    <a className="cc-nav-button cc-login-button" href="/Login">
                        <FiLogIn style={{ marginRight: "6px" }} />
                        Login
                    </a>
                ) : (
                    <button className="cc-nav-button cc-logout-button" onClick={logout}>Logout</button>
                )}
            </div>
        </header>
    );
}

export default Aside;