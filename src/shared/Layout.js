import React from "react";
import Aside from "./Aside/Aside";
import Router from './Router';
import './Layout.css';


const Layout = ()=>{
    return (
        <div className="cc-main-content">
            <Aside></Aside>
            <Router></Router>
        </div>
    );
}


export default Layout;