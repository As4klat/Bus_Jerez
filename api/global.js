const dotenv = require('dotenv').config();

module.exports = {
  //GLOBAL
  NODE_ENV: process.env.NODE_ENV,
  HOST: process.env.HOST || '127.0.0.1',
  PORT: process.env.PORT || 80,
  PORTAPI: process.env.PORTAPI || 3000,
  //BBDD
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  BDNAME: process.env.BDNAME,
  //URL_BUS
  URLBUS: process.env.URLBUS,
  URLLINEAS: process.env.URLLINEAS,
  //APIKEY MAP
  APIMAPKEY: process.env.APIMAPKEY || null
}