import React from "react";
import Aside from "./Aside/Aside";
import Router from './Router';
import { UserProvider } from "./UserContext";
import './Layout.css';


const Layout = ()=>{
    return (
        <div className="cc-main-content">
            <UserProvider>
                <Aside></Aside>
                <Router></Router>
            </UserProvider>
        </div>
    );
}


export default Layout;