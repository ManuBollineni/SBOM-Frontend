import React, { useContext } from "react";
import SignUp from "../SignUp/SignUp";
import { UserContext } from "../../shared/UserContext";
import './Home.css';

const Home = () => {
    const { isLoggedIn } = useContext(UserContext);

    return (
        <div className="home-container">
            <div className={`card-wrapper ${isLoggedIn ? 'single-card' : ''}`}>
            <div className="card welcome-card">
                <h1>Welcome to SBOM Finder</h1>
                <p className="subtitle">Your Trusted Solution for Software Transparency, Compliance, and Risk Management</p>

                <p>
                    In today’s interconnected world, <strong>Software Bill of Materials (SBOM)</strong> plays a vital role in understanding what’s under the hood of your software.
                    Whether you're a developer, security analyst, or compliance officer, SBOM helps ensure transparency, traceability, and control over your software dependencies.
                </p>

                <p>
                    With increasing cybersecurity threats and software supply chain attacks like <em>SolarWinds</em>, government and enterprise mandates now require detailed SBOMs for software procurement and deployment.
                    SBOMs act as an "ingredient list" — outlining every open-source library, component, and version included in your software package.
                </p>

                <p>
                    SBOM Finder is designed to make this easy. Upload your application, view its complete SBOM, compare it with others, and analyze key metrics — all in one place.
                </p>

                <ul>
                    <li>🔍 <strong>Search and discover</strong> SBOMs across various platforms</li>
                    <li>🧩 <strong>View detailed component breakdowns</strong> for each application</li>
                    <li>📊 <strong>Compare SBOMs</strong> to detect version mismatches or risks</li>
                    <li>📈 <strong>Analyze trends</strong> and supplier risks using visual statistics</li>
                </ul>

                <blockquote>
                    <em>“Transparency is the first step toward secure and resilient software.”</em><br />
                    <small>— SBOM Finder Team</small>
                </blockquote>
            </div>


                {/* Only show SignUp if NOT logged in */}
                {!isLoggedIn && (
                    <div className="card signup-card">
                        <SignUp />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
