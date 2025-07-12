/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: عمليات إدارة المؤلفين (CRUD)
 */

/**
 * @swagger
 * /api/authors:
 *   get:
 *     summary: جلب كل المؤلفين (مع دعم التصفح بالصفحات)
 *     tags: [Authors]
 *     parameters:
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: integer
 *         description: رقم الصفحة المطلوبة
 *     responses:
 *       200:
 *         description: قائمة المؤلفين
 */

/**
 * @swagger
 * /api/authors/{id}:
 *   get:
 *     summary: جلب مؤلف حسب المعرّف
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: معرف المؤلف
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: تفاصيل المؤلف
 *       404:
 *         description: لم يتم العثور على المؤلف
 */

/**
 * @swagger
 * /api/authors:
 *   post:
 *     summary: إنشاء مؤلف جديد (Admin فقط)
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - nationality
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Naguib
 *               lastName:
 *                 type: string
 *                 example: Mahfouz
 *               nationality:
 *                 type: string
 *                 example: Egyptian
 *     responses:
 *       201:
 *         description: تم إنشاء المؤلف بنجاح
 *       400:
 *         description: بيانات غير صالحة
 *       401:
 *         description: غير مصرح
 */

/**
 * @swagger
 * /api/authors/{id}:
 *   put:
 *     summary: تعديل بيانات مؤلف (Admin فقط)
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف المؤلف
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               nationality:
 *                 type: string
 *               image:
 *                 type: string
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
 * /api/authors/{id}:
 *   delete:
 *     summary: حذف مؤلف (Admin فقط)
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: معرف المؤلف
 *     responses:
 *       200:
 *         description: تم الحذف بنجاح
 *       404:
 *         description: لم يتم العثور على المؤلف
 *       401:
 *         description: غير مصرح
 */