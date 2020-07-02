const imageService = require('./image.service')
const userService = require('../user/user.service')
const followService = require('../follow/follow.service')
const likeService = require('../like/like.service')

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
      res.json(imageRes)
    } catch (error) {
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

  following: async (req, res) => {
    try {
      let followingPosts = []
      let newData = [],
        liked = []
      const following = await followService.getFollowingPerUser(req.user.id)
      const self = await imageService.getImageByUserId(req.user.id)
      const isLiked = await likeService.getLikeByUserLoggedIn(req.user.id)

      self.map((data) => {
        followingPosts.push(data)
      })
      following.map(async (data) => {
        const a = await imageService.getImageByUserId(data.user._id)
        a.map((data) => {
          followingPosts.push(data)
        })
      })
      setTimeout(() => {
        followingPosts.map((data) => {
          if (!isLiked[0]) {
            data = { ...data._doc, isLiked: false }
            newData.push(data)
          } else {
            isLiked.map((like) => {
              let a = JSON.stringify(data._id)
              let b = JSON.stringify(like.image._id)

              let likedByMe = a == b ? true : false
              if (likedByMe) {
                data = { ...data._doc, isLiked: likedByMe }
                liked.push(data)
              }
            })
          }
          data = { ...data._doc, isLiked: false }
          newData.push(data)
        })
      }, 500)
      setTimeout(() => {
        newData = newData.filter((obj) => {
          return obj._id != null
        })
        let trueResp = newData.concat(liked)
        trueResp.sort((a, b) => {
          var keyA = new Date(a.createdAt),
            keyB = new Date(b.createdAt)
          // Compare the 2 dates
          if (keyA > keyB) return -1
          if (keyA < keyB) return 1
          return 0
        })
        res.json(trueResp)
      }, 1000)
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
      console.log(req.user.id)

      if (imageRes)
        await likeService.storeLikeImage(imageRes[0]._id, req.user.id)
      res.json(imageRes)
    } catch (error) {
      res.status(error.statusCode || 500).json(error)
    }
  },

  unliked: async (req, res) => {
    try {
      const imageRes = await imageService.decrementLike(req.params.id)
      if (imageRes) await likeService.deleteLikeImage(req.params.id)
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
