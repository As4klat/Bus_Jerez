const express = require('express')
const cors = require('cors');
const router = new express.Router()
const Linea = require('../models/linea');

router.get('/api/lineas', cors(), async (req, res) => {
    try {
        const prueba = await Linea.find({})
        res.send(prueba)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router