const express = require("express");
const jwt = require("jsonwebtoken");
const asyncHandler=require("express-async-handler");
const router = require("./routeBook");
const {verifyToken ,verifyTokenAndAuthorizeTheUser}=require("../middlewares/verifyToken")
const {User,validationUpdateUser,verifyTokenAndAdmin}=require("../models/userModel");
const bcrypt=require("bcryptjs");

/**
 * @desc update user
 * @route /api/users/:id
 * @method put
 * @access private
 */
router.put("/:id", verifyTokenAndAuthorizeTheUser ,asyncHandler(async(req,res)=>{
    
    const {error}=validationUpdateUser(req.body);
    if(error){
    res.status(400).json({message:"invalid information"})
}
if(req.body.password){
    const salt=await bcrypt.genSalt(10);
    req.body.password=await bcrypt.hash(req.body.password, salt);
}
const updatedUser=await User.findByIdAndUpdate(req.params.id,{
    $set:{
        email:req.body.email,
        password:req.body.password,
        username:req.body.username,
    }
},{new:true}).select("-password");

res.status(200).json(updatedUser);
}))


/**
 * @desc get all user
 * @route /api/users
 * @method GET 
 * @access private (only Admin)
 */
router.get("/", verifyTokenAndAdmin ,asyncHandler(async(req,res)=>{
const users=await User.find().select("-password");
res.status(200).json(users);
}));

/**
 * @desc get user by id
 * @route /api/users/:id
 * @method GET 
 * @access private (only Admin & user himselft)
 */
router.get("/:id", verifyTokenAndAuthorizeTheUser,asyncHandler(async(req,res)=>{
const user=await User.findById(req.params.id).select("-password");
if(user){
    res.status(200).json(user);
}else{
    res.status(404).json({message:"not found this user"});
}
}));

/**
 * @desc delete user
 * @route /api/users/:id
 * @method delete
 * @access private (only Admin & user himselft)
 */
router.get("/:id", verifyTokenAndAuthorizeTheUser,asyncHandler(async(req,res)=>{
const user=await User.findById(req.params.id).select("-password");
if(user){
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({message:"user has been deleted "});
}else{
    res.status(404).json({message:"not found this user"});
}
}));

module.exports=router;