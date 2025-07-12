/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: رفع الصور إلى الخادم
 */

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: رفع صورة واحدة
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: تم رفع الصورة بنجاح
 *       400:
 *         description: لم يتم إرسال أي صورة
 */
