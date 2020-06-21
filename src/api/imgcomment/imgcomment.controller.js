const imageCommentService = require('./imgcomment.service')
const imageService = require('../image/image.service')

module.exports = {
  index: async (req, res) => {
    try {
      const comentRes = await imageCommentService.getAllComment()
      res.json(comentRes)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  show: async (req, res) => {
    try {
      const comentRes = await imageCommentService.getCommentByPost(
        req.params.id_post
      )
      res.json(comentRes)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  store: async (req, res) => {
    try {
      const commentBody = {
        user: req.user.id,
        image: req.params.id_post,
        comment: req.body.comment,
      }
      const comentRes = await imageCommentService.createComment(commentBody)
      if (comentRes) await imageService.incrementComment(req.params.id_post)
      res.json(comentRes)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  update: async (req, res) => {
    try {
      const commentBody = {
        user: req.user.id,
        comment: req.body.comment,
      }
      const comentRes = await imageCommentService.updateComment(
        req.params.id,
        commentBody
      )
      res.json(comentRes)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  delete: async (req, res) => {
    try {
      const comentRes = await imageCommentService.deleteComment(req.params.id)
      if (comentRes) await imageService.decrementComment(req.params.id)
      res.json(comentRes)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  like: async (req, res) => {
    try {
      const commentRes = await imageCommentService.incrementLikeComment(
        req.params.id
      )
      if (commentRes) res.json({ isSccess: true, message: 'Comment liked' })
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  unlike: async (req, res) => {
    try {
      const commentRes = await imageCommentService.decrementLikeComment(
        req.params.id
      )
      if (commentRes) res.json({ isSccess: true, message: 'Comment unliked' })
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },
}
