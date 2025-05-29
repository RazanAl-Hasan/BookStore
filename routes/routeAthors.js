const express = require("express");;
const {verifyToken 
    ,verifyTokenAndAuthorizeTheUser
    ,verifyTokenAndAdmin}=require("../middlewares/verifyToken");
const asyncHandler=require("express-async-handler");
const router = express.Router(); 
const Joi = require("joi"); 
const { Author,
validationUpdateAuthor,
validationCreateAuthor} = require("../models/authorModel");

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
 * @access private (only admin)
 */
router.post("/", verifyTokenAndAdmin , asyncHandler(async (req, res) => {
    const { error } = validationCreateAuthor(req.body); 
    if (error) {
        return res.status(400).json({ message:error.details[0].message });
    }
        const author = new Author({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality
        });
        const result = await author.save();
        res.status(201).json(result);
}));
/**
 * @desc Update an author by id
 * @route /api/authors/:id
 * @method PUT
 * @access private (only admin)
 */
router.put("/:id", verifyTokenAndAdmin,asyncHandler(async(req, res) => {
    const { error } = validationUpdateAuthor(req.body); 
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
 * @access private (only admin)
 */
router.delete("/:id",verifyTokenAndAdmin ,asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id); // استخدم req.params.id
    if (author) {
        await Author.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "The author has been deleted" });
    } else {
        res.status(404).json({ message: "Not found" });
    }}));


module.exports = router;
