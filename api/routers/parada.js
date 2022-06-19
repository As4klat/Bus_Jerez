const express = require('express')
const cors = require('cors');
const router = new express.Router()
const Parada = require('../models/parada');
const Linea = require('../models/linea');
const { ObjectId } = require('mongodb');

router.get('/api/paradas', cors(), async (req, res) => {
    try {
        if(!req.query.id){
            return res.send({
                error: 'Se debe pasar un id',
                linea: linea
            })
        }
        const linea = await Linea.findById(req.query.id)
        const paradasPrimerSentido = await Parada.find({_id:linea.paradasPrimerSentido})
        const paradasSegundoSentido = await Parada.find({_id:linea.paradasSegundoSentido})
        const paradas = {
            paradasPrimerSentido: paradasPrimerSentido,
            paradasSegundoSentido: paradasSegundoSentido
        }
        res.send(paradas)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router