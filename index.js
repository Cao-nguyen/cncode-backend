const express = require('express')
require('dotenv').config()
const db = require('./config/mongoDB')

const app = express()
const port = process.env.PORT

// Kết nối database (mongoDB)
db.connect()

app.get('/', (req, res) => {
    res.send('Hello Cao Nguyên')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})