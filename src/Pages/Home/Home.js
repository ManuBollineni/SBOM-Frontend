import React from "react";
import SignUp from "../SignUp/SignUp"; // ✅ Import your SignUp component

import './Home.css'; // ✅ Create Home.css to style it cleanly

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-left">
                <p>This is Home Page.</p>
            </div>

            <div className="home-right">
                <SignUp />
            </div>
        </div>
    );
}

export default Home;
