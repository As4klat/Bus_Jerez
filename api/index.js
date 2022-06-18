const config = require('./global')
const express = require('express')
const webscrap = require('./app/helpers/webscraping')
const timer = require('./app/helpers/timebucle')
require('./db/mongoose')

webscrap()

const lineaRouter = require('./routers/linea')
const paradaRouter = require('./routers/parada')

const app = express()

const host = config.HOST
const port = config.PORTAPI

app.use(express.json())
app.use(lineaRouter)
app.use(paradaRouter)

app.listen(port, () => {
    console.log(`Servidor abierto en el puerto http://${host}:${port}/`)
})

setInterval(webscrap, timer(5));