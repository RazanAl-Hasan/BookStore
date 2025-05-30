const Joi = require("joi");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { trim } = require("validator");

//user schema
const userSchema=new  mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:5,
        maxlength:100,
        unique:true
        
    },
    userName:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:200,
        
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:6,
    },
    isAdmin:{
        type:Boolean,
        default:false
        
    }
},{timestamps:true , versionKey:false}) 

//generate Token
userSchema.method.generateToken=function(){ 
    return jwt.sign({id:this._id,isAdmin:this.isAdmin},process.env.JWT_SECRET_KEY);
}
const User=mongoose.model("User", userSchema);


//validate register user
function validationRegisterUser(obj){
const schema=Joi.object({
    email:Joi.string().max(100).min(5).required().email().trim(),
    userName:Joi.string().max(200).min(2).required().trim(),
    password:Joi.string().min(6).required().trim()
});
return schema.validate(obj);
}
//validate login user
function validationLoginUser(obj){
const schema=Joi.object({
    email:Joi.string().max(100).min(5).required().trim().email(),
    password:Joi.string().min(6).required().trim(),
});
return schema.validate(obj);
}
//validate upgate user
function validationUpdateUser(obj){
const schema=Joi.object({
    email:Joi.string().max(100).min(5).trim().email(),
    userName:Joi.string().max(200).min(2).trim(),
    password:Joi.string().min(6).trim()
});
return schema.validate(obj);
}


module.exports={
    User,
    validationLoginUser,
    validationRegisterUser,
    validationUpdateUser
};