const express = require("express");
const {verifyToken 
    ,verifyTokenAndAuthorizeTheUser
    ,verifyTokenAndAdmin}=require("../middlewares/verifyToken");
const router = express.Router(); // استخدم Router بدلاً من Express
const {getAllBooks,
        getBookById,
        createBook,
        deleteBook,
        updateBook}=require("../controllers/bookController")
router.use(express.json());

router.get("/", getAllBooks);
router.get("/:id",getBookById);
router.post("/",verifyTokenAndAdmin,createBook);
router.delete("/:id",verifyTokenAndAdmin,deleteBook);
router.put("/:id",verifyTokenAndAdmin, updateBook);
module.exports = router;
