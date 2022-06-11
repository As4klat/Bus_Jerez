const cheerio = require('cheerio')
const request = require('request-promise')
const config = require('../../global')

const url = config.URLBUS
const urls = []

const webscrap = async () => {
    const $ = await request({
        uri: url + config.URLLINEAS,
        transform: body => cheerio.load(body)
    })

    $('.card').find('a').each((i,el) => {
        urls.push(url+$(el).attr('href'))
    })

    urls.forEach((url) => {
        scrapLinea(url)
    })
    
    saveData()
}

async function scrapLinea(url) {
    const $ = await request({
        uri: url,
        transform: body => cheerio.load(body)
    })
    
    const title = $('.accordion-title-link-text')
    
}

function saveData() {

}

module.exports = webscrap