const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
    res.send('Hello Cao Nguyên')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})