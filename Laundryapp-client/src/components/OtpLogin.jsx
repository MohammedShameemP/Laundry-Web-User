import { Link, useNavigate } from "react-router-dom";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./OtpPage.css";
import { Alert } from "@mui/material";
import { useSnackbar } from "notistack";
import { sendOTP, verifyOtpLogin } from "../Actions/auth";
import { setUserId } from "../Redux/reducers/userId";
import { setUser } from "../Redux/reducers/user";

const OtpLogin = () => {
    const { enqueueSnackbar } = useSnackbar();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const { userId } = useSelector((state) => state.userId);
    const handleChange = (newValue) => {
        setOtp(newValue);
        setErrorMsg("");
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!otp) {
            setErrorMsg("enter OTP");
            return;
        }
        const formData = { userId, otp };
        console.log(formData);
        const response = await verifyOtpLogin(formData);
        if (response.status) {
            dispatch(setUser(response.data));
            enqueueSnackbar("Login Successful", { variant: "success" });
            navigate("/home");
        } else if (response.error) {
            setErrorMsg(response.message);
        }
    };

    const handleResendOTP = async () => {
        const formData = {
            userId: userId,
        };
        const response = await sendOTP(formData);
        console.log("response", response);
        if (response.status) {
            dispatch(setUserId(response.data.userId));
            enqueueSnackbar("OTP resended !", { variant: "info" });
        } else if (response.error) {
            setErrorMsg(response.message);
        }
    };

    return (
        <div className="loginPage_container authPage_container otp_container">
            <Link className="skip_btn" to="/authPage">
                <img src="./arrow-left@2x.svg" alt="" />
            </Link>
            <h2 className="brand_name">We have sent you an OTP</h2>
            <form onSubmit={handleSubmit}>
                {errorMsg && (
                    <Alert className="error_msg" variant="outlined" severity="error">
                        {errorMsg}
                    </Alert>
                )}
                <MuiOtpInput className="otp_input" value={otp} onChange={handleChange} />
                <p>
                    Don’t recieve OTP?
                    <span className="forgot_password link" onClick={handleResendOTP}>
                        RESEND OTP
                    </span>
                </p>
                <button className="auth_btn" style={{ background: "#fff", color: "#1facf3" }}>
                    Next
                </button>
            </form>
            <img src="./Frame.svg" className="frame_img" alt="frame_img" />
        </div>
    );
};

export default OtpLogin;