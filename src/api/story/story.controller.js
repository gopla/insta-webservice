const storyService = require('./story.service')
const followService = require('../follow/follow.service')
const FileType = require('file-type')

module.exports = {
  index: async (req, res) => {
    try {
      let followingStories = []
      const following = await followService.getFollowingPerUser(req.user.id)
      const self = await storyService.getStoryByUser(req.user.id)
      self.map((data) => {
        followingStories.push(data)
      })
      following.map(async (data) => {
        const a = await storyService.getStoryByUser(data.user._id)
        a.map((data) => {
          followingStories.push(data)
        })
      })
      setTimeout(() => {
        res.json(followingStories)
      }, 1000)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  show: async (req, res) => {
    try {
      const storyResp = await storyService.getStoryByUser(req.user.id)
      res.json(storyResp)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  store: async (req, res) => {
    try {
      const storyReq = { userId: req.user.id, file: req.file.buffer }
      const fileType = await (await FileType.fromBuffer(req.file.buffer)).ext
      if (fileType == 'jpg' || fileType == 'png') {
        await storyService.postImageStory(storyReq)
      } else {
        await storyService.postVideoStory(storyReq)
      }
      res.json({ isSuccess: true, message: 'Story posted' })
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  delete: async (req, res) => {
    try {
      await storyService.deleteStory(req.params.id)
      res.json({ isSuccess: true, message: 'Story deleted' })
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },
}
