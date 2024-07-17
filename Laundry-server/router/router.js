const express = require("express");
// const { register,login } = require("../middleware/");
const { all_services } = require("../controllers/servicescontroller");
const { all_products } = require("../controllers/productcontroller");
const { register, login } = require("../controllers/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login",login);
// router.post("/mobile",mobile);


// service router

router.get("/all_services",all_services);
router.get("/all_products",all_products);









module.exports = router;


 