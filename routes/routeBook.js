const express = require("express");
const {validationCreateBook,validationUpdateBook}=require("../models/bookModel");
const router = express.Router(); // استخدم Router بدلاً من Express
router.use(express.json());

const books = [
    {
        id: 1,
        name: "A",
        pages: 300
    },
    {
        id: 2,
        name: "B",
        pages: 500
    }
];
/**
 * @desc Get all Books
 * @route /api/books
 * @method GET
 * @access public
 */
router.get("/", (req, res) => {
    res.json(books);
});
/**
 * @desc Get a book by id
 * @route /api/books/:id
 * @method GET
 * @access public
 */
router.get("/:id", (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id)); // استخدم === بدلاً من =
    if (book) {
        res.status(200).send(book);
    } else {
        res.status(404).send("The book not found");
    }
});
/**
 * @desc Create new book
 * @route /api/books
 * @method POST
 * @access public
 */
router.post("/", (req, res) => {
    const { error } = validationCreateBook(req.body); // تصحيح الاسم إلى validationCreateBook
    if (error) {
        return res.status(400).json(error.details[0].message); // تصحيح الخطأ الإملائي
    }
    const book = {
        id: books.length + 1,
        title: req.body.title,
        description: req.body.description,
        price:req.body.price,
        cover:req.body.cover // إضافة عدد الصفحات
    };
    books.push(book);
    res.status(201).json(book);
});
/**
 * @desc Delete a book by id
 * @route /api/books/:id
 * @method DELETE
 * @access public
 */
router.delete("/:id", (req, res) => { // إضافة req و res كوسائط
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id)); // استخدم req.params.id
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1); // حذف الكتاب من المصفوفة
        res.status(200).json({ message: "The book has been deleted" });
    } else {
        res.status(404).json({ message: "Not found" });
    }
});
/**
 * @desc Update a book by id
 * @route /api/books/:id
 * @method PUT
 * @access public
 */
router.put("/:id", (req, res) => { // إضافة req و res كوسائط
    const { error } = validationUpdateBook(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const book = books.find(b => b.id === parseInt(req.params.id)); // استخدم req.params.id
    if (book) {
        book.title = req.body.title; // تحديث اسم الكتاب
        book.description = req.body.description;
        book.cover=req.body.cover;
        book.price=req.body.price; // تحديث عدد الصفحات
        res.status(200).json({ message: "The book has been updated" });
    } else {
        res.status(404).json({ message: "Not found" });
    }
});
module.exports = router;
