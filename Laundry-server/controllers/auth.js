const express = require("express");
const jwt = require("jsonwebtoken");
// const { userToken } = require("./token");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { createJWT } = require("../utils/jwt");
const env = require;

// // Token generation function
const maxAge = 1 * 24 * 60 * 60;


exports.register = async (req, res) => {
	console.log("req body = ", req.body);
    try {
        const { username, emailOrPhone, password } = req.body;
        const userExist = await User.findOne({ emailOrPhone }); // checking if the email or phone number is already use
        if (userExist) {
            console.log("user already exist".red.bold);
            res.status(400).json({ error: true, message: "user already exist" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, emailOrPhone, password: hashedPassword });
        newUser.save();
        const data = {
            username: newUser.username,
            emailOrPhone: newUser.emailOrPhone,
        };
        const token = await createJWT(data);
        console.log({ token });

        res.status(200).json({ error: false, status: true, message: "user registered successfully", data, token });
        console.log("user register successfully");
    } catch (error) {
        console.log("server error ", error);
        res.status(500).json({ error: true, status: false, message: "server error" });
    }
};
	
	exports.login = async (req, res) => {
		console.log("in login api");
		try {
		const { emailOrPhone, password } = req.body;
		console.log("req.body", req.body);
		const user = await Users.findOne({ emailorphonenumber: emailOrPhone });
		console.log("user=", user);
		if (!user) {
			return res.json({ status: false, message: "User does not exist" });
		}
		const isPasswordValid = await bcrypt.compare(password, user.hashedpassword);
		if (!isPasswordValid) {
			console.log("Invalid password");
			return res.status(401).json({ status: false, message: "Invalid password" });
		}
		const token = jwt.sign({ id: user._id }, "user secret key", {
			expiresIn: maxAge,
		});
		console.log(token, "tokeeeeeeeeeeeeeeeennnnn");
		const username = user.username;
		const id = user._id;
		
		res.status(200).json({ error: false, status: true, message: "Login successfull",data:{token, username, id}  });
		
		console.log("Login successfull");
	} catch (error) {
		console.log("server error", error);
		res.status(500).json({ error: true, status: false, message: "Server error" });
	}
};

































// exports.mobile = async (req, res) => {
	// 	console.log(req.body);
	// };
	
	// 	const token=req.cookies.jwt
	
	// 	if(token){
		// 		jwt.verify(token,async(error)=>{
			// 			if(token){
				// 				console.log("there is token");
				
				// 			}
				// 			else{
					
				// 			}
				// 		})
				// 	}
				// exports.login = async (req, res) => {
// 	const { email, password } = req.body;
// 	console.log("req.body",req.body);
// 	const user = await Users.findOne({ email});
// 	if (user) {
	// 		if (user.password === password) {
		// 			console.log("success");
		// 			res.json("success");
// 		} else {
// 			console.log("not success");
// 			res.json(" not success");
// 		}
// 	} else {
// 		res.json("user does not exist");
// 	}
// };
