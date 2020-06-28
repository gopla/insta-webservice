const Like = require('./like.model')
const moment = require('moment')

module.exports = {
  getAllLike: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const likeDoc = await Like.find()
        resolve(likeDoc)
      } catch (error) {
        reject(error)
      }
    })
  },

  getLikeByUserLoggedIn: (user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const likeDoc = await Like.find({ user })
          .populate('user')
          .populate('image')
          .populate('video')
          .exec()
        resolve(likeDoc)
      } catch (error) {
        reject(error)
      }
    })
  },

  storeLikeImage: (image, user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const likeDoc = await Like.create({
          image,
          user,
          createdAt: moment().tz('Asia/Jakarta').format('YYYY-MM-D HH:mm:ss'),
        })
        resolve(likeDoc)
      } catch (error) {
        reject(error)
      }
    })
  },

  storeLikeVideo: (video, user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const likeDoc = await Like.create({
          video,
          user,
          createdAt: moment().tz('Asia/Jakarta').format('YYYY-MM-D HH:mm:ss'),
        })
        resolve(likeDoc)
      } catch (error) {
        reject(error)
      }
    })
  },

  deleteLikeImage: (image, user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const likeDoc = await Like.findOneAndDelete({ image, user })
        resolve(likeDoc)
      } catch (error) {
        reject(error)
      }
    })
  },

  deleteLikeVideo: (video, user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const likeDoc = await Like.findOneAndDelete({ video, user })
        resolve(likeDoc)
      } catch (error) {
        reject(error)
      }
    })
  },
}
