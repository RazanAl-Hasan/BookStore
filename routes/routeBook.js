const express = require("express");
const asyncHandler=require("express-async-handler");
const {verifyToken 
    ,verifyTokenAndAuthorizeTheUser
    ,verifyTokenAndAdmin}=require("../middlewares/verifyToken");
const {validationCreateBook,validationUpdateBook,Book}=require("../models/bookModel");
const router = express.Router(); // استخدم Router بدلاً من Express
router.use(express.json());
/**
 * @desc Get all Books
 * @route /api/books
 * @method GET
 * @access public
 */
router.get("/", asyncHandler( async(req, res) => {
    const {pageNumber}=req.query;
    const booksPerPage=2;
    const books=await Book.find()
                        .skip((pageNumber-1)*booksPerPage).limit(booksPerPage);
    res.json(books);
}));
/**
 * @desc Get a book by id
 * @route /api/books/:id
 * @method GET
 * @access public
 */
router.get("/:id",asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id)
    if (book) {
        res.status(200).send(book);
    } else {
        res.status(404).send("The book not found");
    }
}));
/**
 * @desc Create new book
 * @route /api/books
 * @method POST
 * @access private (only admin)
 */
router.post("/",verifyTokenAndAdmin, asyncHandler(async(req, res) => {
    const { error } = validationCreateBook(req.body); 
    if (error) {
        return res.status(400).json(error.details[0].message); }
    const book =new Book ({
        title: req.body.title,
        description: req.body.description,
        price:req.body.price,
        cover:req.body.cover 
    });
    const result =await book.save();
    res.status(201).json(result);
}));
/**
 * @desc Delete a book by id
 * @route /api/books/:id
 * @method DELETE
 * @access private (only admin)
 */
router.delete("/:id",verifyTokenAndAdmin, asyncHandler(async(req, res) => { 
    const book=await Book.findById(req.params.id)
if(book){
    const bookIndex =await Book.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "The book has been deleted" });}
    else{
        res.status(404).json({ message: "Not found" });}
}));
/**
 * @desc Update a book by id
 * @route /api/books/:id
 * @method PUT
 * @access private (only admin)
 */
router.put("/:id",verifyTokenAndAdmin, asyncHandler(async(req, res) => { 
    const { error } = validationUpdateBook(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
}
    const book = await Book.findByIdAndUpdate(req.params.id,{
$set:{
        title:req.body.title, 
        description:req.body.description,
        cover:req.body.cover,
        price:req.body.price
}},
{new:true});
res.status(200).json({book})
}));



module.exports = router;
