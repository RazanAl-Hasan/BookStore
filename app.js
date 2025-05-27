const express = require("express");
const routeBook = require("./routes/routeBook");
const routeAuthors = require("./routes/routeAthors"); // تصحيح الاسم هنا
const mongoose = require("mongoose");

// الاتصال بقاعدة البيانات
mongoose.connect("mongodb://localhost/bookStoreDB") // تصحيح URI للاتصال بـ MongoDB
    .then(() => console.log("Connected to MongoDB")) // تصحيح الرسالة
    .catch((error) => console.log("Connection failed to MongoDB", error)); // تصحيح الخطأ الإملائي

// إنشاء التطبيق
const app = express();

// استخدام الميدل وير لتحليل JSON
app.use(express.json()); // إضافة هذه السطر لتحليل JSON في الطلبات

// تعريف المسارات
app.use("/api/books", routeBook);
app.use("/api/authors", routeAuthors);

// تشغيل الخادم
const port = 3000; 
app.listen(port, () => {
    console.log('Server is running at port ' + port); // تصحيح الرسالة
});
