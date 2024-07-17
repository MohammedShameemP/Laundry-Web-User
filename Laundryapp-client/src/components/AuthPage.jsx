// import logo from "../../assets/Group 1138.png";
// import frame_img from "../../assets/Frame.png"
import React from "react";
import "./AuthPage.css";
import { Link } from "react-router-dom";

const AuthPage = () => {
    return (
        <div className="authPage_container">
            <div className="brand">
                <img className="brand_logo" src="./Group 1072.svg" alt="logo" />
                <h1 className="brand_name" style={{ color: "#fff" }}>Laundrybin</h1>
            </div>
            <div className="auth_buttons">
                <Link className="auth_btn" to="/LoginPage" style={{ background: "#fff",color:"#1facf3" }}>
                    Log In
                </Link>
                <Link className="auth_btn" to="/register">
                    Register
                </Link>
            </div>
            <img className="frame_img" src="./Frame.svg" alt="" />
        </div>
    );
};

export default AuthPage;