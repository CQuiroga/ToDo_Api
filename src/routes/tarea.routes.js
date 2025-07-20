const express = require('express');
const router = express.Router();
const controlador = require('../controllers/tarea.controller');

// CRUD
/**
 * @swagger
 * tags:
 *   - name: Tareas
 *     description: Operaciones CRUD sobre tareas
 */

/**
 * @swagger
 * /api/tareas:
 *   get:
 *     tags:
 *       - Tareas
 *     summary: Obtiene la lista de tareas
 *     responses:
 *       200:
 *         description: Lista de tareas
 */
router.get('/', controlador.listar);

/**
 * @swagger
 * /api/tareas/{id}:
 *   get:
 *     tags:
 *       - Tareas
 *     summary: Obtiene una tarea por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Datos de la tarea
 *       404:
 *         description: Tarea no encontrada
 */
router.get('/:id', controlador.obtener);

/**
 * @swagger
 * /api/tareas:
 *   post:
 *     tags:
 *       - Tareas
 *     summary: Crea una nueva tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *             properties:
 *               titulo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tarea creada
 */
router.post('/', controlador.crear);

/**
 * @swagger
 * /api/tareas/{id}:
 *   put:
 *     tags:
 *       - Tareas
 *     summary: Actualiza una tarea
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               completado:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Tarea actualizada
 *       404:
 *         description: Tarea no encontrada
 */
router.put('/:id', controlador.actualizar);

/**
 * @swagger
 * /api/tareas/{id}:
 *   delete:
 *     tags:
 *       - Tareas
 *     summary: Elimina una tarea
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Tarea eliminada
 *       404:
 *         description: Tarea no encontrada
 */
router.delete('/:id', controlador.eliminar);

module.exports = router;
