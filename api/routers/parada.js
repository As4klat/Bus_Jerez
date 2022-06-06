const express = require('express')
const cors = require('cors');
const router = new express.Router()
const Parada = require('../models/parada')

router.get('/api/paradas', cors(), async (req, res) => {
        try {
            prueba = {
                test:"paradas",
                error:0
            }
            res.send(prueba)
        } catch (e) {
            res.status(500).send()
        }
})

router.post('/api/paradas', cors(), async (req, res) => {

    const paradaShema = new Parada(req.body)
    try {
        await paradaShema.save()
        res.status(201).send(paradaShema)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router