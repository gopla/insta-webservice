const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const userRouter = require('./api/user/user.router')
const imageRouter = require('./api/image/image.router')
const videoRouter = require('./api/video/video.router')
const commentImageRouter = require('./api/imgcomment/imgcomment.router')
const commentVideoRouter = require('./api/vidcomment/vidcomment.router')

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
app.use(videoRouter)
app.use(commentImageRouter)
app.use(commentVideoRouter)

module.exports = app
