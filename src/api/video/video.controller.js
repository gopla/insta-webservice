const videoService = require('./video.service')
const userService = require('../user/user.service')
const videoCommentService = require('../vidcomment/vidcomment.service')

module.exports = {
  index: async (req, res) => {
    try {
      const videoRes = await videoService.getAllVideo()
      res.json(videoRes)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  show: async (req, res) => {
    try {
      const videoRes = await videoService.getVideoById(req.params.id)
      let commentValue = await videoCommentService.getCommentValue(
        req.params.id
      )
      videoRes = Object.assign({ comment: commentValue }, videoRes[0]._doc)
      res.json(videoRes)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  user: async (req, res) => {
    try {
      const videoRes = await videoService.getVideoByUsername(
        req.params.username
      )
      res.json(videoRes)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  store: async (req, res) => {
    try {
      const videoBuffer = req.file.buffer
      const videoRes = await videoService.postVideo(
        req.user.id,
        req.body.caption,
        videoBuffer
      )
      if (videoRes) {
        await userService.incrementPost(req.user.id)
        res.json(videoRes)
      }
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  update: async (req, res) => {
    try {
      const videoRes = await videoService.updateCaption(
        req.body.caption,
        req.params.id
      )
      res.json(videoRes)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  delete: async (req, res) => {
    try {
      const videoRes = await videoService.deleteVideo(req.params.id)
      if (videoRes) {
        await userService.decrementPost(req.user.id)
        res.json(videoRes)
      }
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  liked: async (req, res) => {
    try {
      const videoRes = await videoService.incrementLike(req.params.id)
      res.json(videoRes)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  unliked: async (req, res) => {
    try {
      const videoRes = await videoService.decrementLike(req.params.id)
      res.json(videoRes)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  viewed: async (req, res) => {
    try {
      const videoRes = await videoService.incrementView(req.params.id)
      res.json(videoRes)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },
}
