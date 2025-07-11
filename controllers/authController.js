const {User, validationLoginUser, 
    validationRegisterUser,
validationUpdateUser}=require("../models/userModel");
const bcrypt = require('bcryptjs');
const asyncHandler=require("express-async-handler");

/**
 * @desc Register new user
 * @route /api/auth/register
 * @method post
 * @access public
 */
const register=asyncHandler(async(req,res)=>{
const {error}=validationRegisterUser(req.body);
if(error){
    return res.status(400).json({message:error.details[0].message});
}
let user=await User.findOne({email:req.body.email});
if(user){
    return res.status(400).json({message:"this user already registered"})
}
//hash password
const salt=await bcrypt.genSalt(10);
req.body.password=await bcrypt.hash(req.body.password,salt)

user=new User({
    email:req.body.email,
    userName:req.body.userName,
    password:req.body.password
});
const result =await user.save();
const token =user.generateToken();
const {password,...other}=result._doc;
res.status(201).json({...other,token})
})
/**
 * @desc Login user
 * @route /api/auth/login
 * @method post
 * @access public
 */
const login=asyncHandler(async(req,res)=>{
const {error}=validationLoginUser(req.body);
if(error){
    return res.status(400).json({message:error.details[0].message});
}
let user=await User.findOne({email:req.body.email});
if(!user){
    return res.status(400).json({message:"invalid email or password"})
}
//hash password
const isPasswordMatch=await bcrypt.compare(req.body.password,user.password)
if(!isPasswordMatch){
    return res.status(400).json({message:"invalid email or password"})
}
const token =user.generateToken();
const {password,...other}=user._doc;
res.status(200).json({...other,token})
})

module.exports={
    register,
    login
}