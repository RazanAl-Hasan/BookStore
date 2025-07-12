/**
 * @swagger
 * tags:
 *   name: Books
 *   description: إدارة الكتب (عرض، إنشاء، تعديل، حذف)
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: جلب كل الكتب (مع دعم التصفح بالصفحات)
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: integer
 *         description: رقم الصفحة المطلوبة
 *     responses:
 *       200:
 *         description: قائمة الكتب
 */

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: جلب كتاب حسب المعرّف
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: معرف الكتاب
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: تفاصيل الكتاب
 *       404:
 *         description: لم يتم العثور على الكتاب
 */

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: إنشاء كتاب جديد (Admin فقط)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - cover
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *                 example: The Great Gatsby
 *               description:
 *                 type: string
 *                 example: Classic novel set in 1920s America
 *               cover:
 *                 type: string
 *                 example: https://example.com/image.jpg
 *               price:
 *                 type: number
 *                 example: 19.99
 *     responses:
 *       201:
 *         description: تم إنشاء الكتاب
 *       400:
 *         description: فشل في التحقق من البيانات
 *       401:
 *         description: غير مصرح (Admin فقط)
 */

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: تعديل كتاب (Admin فقط)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف الكتاب
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               cover:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: تم التحديث
 *       400:
 *         description: بيانات غير صالحة
 *       401:
 *         description: غير مصرح
 */

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: حذف كتاب (Admin فقط)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف الكتاب
 *     responses:
 *       200:
 *         description: تم الحذف
 *       404:
 *         description: لم يتم العثور على الكتاب
 *       401:
 *         description: غير مصرح
 */