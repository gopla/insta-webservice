const { setError } = require('../../middlewares/errorHandler')
const { uploadImage, deleteImageCloudinary } = require('../../utils/cloudinary')
const Image = require('./image.model')
const User = require('../user/user.model')

module.exports = {
  getAllImage: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const imageDoc = await Image.find()
          .sort({ createdAt: 'desc' })
          .populate('user')
          .exec()
        resolve(imageDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  getImageById: (imageId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const imageDoc = await Image.find({ _id: imageId })
          .populate('user')
          .exec()
        resolve(imageDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  getImageByUsername: (username) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({ username })
        const imageDoc = await Image.find({ user: user._id })
          .sort({ createdAt: 'desc' })
          .populate('user')
          .exec()
        resolve(imageDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  postImage: (userId, caption, imageBuffer) => {
    return new Promise(async (resolve, reject) => {
      try {
        let cloudinaryResp = await uploadImage(imageBuffer)

        const imageDoc = (
          await Image.create({
            caption,
            imageLink: cloudinaryResp.secure_url,
            imagePublicId: cloudinaryResp.public_id,
            user: userId,
          })
        )
          .populate('user')
          .execPopulate()
        resolve(imageDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  updateCaption: (caption, imageId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updatedCapt = await Image.findOneAndUpdate(
          { _id: imageId },
          { caption },
          { new: true }
        )
          .populate('user')
          .exec()
        resolve(updatedCapt)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  deleteImage: (imageId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const findImage = await Image.findById(imageId)
        console.log(findImage)

        const delRes = await deleteImageCloudinary(findImage.imagePublicId)
        if (delRes.result == 'ok') {
          const imageDoc = await Image.findOneAndDelete({ _id: imageId })
          resolve(imageDoc)
        }
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  incrementLike: (imageId) => {
    return new Promise(async (resolve, reject) => {
      try {
        await Image.findOneAndUpdate({ _id: imageId }, { $inc: { like: 1 } })
        const imageDoc = await Image.find({ _id: imageId })
          .populate('user')
          .exec()
        resolve(imageDoc)
      } catch (error) {
        console.log(error)

        reject(setError(302, error))
      }
    })
  },

  decrementLike: (imageId) => {
    return new Promise(async (resolve, reject) => {
      try {
        await Image.findOneAndUpdate({ _id: imageId }, { $inc: { like: -1 } })
        const imageDoc = await Image.find({ _id: imageId })
          .populate('user')
          .exec()
        resolve(imageDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  incrementView: (imageId) => {
    return new Promise(async (resolve, reject) => {
      try {
        await Image.findOneAndUpdate({ _id: imageId }, { $inc: { view: 1 } })
        const imageDoc = await Image.find({ _id: imageId })
          .populate('user')
          .exec()
        resolve(imageDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  incrementComment: (imageId) => {
    return new Promise(async (resolve, reject) => {
      try {
        await Image.findOneAndUpdate({ _id: imageId }, { $inc: { comment: 1 } })
        const imageDoc = await Image.find({ _id: imageId })
          .populate('user')
          .exec()
        resolve(imageDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  decrementComment: (imageId) => {
    return new Promise(async (resolve, reject) => {
      try {
        await Image.findOneAndUpdate(
          { _id: imageId },
          { $inc: { comment: -1 } }
        )
        const imageDoc = await Image.find({ _id: imageId })
          .populate('user')
          .exec()
        resolve(imageDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },
}
