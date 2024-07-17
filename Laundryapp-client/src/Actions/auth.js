// import axios from "../config/axiosConfig";
import axios from "axios";



export const registerUser = async (formData) => {
    try {
        const response = await axios.post("http://localhost:2006/api/register", formData);
        console.log("Registration successful:", response.data);
        console.log("token=", response.data.token);
        if (response.data) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("data", JSON.stringify(response.data.data));
        }

        return response.data;
    } catch (error) {
        console.log("registration error =", error.response.data);
        return error.response.data;
    }
};

export const loginUser = async (formData) => {
    try {
        const response = await axios.post("http://localhost:2006/api/login", formData);
        console.log("successful:", response.data);
        return response.data;
    } catch (error) {
        console.log("login error =", error.response.data);
        return error.response.data;
    }
};

export const verifyOtpLogin = async (formData) => {
    try {
        const response = await axios.post("http://localhost:2006/api/verify_otp_login", formData);
        console.log("verify otp successful:", response.data);
        console.log("token=", response.data.token);
        if (response.data) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("data", JSON.stringify(response.data.data));
        }
        return response.data;
    } catch (error) {
        console.log("verify otp error =", error.response.data);
        return error.response.data;
    }
};

export const verifyOtp = async (formData) => {
    try {
        const response = await axios.post("http://localhost:2006/api/verify_otp", formData);
        console.log("verify otp successful:", response.data);
        return response.data;
    } catch (error) {
        console.log("verify otp error =", error.response.data);
        return error.response.data;
    }
};

export const sendOTP = async (formData) => {
    try {
        const response = await axios.post("http://localhost:2006/api/send_otp", formData);
        console.log("OTP send successful:", response.data);
        return response.data;
    } catch (error) {
        console.log("OTP error =", error.response.data);
        return error.response.data;
    }
};

export const createPassword = async (formData) => {
    try {
        const response = await axios.patch("http://localhost:2006/api/create_password", formData);
        console.log("create password successful:", response.data);
        return response.data;
    } catch (error) {
        console.log("create password error =", error.response.data);
        return error.response.data;
    }
};

export const authentication = async () => {
    const token = localStorage.getItem("token");
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    try {
        const response = await axios.get("http://localhost:2006/api/authentication", { headers });
        console.log("authentication successful:", response.data);
        return response.data;
    } catch (error) {
        console.log("authentication error =", error.response.data);
        return error.response.data;
    }
};