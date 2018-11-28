const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))

const routes = require('./routes/posts')
app.use('/posts', routes)

app.use((req, res, next) => {
    next({ status: 404, error: { message: 'Not found' } })
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json(err)
})

const listener = () => console.log(`Listening on port ${port}!`)
app.listen(port, listener)