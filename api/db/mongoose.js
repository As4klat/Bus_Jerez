const config = require('../global')
const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://${config.USER}:${config.PASSWORD}@${config.BDNAME}.znza6.mongodb.net/?retryWrites=true&w=majority`)
