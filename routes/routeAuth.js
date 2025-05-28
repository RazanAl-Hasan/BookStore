const express = require("express");
const asyncHandler=require("express-async-handler");
const router = require("./routeBook");
const {User, validationLoginUser, 
    validationRegisterUser,
validationUpdateUser}=require("../models/userModel")


/**
 * @desc Register new user
 * @route /api/auth/register
 * @method post
 * @access public
 */
router.post("/Register" , asyncHandler(async(req,res)=>{
const {error}=validationRegisterUser(req.body);
if(error){
    return res.status(400).json({message:error.details[0].message});
}
let user=await User.findone({email:req.body.email});
if(user){
    return res.status(400).json({message:"this user already registered"})
}
user=new User({
    email:req.body.email,
    userName:req.body.userName,
    password:req.body.password,
    isAdmin:req.body.isAdmin
});
const result =await user.save();
res.status(201).json(result)
}))

module.exports=router;
