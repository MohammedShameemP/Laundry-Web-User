


const express = require('express');
const Product = require('../models/product');

exports.all_products = async (req, res) => {
    try {
        const all_products = await Product.find();
        console.log(("all_products"));
        res.status(200).json({ error: false, status: true, message: "Products are listed", data: all_products });
    } catch (error) {
        res.status(500).json({ error: true, status: false, message: "Server error", data: error });
    }
};
