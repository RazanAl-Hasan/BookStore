/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: عمليات تسجيل الدخول والتسجيل
 */

/**
 * @swagger
 * /api/auth/Register:
 *   post:
 *     summary: تسجيل مستخدم جديد
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - userName
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               userName:
 *                 type: string
 *                 example: Razan
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       201:
 *         description: تم إنشاء المستخدم بنجاح
 *       400:
 *         description: خطأ في البيانات المُدخلة أو المستخدم موجود مسبقًا
 */

/**
 * @swagger
 * /api/auth/Login:
 *   post:
 *     summary: تسجيل دخول مستخدم
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: تم تسجيل الدخول بنجاح
 *       400:
 *         description: البريد الإلكتروني أو كلمة المرور غير صحيحة
 */