const config = require('./global')
const express = require('express')
require('./db/mongoose')
const lineaRouter = require('./routers/linea')
const paradaRouter = require('./routers/parada')
const app = express()
const host = config.HOST
const port = config.PORT || 3000
app.use(express.json())
app.use(lineaRouter)
app.use(paradaRouter)
app.listen(port, () => {
    console.log(`Servidor abierto en el puerto http://${host}:${port}/`)
})