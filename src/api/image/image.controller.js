const imageService = require('./image.service')
const userService = require('../user/user.service')
const imageCommentService = require('../imgcomment/imgcomment.service')

module.exports = {
  index: async (req, res) => {
    try {
      const imageRes = await imageService.getAllImage()
      res.json(imageRes)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  show: async (req, res) => {
    try {
      let imageRes = await imageService.getImageById(req.params.id)
      let commentValue = await imageCommentService.getCommentValue(
        req.params.id
      )
      imageRes = Object.assign({ comment: commentValue }, imageRes[0]._doc)
      res.json(imageRes)
    } catch (error) {
      console.log(error)

      res.status(error.statusCode || 500).json(error)
    }
  },

  user: async (req, res) => {
    try {
      const imageRes = await imageService.getImageByUsername(
        req.params.username
      )
      res.json(imageRes)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  store: async (req, res) => {
    try {
      const imageBuffer = req.file.buffer
      const imageRes = await imageService.postImage(
        req.user.id,
        req.body.caption,
        imageBuffer
      )
      if (imageRes) {
        await userService.incrementPost(req.user.id)
        res.json(imageRes)
      }
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  update: async (req, res) => {
    try {
      const imageRes = await imageService.updateCaption(
        req.body.caption,
        req.params.id
      )
      res.json(imageRes)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  delete: async (req, res) => {
    try {
      const imageRes = await imageService.deleteImage(req.params.id)
      if (imageRes) {
        await userService.decrementPost(req.user.id)
        res.json(imageRes)
      }
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  liked: async (req, res) => {
    try {
      const imageRes = await imageService.incrementLike(req.params.id)
      res.json(imageRes)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  unliked: async (req, res) => {
    try {
      const imageRes = await imageService.decrementLike(req.params.id)
      res.json(imageRes)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  viewed: async (req, res) => {
    try {
      const imageRes = await imageService.incrementView(req.params.id)
      res.json(imageRes)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },
}
