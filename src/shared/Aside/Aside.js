import React from "react";
import './Aside.css';
import Image from '../Images/SBOM.jpg';
import NavMain from "../NavMain/NavMain";

const Aside = () =>{
    return (
        <aside className="cc-aside_main">
            <header>
                <a href="/">
                    <img className="cc-aside_logo"
                    src={Image}/>
                </a>
            </header>

            <NavMain></NavMain>

            <a className="cc-nav-button cc-login-button" href="/Login">
                Login
            </a>

            <a className="cc-nav-button cc-logout-button" href="/">
                Logout
            </a>
        </aside>
    );
}

export default Aside;