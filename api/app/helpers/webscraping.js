const cheerio = require('cheerio')
const request = require('request-promise')
const config = require('../../global')
const Parada = require('../../models/parada')
const Linea = require('../../models/linea')
const capitalizarPrimeraLetra = require('./capitalizarPrimeraLetra')

const url = config.URLBUS
const urls = []

const webscrap = async () => {
    const $ = await request({
        uri: url + config.URLLINEAS,
        transform: body => cheerio.load(body)
    })

    $('.card').find('a').each((i, el) => {
        urls.push(url + $(el).attr('href'))
    })

    urls.forEach((url) => {
        scrapLinea(url)
    })
}

async function scrapLinea(url) {
    let arr = url.split("/");
    var nombreLinea = arr[5]
    nombreLinea = nombreLinea.replace("-", " ")
    nombreLinea = capitalizarPrimeraLetra(nombreLinea)
    const $ = await request({
        uri: url,
        transform: body => cheerio.load(body)
    })
    const sentidos = []
    $('.accordion-title-link-text').each((i, el) => {
        sentidos.push($(el).text())
    })
    const paradasCrud = [[], []]
    $('.accordion-content-item .list-normal').each((i, el) => {
        $(el).find('li').each((j, text) => {
            paradasCrud[i][j] = $(text).html().toLowerCase()
        })
    })

    const paradas = await crearParadas(paradasCrud)

    const linea = {
        nombre: nombreLinea,
        paradasPrimerSentido: paradas[0],
        paradasSegundoSentido: paradas[1],
        nombrePrimerSentido: sentidos[0],
        nombreSegundoSentido: sentidos[1]
    }

    await crearLineas(linea)
}

async function crearParadas(paradasCrud) {
    const paradas = [[], []]

    for (let i = 0; i < paradasCrud.length; i++) {
        if (paradasCrud[i].length !== 0) {
            for (let j = 0; j < paradasCrud[i].length; j++) {
                let paradaNueva = await Parada.findOne({ nombre: paradasCrud[i][j] })
                if (paradaNueva == null) {
                    paradaNueva = {
                        nombre: paradasCrud[i][j],
                        coordenadas: [],
                        lineas: [],
                        horariolaborales: [],
                        horariosabados: [],
                        horariodomingosyfestivos: []
                    }
                    paradaNueva = new Parada(paradaNueva)
                    try {
                        await paradaNueva.save()
                    }
                    catch (error) {
                        paradaNueva = await Parada.findOne({ nombre: paradasCrud[i][j] })
                    }
                }
                paradas[i][j] = paradaNueva['_id']
            }
        }
    }
    return paradas
}

async function crearLineas(linea) {
    let lineaNueva = await Linea.findOne({ nombre: linea.nombre })
    if (lineaNueva == null) {
        lineaNueva = new Linea(linea)
        try {
            await lineaNueva.save()
        }
        catch (e) {
            console.log(e)
            const filter = { nombre: linea.nombre };
            const update = {
                paradasPrimerSentido: linea.paradasPrimerSentido,
                paradasSegundoSentido: linea.paradasSegundoSentido,
                nombrePrimerSentido: linea.nombrePrimerSentido,
                nombreSegundoSentido: linea.nombreSegundoSentido
            };
            await Linea.findOneAndUpdate(filter, update);
        }
    }
}
module.exports = webscrap