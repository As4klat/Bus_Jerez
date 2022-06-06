const express = require('express')
const cors = require('cors');
const router = new express.Router()
const Linea = require('../models/linea');
const Parada = require('../models/parada');
const { ObjectId } = require('mongodb');

router.get('/api/lineas', cors(), async (req, res) => {
    try {
        prueba = {
            test: "lineas",
            error: 0
        }
        res.send(prueba)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/api/lineas', cors(), async (req, res) => {

    const lineaShema = new Linea(req.body)

    try {
        await lineaShema.save()
        res.status(201).send(lineaShema)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router