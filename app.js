const express = require("express");
const routeBook = require("./routes/routeBook");
const routeAuthors = require("./routes/routeAthors"); 
const logger=require('./middlewares/logger')
const {errorHandler,notFound}=require('./middlewares/errors');
const mongoose = require("mongoose");

// الاتصال بقاعدة البيانات
mongoose.connect("mongodb://localhost/bookStoreDB") // تصحيح URI للاتصال بـ MongoDB
    .then(() => console.log("Connected to MongoDB")) // تصحيح الرسالة
    .catch((error) => console.log("Connection failed to MongoDB", error)); // تصحيح الخطأ الإملائي

// إنشاء التطبيق
const app = express();

app.use(logger);

// استخدام الميدل وير لتحليل JSON
app.use(express.json()); 

// تعريف المسارات
app.use("/api/books", routeBook);
app.use("/api/authors", routeAuthors);

//Error handlaer middelwares
app.use(notFound);
app.use(errorHandler);


// تشغيل الخادمr
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log('Server is running at PORT ' + PORT); 
});
