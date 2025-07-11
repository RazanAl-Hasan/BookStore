const express = require('express');
const logger = require('./middlewares/logger');
const { errorHandler, notFound } = require('./middlewares/errors');
const connectToDB = require('./config/db');
const { extend } = require('joi');
const path = require('path');
const helmet=require("helmet");
require('dotenv').config();

// الاتصال بقاعدة البيانات
connectToDB();

// إنشاء التطبيق
const app = express();

//static folder
app.use(express.static(path.join(__dirname, './images')));

// استخدام الميدل وير لتحليل JSON
app.use(express.json());
app.use(express.urlencoded({ extend: false }));
app.use(logger);
app.set('view engine', 'ejs');

// helmet
app.use(helmet());

// تعريف المسارات
app.use('/api/books', require('./routes/routeBook'));
app.use('/api/authors', require('./routes/routeAthors'));
app.use('/api/auth', require('./routes/routeAuth'));
app.use('/api/users', require('./routes/routeUser'));
app.use('/api/upload', require('./routes/routeUpload'));
app.use('/password', require('./routes/routePassword'));

//Error handlaer middelwares
app.use(notFound);
app.use(errorHandler);

// تشغيل الخادمr
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running at PORT ' + PORT);
});
