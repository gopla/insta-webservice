const { setError } = require('../../middlewares/errorHandler')
const ImageComment = require('./imgcomment.model')

module.exports = {
  getAllComment: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const comentDoc = await ImageComment.find()
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
        resolve(comentDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  createComment: (commentBody) => {
    return new Promise(async (resolve, reject) => {
      try {
        const comentDoc = await ImageComment.create(commentBody)
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
}
