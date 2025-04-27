import React from "react";
import Home from './../Pages/Home/Home';
import About from './../Pages/About';
import CompareSBOM from './../Pages/CompareSBOM/CompareSBOM';
import ViewSBOM from '../Pages/ViewSBOM/ViewSBOM';
import Search from './../Pages/Search';
import Stats from './../Pages/Stats';
import Platforms from './../Pages/Platforms';
import ViewApplication from "../Pages/ViewApplication/ViewApplication";
import FileUpload from "../Pages/FileUpload/FileUpload";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import { Route, Routes, redirect} from 'react-router-dom';

const Router = () => {
    return (
        <Routes>
            <Route path="/" />
            <Route exact path="/Home" element={<Home/>}/>
            <Route exact path="/About" element={<About/>}/>
            <Route exact path="/Search" element={<Search/>}/>
            <Route exact path="/Platforms" element={<Platforms/>}/>
            <Route exact path="/Stats" element={<Stats/>}/>
            <Route path="/ViewSBOM" element={<ViewSBOM/>}/>
            <Route exact path="/CompareSBOM" element={<CompareSBOM/>} />
            <Route exact path="/ViewApplication" element={<ViewApplication/>} />
            <Route exact path="/File-Upload" element={<FileUpload/>} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
        </Routes>
    );
}

export default Router;