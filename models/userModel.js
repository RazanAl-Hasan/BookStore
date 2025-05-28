const Joi = require("joi");
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
},{timeseries:true , versionKey:false}) 