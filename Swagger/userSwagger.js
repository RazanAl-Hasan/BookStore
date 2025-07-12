/**
 * @swagger
 * tags:
 *   name: Users
 *   description: إدارة المستخدمين (تعديل، حذف، عرض)
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: تعديل بيانات المستخدم
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف المستخدم
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: newemail@example.com
 *               password:
 *                 type: string
 *                 example: NewStrongPass123
 *               username:
 *                 type: string
 *                 example: NewUsername
 *     responses:
 *       200:
 *         description: تم التحديث بنجاح
 *       400:
 *         description: بيانات غير صالحة
 *       401:
 *         description: غير مصرح
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: جلب جميع المستخدمين (Admin فقط)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: قائمة المستخدمين (بدون كلمات مرور)
 *       401:
 *         description: غير مصرح
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: جلب مستخدم حسب معرفه
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف المستخدم
 *     responses:
 *       200:
 *         description: بيانات المستخدم
 *       404:
 *         description: لم يتم العثور على المستخدم
 *       401:
 *         description: غير مصرح
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: حذف مستخدم (Admin أو المستخدم نفسه)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف المستخدم
 *     responses:
 *       200:
 *         description: تم الحذف
 *       404:
 *         description: المستخدم غير موجود
 *       401:
 *         description: غير مصرح
 */