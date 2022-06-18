const mongoose = require('mongoose')

const paradaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        unique:true,
        required: true,
        trim: true
    },
    coordenadas:{
        type: [String],
        required: true,
        trim: true 
    },
    lineas: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Linea'
    },
    horariolaborales: {
        type: [String],
        required: true,
        trim: true
    },
    horariosabados: {
        type: [String],
        required: true,
        trim: true
    },
    horariodomingosyfestivos: {
        type: [String],
        required: true,
        trim: true
    }
})

const Parada = mongoose.model('Parada', paradaSchema)

module.exports = Parada