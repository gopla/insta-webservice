const imageService = require('./imgcomment.service')

module.exports = {
  index: async (req, res) => {
    try {
      const comentRes = await imageService.getAllComment()
      res.json(comentRes)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  show: async (req, res) => {
    try {
      const comentRes = await imageService.getCommentByPost(req.params.id_post)
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
      const comentRes = await imageService.createComment(commentBody)
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
      const comentRes = await imageService.updateComment(
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
      const comentRes = await imageService.deleteComment(req.params.id)
      res.json(comentRes)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },
}
