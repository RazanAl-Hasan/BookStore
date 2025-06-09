const express = require("express");
const router = require("./routeBook");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const {register,login}=require("../controllers/authController")

router.post("/Register",register);
router.post("/Login",login)

module.exports=router;
