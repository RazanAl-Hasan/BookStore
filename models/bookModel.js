const { required, types } = require("joi");
const mongoose = require("mongoose");
const { trim } = require("validator");
const Joi = require("joi");
const BookSchema = new mongoose.Schema({
    title:{
        type:string,
        required:true,
        trim:true,
        minlength:3,
        maxlength:100
        
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Author',
        required:true
    },
    description:{
type:string,
        required:true,
        trim:true,
        minlength:100,
        maxlength:300
        
    },
    price:{
        type:true,
        required:true,
        minlength:0,
},
cover:{
    types:String,
    required:true,
    enum:["soft cover", " hard cover"]
}
},{timestamps:true});
const Book = mongoose.Model("Book",BookSchema);


function validationUpdateBook(obj) {
    const schema = Joi.object({
        title: Joi.string().min(3).max(250), // تصحيح الأخطاء الإملائية
        author: Joi.string().required(), 
        price:Joi.number().nim(0),
        cover:Joi.string()
        // إضافة عدد الصفحات كشرط مطلوب
    });
    return schema.validate(obj);
}

// Validation Create a Book
function validationCreateBook(obj) {
    const schema = Joi.object({
          title: Joi.string().min(3).max(250).required(), // تصحيح الأخطاء الإملائية
        author: Joi.string().required(), 
        price:Joi.number().nim(0),
        cover:Joi.string().required()
    });
    return schema.validate(obj);
}
module.exports={
    Book,
validationCreateBook,
validationUpdateBook
};
