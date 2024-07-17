
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { registerUser } from "../Actions/auth";
import { validateEmail, validatePhoneNumber } from "../Actions/validation";
import { setUser } from "../Redux/reducers/user";
const RegisterPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        emailOrPhone: "",
        password: "",
        confirmPassword: "",
    });
    const [errorMsg, setErrorMsg] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrorMsg("");
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, emailOrPhone, password, confirmPassword } = formData;

        if (!username) {
            setErrorMsg("enter username");
            return;
        } else if (!emailOrPhone) {
            setErrorMsg("enter email or phone number");
            return;
        } else if (!validateEmail(emailOrPhone) && !validatePhoneNumber(emailOrPhone)) {
            setErrorMsg("Invalid email and phone number format");
            return;
        } else if (!password) {
            setErrorMsg("enter password");
            return;
        } else if (!confirmPassword) {
            setErrorMsg("enter confirm password");
            return;
        } else if (password !== confirmPassword) {
            setErrorMsg("passwords do not match");
            return;
        }
        try {
            const response = await registerUser(formData);
            console.log("response =", response);
            if (response.status) {
                // dispatch(setUser(response.data));
                // enqueueSnackbar(response.message, { variant: "success" });
                console.log("navigate home");
                navigate("/home");
            } else if (response.error) {
                setErrorMsg(response.message);
                return;
            }
        } catch (error) {
            console.log("registerUser error");
        }
    };

    return (
        <div className="loginPage_container authPage_container">
            <Link className="skip_btn" to="/authPage">
                <img src="./arrow-left@2x.svg" alt="" />
            </Link>

            <h2 className="brand_name">Hey There ! Welcome</h2>
            <form onSubmit={handleSubmit}>
                {errorMsg && (
                    <Alert className="error_msg" variant="outlined" severity="error">
                        {errorMsg}
                    </Alert>
                )}
                <input type="text" name="username" placeholder="Enter Name" onChange={handleInputChange} />
                <input type="text" name="emailOrPhone" placeholder="Enter Email ID or Phone Number" onChange={handleInputChange} />
                <input type="password" name="password" placeholder="Enter your password" onChange={handleInputChange} />
                <input type="password" name="confirmPassword" placeholder="Confirm password" onChange={handleInputChange} />
                <button className="auth_btn" to="/home" style={{ background: "#fff", color: "#1facf3" }}>
                    Register
                </button>

                <p>
                    Already have an account?
                    <Link className="forgot_password link" to="/login">
                        Log In
                    </Link>
                </p>
            </form>
            <img src="./Frame.svg" className="frame_img" alt="frame_img" />
        </div>
    );
};

export default RegisterPage;
