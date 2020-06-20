const { setError } = require('../../middlewares/errorHandler')
const VideoComment = require('./vidcomment.model')

module.exports = {
  getAllComment: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const comentDoc = await VideoComment.find()
        resolve(comentDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  getCommentByPost: (postId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const comentDoc = await VideoComment.find({ video: postId })
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
        const comentDoc = await VideoComment.find({ video: postId })
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
        const comentDoc = await VideoComment.create(commentBody)
        resolve(comentDoc)
      } catch (error) {
        reject(error)
      }
    })
  },

  updateComment: (commentId, commentBody) => {
    return new Promise(async (resolve, reject) => {
      try {
        const comentDoc = await VideoComment.findOneAndUpdate(
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
        const comentDoc = await VideoComment.findByIdAndDelete({
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
        const commentDoc = await VideoComment.findOneAndUpdate(
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
        const commentDoc = await VideoComment.findOneAndUpdate(
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
