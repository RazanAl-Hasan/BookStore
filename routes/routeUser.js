const express = require("express");
const jwt = require("jsonwebtoken");
const router = require("./routeBook");
const {verifyToken ,verifyTokenAndAuthorizeTheUser,verifyTokenAndAdmin}=require("../middlewares/verifyToken")
const bcrypt=require("bcryptjs");
const {updateUser,getAllUser,
    deleteUser,getUserById}=require("../controllers/userController")
router.put("/:id", verifyTokenAndAuthorizeTheUser,updateUser )
router.get("/", verifyTokenAndAdmin,getAllUser);
router.get("/:id", verifyTokenAndAuthorizeTheUser,getUserById);
router.delete("/:id", verifyTokenAndAuthorizeTheUser,deleteUser);
module.exports=router;