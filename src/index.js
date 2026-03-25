const express = require('express')
const path = require('path')

const router = require('./routes/artworks')
const service = require('./services/artworksService')

const app = express()

const PORT = 3000

const DATA_PATH = path.join(__dirname, 'data/artworks.json')

service.init(DATA_PATH)

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.method, req.url)
    next()
})

app.use('/artworks', router)

app.listen(PORT, () => {
    console.log("Server started on port", PORT)
})
