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


// Validation Update a Author
function validationUpdateAuthor(obj) {
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(100).trim(),
        lastName: Joi.string().min(3).max(100).trim(),
        nationality:Joi.string().min(2).max(500).trim()
    });
    return schema.validate(obj);
}
// Validation Create a Author
function validationCreateAuthor(obj) {
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(100).trim().required(),
        lastName: Joi.string().min(3).max(100).trim().required(),
        nationality:Joi.string().min(2).max(500).trim().required()
    });
    return schema.validate(obj);
}

module.exports = {
    Author,
validationUpdateAuthor,
validationCreateAuthor
};
