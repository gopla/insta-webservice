require('moment-timezone')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const userRouter = require('./api/user/user.router')
const imageRouter = require('./api/image/image.router')
const videoRouter = require('./api/video/video.router')
const commentImageRouter = require('./api/imgcomment/imgcomment.router')
const commentVideoRouter = require('./api/vidcomment/vidcomment.router')
const storyRouter = require('./api/story/story.router')
const moment = require('moment')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get(`/`, (req, res) => {
  res.json({
    isSucces: true,
    message: 'Hello, World!',
    now: moment().tz('Asia/Jakarta').format('YYYY-MM-D HH:mm:ss'),
  })
})
app.use(userRouter)
app.use(imageRouter)
app.use(videoRouter)
app.use(commentImageRouter)
app.use(commentVideoRouter)
app.use(storyRouter)

module.exports = app
