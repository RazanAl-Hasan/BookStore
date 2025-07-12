/**
 * @swagger
 * tags:
 *   name: Password
 *   description: عمليات استعادة كلمة المرور عبر البريد الإلكتروني
 */

/**
 * @swagger
 * /password/forgot-password:
 *   get:
 *     summary: عرض صفحة "نسيت كلمة المرور"
 *     tags: [Password]
 *     responses:
 *       200:
 *         description: صفحة إدخال البريد الإلكتروني
 */

/**
 * @swagger
 * /password/forgot-password:
 *   post:
 *     summary: إرسال رابط إعادة تعيين كلمة المرور إلى البريد
 *     tags: [Password]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: تم إرسال الرابط إلى البريد الإلكتروني
 *       404:
 *         description: المستخدم غير موجود
 */

/**
 * @swagger
 * /password/reset-password/{userId}/{token}:
 *   get:
 *     summary: عرض صفحة إعادة تعيين كلمة المرور
 *     tags: [Password]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف المستخدم
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: التوكن المرسل عبر الإيميل
 *     responses:
 *       200:
 *         description: عرض نموذج إعادة التعيين
 *       404:
 *         description: المستخدم غير موجود
 *       400:
 *         description: رابط غير صالح أو منتهي الصلاحية
 */

/**
 * @swagger
 * /password/reset-password/{userId}/{token}:
 *   post:
 *     summary: حفظ كلمة المرور الجديدة بعد إعادة التعيين
 *     tags: [Password]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 example: newStrongPassword123
 *     responses:
 *       200:
 *         description: تم تحديث كلمة المرور بنجاح
 *       404:
 *         description: المستخدم غير موجود
 *       400:
 *         description: رابط منتهي الصلاحية أو غير صالح
 */

