import React from "react";

import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import "./SplashPage.css";
const SplashPage = () => {
	return (
		
        <div className="splash_container">
            <Link className="skip_btn" to="/AuthPage">
                Skip
            </Link>

			<div className="splash_contents">
				<img src="./Group 1139.svg" className="content_img" alt="img1" />
                <div className="contents">
                    <h1 className="">Get your Laundry and Dry cleaning in 24 hours</h1>
                    <p>A convenient laundry solution that helps protect the enviornment</p>
                </div>
			</div>
            <img className="bottom_img" src="./image 2.svg" alt="img2" />
            <button></button>
            <Button className="arrow_btn" onClick={() => console.log(true)}>
                <ArrowForwardIcon />
            </Button>
		</div>
	);
};

export default SplashPage;
