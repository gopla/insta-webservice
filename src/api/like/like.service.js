const { setError } = require('../../middlewares/errorHandler')
const Like = require('./like.model')
const moment = require('moment')

module.exports = {
  getAllLike: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const likeDoc = await Like.find()
          .populate('likedBy')
          .populate('image')
          .populate('video')
          .exec()
        resolve(likeDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  getLikeByUserLoggedIn: (user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const likeDoc = await Like.find({ likedBy: user })
          .populate('likedBy')
          .populate('image')
          .populate('video')
          .exec()
        resolve(likeDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  getLikeByPost: (postId, isImage) => {
    return new Promise(async (resolve, reject) => {
      try {
        let likeDoc = ''
        if (isImage) {
          likeDoc = await Like.find({ image: postId })
            .populate('likedBy')
            .populate('image')
            .populate('video')
            .exec()
        } else {
          likeDoc = await Like.find({ video: postId })
            .populate('likedBy')
            .populate('image')
            .populate('video')
            .exec()
        }

        resolve(likeDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  storeLikeImage: (image, user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const likeDoc = await Like.create({
          image,
          likedBy: user,
          createdAt: moment().tz('Asia/Jakarta').format('YYYY-MM-D HH:mm:ss'),
        })
        resolve(likeDoc)
      } catch (error) {
        reject(setError(302, error))
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
        reject(setError(302, error))
      }
    })
  },

  deleteLikeImage: (image, user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const likeDoc = await Like.findOneAndDelete({ image, user })
        resolve(likeDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  deleteLikeVideo: (video, user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const likeDoc = await Like.findOneAndDelete({ video, user })
        resolve(likeDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },
}
