const mongoose = require("mongoose");
async function connectToDB(){
    // الاتصال بقاعدة البيانات
    try {
        await mongoose
        .connect(process.env.MONGO_URL) // تصحيح URI للاتصال بـ MongoDB
        console.log("Connected to MongoDB")
    } catch (error) {
    console.log("Connection failed to MongoDB", error)
    }}
    module.exports=connectToDB;
