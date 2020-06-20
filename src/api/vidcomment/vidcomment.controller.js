const videoCommentService = require('./vidcomment.service')

module.exports = {
  index: async (req, res) => {
    try {
      const comentRes = await videoCommentService.getAllComment()
      res.json(comentRes)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  show: async (req, res) => {
    try {
      const comentRes = await videoCommentService.getCommentByPost(
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
        video: req.params.id_post,
        comment: req.body.comment,
      }
      const comentRes = await videoCommentService.createComment(commentBody)
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
      const comentRes = await videoCommentService.updateComment(
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
      const comentRes = await videoCommentService.deleteComment(req.params.id)
      res.json(comentRes)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  like: async (req, res) => {
    try {
      const commentRes = await videoCommentService.incrementLikeComment(
        req.params.id
      )
      if (commentRes) res.json({ isSccess: true, message: 'Comment liked' })
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  unlike: async (req, res) => {
    try {
      const commentRes = await videoCommentService.decrementLikeComment(
        req.params.id
      )
      if (commentRes) res.json({ isSccess: true, message: 'Comment unliked' })
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },
}
