const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const Carro = require('./carroModel');

const app = express();
const PORT = 3000;

// Conexión a la base de datos
mongoose.connect('mongodb://127.0.0.1:27017/carros', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(cors());

// Definición de la documentación Swagger
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API de Carros',
        version: '1.0.0',
        description: 'Una API para realizar operaciones CRUD en la entidad de carros.',
    },
    servers: [
        {
            url: `http://localhost:${PORT}`,
            description: 'Servidor local',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./app.js'], // Especifica el archivo donde tienes tus rutas
};

const swaggerSpec = swaggerJSDoc(options);

// Ruta para la documentación de Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


// Ruta para crear un nuevo carro
/**
 * @swagger
 * /carros:
 *   post:
 *     summary: Crea un nuevo carro
 *     tags:
 *       - Carros
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               marca:
 *                 type: string
 *               modelo:
 *                 type: string
 *               año:
 *                 type: number
 *             example:
 *               marca: Toyota
 *               modelo: Corolla
 *               año: 2023
 *     responses:
 *       201:
 *         description: Carro creado exitosamente
 *         content:
 *           application/json:
 *             example:
 *               _id: 61555f3e0f30588a3c4d34e8
 *               marca: Toyota
 *               modelo: Corolla
 *               año: 2023
 *       400:
 *         description: Datos inválidos para crear el carro
 */
app.post('/carros', async (req, res) => {
    try {
        const nuevoCarro = await Carro.create(req.body);
        res.status(201).json(nuevoCarro);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});


// Ruta para obtener todos los carros
/**
 * @swagger
 * /carros:
 *   get:
 *     summary: Obtiene todos los carros
 *     tags:
 *       - Carros
 *     responses:
 *       200:
 *         description: Lista de carros obtenida exitosamente
 *         content:
 *           application/json:
 *             example:
 *               - _id: 61555f3e0f30588a3c4d34e8
 *                 marca: Toyota
 *                 modelo: Corolla
 *                 año: 2023
 *               - _id: 61555f3e0f30588a3c4d34e9
 *                 marca: Ford
 *                 modelo: Mustang
 *                 año: 2022
 */
app.get('/carros', async (req, res) => {
    try {
        const carros = await Carro.find();
        res.status(200).json(carros);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// Ruta para obtener un carro por ID
/**
 * @swagger
 * /carros/{id}:
 *   get:
 *     summary: Obtiene un carro por su ID
 *     tags:
 *       - Carros
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del carro a obtener
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carro obtenido exitosamente
 *         content:
 *           application/json:
 *             example:
 *               _id: 61555f3e0f30588a3c4d34e8
 *               marca: Toyota
 *               modelo: Corolla
 *               año: 2023
 *       404:
 *         description: Carro no encontrado
 */
app.get('/carros/:id', async (req, res) => {
    try {
        const carro = await Carro.findById(req.params.id);
        res.status(200).json(carro);
    } catch (error) {
        res.status(404).json({error: 'Carro no encontrado'});
    }
});

// Ruta para actualizar un carro por ID
/**
 * @swagger
 * /carros/{id}:
 *   put:
 *     summary: Actualiza un carro por su ID
 *     tags:
 *       - Carros
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del carro a actualizar
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               marca:
 *                 type: string
 *               modelo:
 *                 type: string
 *               año:
 *                 type: number
 *             example:
 *               marca: Toyota
 *               modelo: Corolla
 *               año: 2022
 *     responses:
 *       200:
 *         description: Carro actualizado exitosamente
 *         content:
 *           application/json:
 *             example:
 *               _id: 61555f3e0f30588a3c4d34e8
 *               marca: Toyota
 *               modelo: Corolla
 *               año: 2022
 *       404:
 *         description: Carro no encontrado
 */
app.put('/carros/:id', async (req, res) => {
    try {
        const carro = await Carro.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(carro);
    } catch (error) {
        res.status(404).json({error: 'Carro no encontrado'});
    }
});

// Ruta para eliminar un carro por ID
/**
 * @swagger
 * /carros/{id}:
 *   delete:
 *     summary: Elimina un carro por su ID
 *     tags:
 *       - Carros
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del carro a eliminar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Carro eliminado exitosamente
 *       404:
 *         description: Carro no encontrado
 */
app.delete('/carros/:id', async (req, res) => {
    try {
        await Carro.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(404).json({error: 'Carro no encontrado'});
    }
});

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
