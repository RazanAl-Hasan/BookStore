const express = require("express");
const logger=require('./middlewares/logger')
const {errorHandler,notFound}=require('./middlewares/errors');
const connectToDB=require("./config/db");
require("dotenv").config();

// الاتصال بقاعدة البيانات
connectToDB();

// إنشاء التطبيق
const app = express();

// استخدام الميدل وير لتحليل JSON
app.use(express.json()); 
app.use(logger);

// تعريف المسارات
app.use("/api/books", require("./routes/routeBook"));
app.use("/api/authors", require("./routes/routeAthors"));
app.use("/api/auth", require("./routes/routeAuth"));
app.use("/api/users", require("./routes/routeUser"));

//Error handlaer middelwares
app.use(notFound);
app.use(errorHandler);

// تشغيل الخادمr
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log('Server is running at PORT ' + PORT); 
});
