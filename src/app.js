const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const userRouter = require('./api/user/user.router')
const imageRouter = require('./api/image/image.router')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get(`/`, (req, res) => {
  res.json({
    isSucces: true,
    message: 'Hello, World!',
  })
})
app.use(userRouter)
app.use(imageRouter)

module.exports = app
