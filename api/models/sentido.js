const mongoose = require('mongoose')

const sentidoSchema = new mongoose.Schema({
    sentido: {
        type: Number,
        required: true,
        trim: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    lineas: [{
        linea: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Linea'
        }  
    }]
})

const Sentido = mongoose.model('Sentido', sentidoSchema)

module.exports = Sentido