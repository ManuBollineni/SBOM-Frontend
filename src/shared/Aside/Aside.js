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

            <a className="cc-nav-link" href="/" onClick={()=>{}}>
              {/* <Icon name="power-off" /> */}
              Logout
            </a>
        </aside>
    );
}

export default Aside;