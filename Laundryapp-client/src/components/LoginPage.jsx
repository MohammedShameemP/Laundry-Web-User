// import frame_img from "../../assets/Frame.png";
// import leftArrow from "../../assets/arrow-left.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { Alert } from "@mui/material";
import {useSnackbar} from "notistack"
import { useDispatch } from "react-redux";
import { loginUser } from "../Actions/auth";
import { setUserId } from "../Redux/reducers/userId";
import { validateEmail, validatePhoneNumber } from "../Actions/validation";
import "./LoginPage.css";

const LoginPage = () => {
    const { enqueueSnackbar } = useSnackbar();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        emailOrPhone: "",
        password: "",
    });
    const [errorMsg, setErrorMsg] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrorMsg("");
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { emailOrPhone, password } = formData;

        if (!emailOrPhone) {
            setErrorMsg("enter email or phone number");
            return;
        } else if (!validateEmail (emailOrPhone) && !validatePhoneNumber(emailOrPhone)) {
            setErrorMsg("Invalid email and phone number format");
            return;
        } else if (!password) {
            setErrorMsg("enter password");
            return;
        }
        try {
            const response = await loginUser(formData);
            console.log("response =", response);
            if (response.status) {
                dispatch(setUserId (response.data.userId));
                enqueueSnackbar(response.message, { variant: "success" });
                navigate("/login_otp");
            } else if (response.error) {
                setErrorMsg(response.message);
                return;
            }
        } catch (error) {
            console.log("loginUser error");
        }
    };

    return (
        <div className="loginPage_container authPage_container">
            <Link className="skip_btn" to="/authPage">
                <img src="./arrow-left@2x.svg" alt="" />
            </Link>
            <h2 className="brand_name">Welcome back! Glad to see you, Again!</h2>
            <form onSubmit={handleSubmit}>
                {errorMsg && (
                    <Alert className="error_msg" variant="outlined" severity="error">
                        {errorMsg}
                    </Alert>
                )}
                <input type="text" name="emailOrPhone" placeholder="Enter Email ID or Phone Number"  onChange={handleInputChange} />
                <input type="password" name="password" placeholder="Enter your password" onChange={handleInputChange} />
                <button className="auth_btn" style={{ background: "#fff", color: "#1facf3" }}>
                    Log In
                </button>
                <Link className="forgot_password" to="/forgot_password">
                    Forgot Password?
                </Link>
                <p>
                    Don’t have an account?
                    <Link className="forgot_password register_link" to="/register">
                        Register Now
                    </Link>
                </p>
            </form>
            <img src="./Frame.svg" className="frame_img" alt="frame_img" />
        </div>
    );
};

export default LoginPage;