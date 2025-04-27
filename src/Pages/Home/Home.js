import React from "react";
import SignUp from "../SignUp/SignUp";
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="card-wrapper">
                <div className="card welcome-card">
                    <h1>Welcome to SBOM Finder</h1>
                    <p className="subtitle">Your Trusted Solution for Software Transparency and Security</p>
                    <p>In today’s digital world, understanding the components that make up software applications is critical for security, compliance, and efficiency. A <strong>Software Bill of Materials (SBOM)</strong> acts like a detailed ingredient list...</p>
                    <ul>
                        <li>🔍 <strong>Search and discover</strong> SBOMs</li>
                        <li>🧩 <strong>View complete SBOMs</strong></li>
                        <li>📊 <strong>Compare two SBOMs</strong></li>
                        <li>📈 <strong>Analyze statistics</strong></li>
                    </ul>
                    <blockquote><em>"Transparency is the first step toward secure and resilient software."</em></blockquote>
                </div>

                <div className="card signup-card">
                    <SignUp />
                </div>
            </div>
        </div>
    );
}

export default Home;
