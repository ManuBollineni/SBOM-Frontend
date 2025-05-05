import React, { useContext } from "react";
import Home from './../Pages/Home/Home';
import CompareSBOM from './../Pages/CompareSBOM/CompareSBOM';
import ViewSBOM from '../Pages/ViewSBOM/ViewSBOM';
import Search from './../Pages/Search';
import Stats from './../Pages/Stats/Stats';
import Platforms from './../Pages/Platforms';
import ViewApplication from "../Pages/ViewApplication/ViewApplication";
import FileUpload from "../Pages/FileUpload/FileUpload";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import { UserContext } from "./UserContext";
import { Route, Routes, redirect} from 'react-router-dom';

const Router = () => {
    const { isLoggedIn } = useContext(UserContext);

    return (
        <Routes>
            <Route path="/" />
            <Route path="/Home" element={<Home />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/Platforms" element={<Platforms />} />
            <Route path="/File-Upload" element={<FileUpload />} />
            <Route path="/CompareSBOM" element={<CompareSBOM />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />

            {/* Protected Routes */}
            {isLoggedIn && (
                <>
                    <Route path="/Statistics" element={<Stats />} />
                    <Route path="/ViewSBOM" element={<ViewSBOM />} />
                   
                    <Route path="/ViewApplication" element={<ViewApplication />} />
                </>
            )}
        </Routes>
    );
}

export default Router;