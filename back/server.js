const express = require('express')
const cors = require('cors')
const app = express()
const mainRouter = require('./routes')
const blockRouter = require('./routes/block')
const searchRouter = require('./routes/search')
const txRouter = require('./routes/transaction')
const allRouter = require('./routes/all')
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser('chan'))
app.use(
    cors({
        origin: '*',
        credentials: false,
    }),
)

app.use('/', mainRouter)
app.use('/block', blockRouter)
app.use('/tranx', txRouter)
app.use('/search', searchRouter)
app.use('/all', allRouter)

app.listen(4000, () => {
    console.log('back server 4000')
})
