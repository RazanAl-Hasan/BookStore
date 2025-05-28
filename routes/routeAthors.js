const express = require("express");
const asyncHandler=require("express-async-handler");
const router = express.Router(); 
const Joi = require("joi"); 
const Author = require("../models/authorModel");

 //

/**
 * @desc Get all Authors
 * @route /api/authors
 * @method GET
 * @access public
 */
router.get("/", asyncHandler(
    async(req,res)=>{
        const author=await Author.find();
        res.status(200).json(author);
    }
));

/**
 * @desc Get one Author
 * @route /api/authors/:id
 * @method GET
 * @access public
 */
router.get("/:id", asyncHandler(
    async(req, res) => {
const author = await Author.findById(req.params.id)
    if (author) {
        res.status(200).json(author);
    } else {
        res.status(404).json({ message: "The author not found" });
    }}
));

/**
 * @desc Create new Author
 * @route /api/authors
 * @method POST
 * @access public
 */
router.post("/", asyncHandler(async (req, res) => {
    // const { error } = validationCreateAuthor(req.body); // تصحيح الاسم إلى validationCreateAuthor
    // if (error) {
    //     return res.status(400).json({ message: "The information is wrong" });
    // }
        const author = new Author({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality
        });
        const result = await author.save(); // استخدم كائن المؤلف لحفظه
        res.status(201).json(result);
}));

/**
 * @desc Update an author by id
 * @route /api/authors/:id
 * @method PUT
 * @access public
 */
router.put("/:id", asyncHandler(async(req, res) => {
    const { error } = validationUpdateAuthor(req.body); // تصحيح الاسم إلى validationUpdateAuthor
    if (error) {
        return res.status(400).json({ message: error.details[0].message});
    }
    const author =await Author.findByIdAndUpdate(req.params.id,{
        $set:{
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            image:req.body.image
            }
    })
    res.status(200).json(author);
}));
/**
 * @desc Delete an author by id
 * @route /api/authors/:id
 * @method DELETE
 * @access public
 */
router.delete("/:id",asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id); // استخدم req.params.id
    if (author) {
        await Author.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "The author has been deleted" });
    } else {
        res.status(404).json({ message: "Not found" });
    }}));

// Validation update Authors
function validationUpdateAuthor(obj) {
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(10).required(),
        lastName: Joi.string().min(3).max(10).required(),
        nationality: Joi.string().required()
    });
    return schema.validate(obj);
}

// Validation create Authors
function validationCreateAuthor(obj) {
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(10).required(),
        lastName: Joi.string().min(3).max(10).required(),
        nationality: Joi.string().required()
    });
    return schema.validate(obj);
}

module.exports = router;
