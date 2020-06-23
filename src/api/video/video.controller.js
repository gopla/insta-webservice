const videoService = require('./video.service')
const userService = require('../user/user.service')
const followService = require('../follow/follow.service')

module.exports = {
  index: async (req, res) => {
    try {
      let followingPosts = []
      const following = await followService.getFollowingPerUser(req.user.id)
      following.map(async (data) => {
        const a = await videoService.getVideoByUserId(data.user._id)
        a.map((data) => {
          followingPosts.push(data)
        })
      })
      setTimeout(() => {
        res.json(followingPosts)
      }, 1000)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  show: async (req, res) => {
    try {
      const videoRes = await videoService.getVideoById(req.params.id)
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
