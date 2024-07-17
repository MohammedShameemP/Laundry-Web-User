// import logo from "../../assets/Group 1138.png";
import React from "react";

import { Link } from "react-router-dom";
import "./Laundryopenpage.css";
const LandingPage = () => {
    return (
        <Link className="landingPage_container" to="/splash">
                <img src="./Group 1072.svg" className="logo" alt="logo" />

                <h1 className="brand_name">Laundrybin</h1>
        </Link>
    );
};

export default LandingPage;
