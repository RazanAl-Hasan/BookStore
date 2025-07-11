const express=require("express");
const multer = require("multer");
const router=express.Router();
const path=require("path");

const storage =multer.diskStorage({
destination:function(req,file,cb){
cb(null,path.join(__dirname,"../images"));},
filename:function(req,file,cb){
    cb(null ,new Date().toISOString().replace(/:/g,"-")+file.originalname);}
})

const upload=multer({storage});

// api/upload
router.post("/",upload.single("images"),(req,res)=>{
    res.status(200).json({message:"upload seccess"});
})
module.exports=router;