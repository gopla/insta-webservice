const imageService = require('./image.service')

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
      const imageRes = await imageService.getImageById(req.params.id)
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
      res.json(imageRes)
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
      res.json(imageRes)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },
}
