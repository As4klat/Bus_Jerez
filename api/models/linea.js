const mongoose = require('mongoose')

const lineaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    paradas: [{
        parada: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Parada'
        }
    }]
})

const Linea = mongoose.model('Linea', lineaSchema)

module.exports = Linea