const videoService = require('./vidcomment.service')

module.exports = {
  index: async (req, res) => {
    try {
      const comentRes = await videoService.getAllComment()
      res.json(comentRes)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  show: async (req, res) => {
    try {
      const comentRes = await videoService.getCommentByPost(req.params.id_post)
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
      const comentRes = await videoService.createComment(commentBody)
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
      const comentRes = await videoService.updateComment(
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
      const comentRes = await videoService.deleteComment(req.params.id)
      res.json(comentRes)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },
}
