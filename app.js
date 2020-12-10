const rutas = require('./rutas')
const express = require('express')
const puerto = 3001
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded(
    {
        extended: true
    }
))
rutas(app)
const server = app.listen( puerto, (error)=>{
    if(error) return console.log(`error: ${error}`)
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
} )