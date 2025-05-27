const mongoose = require("mongoose");
const AuthorSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true, 
            trim: true,      
            minlength: 3,
            maxlength: 100
        },
        lastName: {
            type: String,
            required: true,  
            trim: true,     
            minlength: 3,
            maxlength: 100
        },
        nationality: {
            type: String,
            required: true,  
            trim: true,      
            minlength: 2,
            maxlength: 500
        },
        image: {
            type: String,
            default: "default.png"
        },
    },
    { timestamps: true, versionKey:false }
);
const Author = mongoose.model("Author", AuthorSchema);
module.exports = Author;
