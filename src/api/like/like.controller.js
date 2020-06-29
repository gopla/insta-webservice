const likeService = require('./like.service')

module.exports = {
  index: async (req, res) => {
    try {
      const resp = await likeService.getAllLike()
      res.json(resp)
    } catch (error) {
      res.status(error.statusCode || 500).json(error.message)
    }
  },

  show: async (req, res) => {
    try {
      const resp = await likeService.getLikeByUserLoggedIn(req.user.id)
      res.json(resp)
    } catch (error) {
      res.status(error.statusCode || 500).json(error.message)
    }
  },

  image: async (req, res) => {
    try {
      const resp = await likeService.getLikeByPost(req.params.id, true)
      res.json(resp)
    } catch (error) {
      res.status(error.statusCode || 500).json(error.message)
    }
  },

  video: async (req, res) => {
    try {
      const resp = await likeService.getLikeByPost(req.params.id, false)
      res.json(resp)
    } catch (error) {
      res.status(error.statusCode || 500).json(error.message)
    }
  },
}
