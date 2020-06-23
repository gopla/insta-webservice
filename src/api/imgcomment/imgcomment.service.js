const { setError } = require('../../middlewares/errorHandler')
const ImageComment = require('./imgcomment.model')
const moment = require('moment')

module.exports = {
  getAllComment: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const comentDoc = await ImageComment.find().sort({ createdAt: 'desc' })
        resolve(comentDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  getCommentByPost: (postId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const comentDoc = await ImageComment.find({ image: postId })
          .sort({ createdAt: 'desc' })
          .populate('user')
          .exec()
        resolve(comentDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  getCommentValue: (postId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const comentDoc = await ImageComment.find({ image: postId })
          .populate('user')
          .exec()
        resolve(comentDoc.length)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  createComment: (commentBody) => {
    return new Promise(async (resolve, reject) => {
      try {
        const comentDoc = await ImageComment.create({
          ...commentBody,
          createdAt: moment().tz('Asia/Jakarta').format('YYYY-MM-D HH:mm:ss'),
        })
        resolve(comentDoc)
      } catch (error) {
        reject(error)
      }
    })
  },

  updateComment: (commentId, commentBody) => {
    return new Promise(async (resolve, reject) => {
      try {
        const comentDoc = await ImageComment.findOneAndUpdate(
          { _id: commentId },
          { $set: commentBody }
        )
        resolve(comentDoc)
      } catch (error) {
        reject(error)
      }
    })
  },

  deleteComment: (commentId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const comentDoc = await ImageComment.findByIdAndDelete({
          _id: commentId,
        })
        resolve(comentDoc)
      } catch (error) {
        reject(error)
      }
    })
  },

  incrementLikeComment: (commentId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const commentDoc = await ImageComment.findOneAndUpdate(
          { _id: commentId },
          { $inc: { like: 1 } }
        )
        resolve(commentDoc)
      } catch (error) {
        reject(error)
      }
    })
  },

  decrementLikeComment: (commentId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const commentDoc = await ImageComment.findOneAndUpdate(
          { _id: commentId },
          { $inc: { like: -1 } }
        )
        resolve(commentDoc)
      } catch (error) {
        reject(error)
      }
    })
  },
}
