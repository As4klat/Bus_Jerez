const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const Parada = require('./parada')

const lineaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    paradasPrimerSentido: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Parada'
    },
    paradasSegundoSentido: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Parada'
    },
    nombrePrimerSentido:{
        type: String,
        trim: true
    },
    nombreSegundoSentido:{
        type: String,
        trim: true
    }
})

lineaSchema.post('save', async function (next) {
    
    const paradalist = this.paradasPrimerSentido
    paradalist.forEach(async e => {
        let parada = await Parada.findOne({_id: e._id})
        if(!parada.lineas.includes(this._id)){
            parada.lineas.push(this._id)
        }
        parada.save()
    })

    next()
})

const Linea = mongoose.model('Linea', lineaSchema)

module.exports = Linea