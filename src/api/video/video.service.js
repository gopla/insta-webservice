const { setError } = require('../../middlewares/errorHandler')
const {
  uploadFromBuffer,
  deleteVideoCloudinary,
} = require('../../utils/cloudinary')
const Video = require('./video.model')

module.exports = {
  getAllVideo: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const videoDoc = await Video.find().populate('user').exec()
        resolve(videoDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  getVideoById: (videoId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const videoDoc = await Video.find({ _id: videoId })
          .populate('user')
          .exec()
        resolve(videoDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  postVideo: (userId, caption, videoBuffer) => {
    return new Promise(async (resolve, reject) => {
      try {
        let cloudinaryResp = await uploadFromBuffer(videoBuffer)

        const videoDoc = (
          await Video.create({
            caption,
            videoLink: cloudinaryResp.secure_url,
            videoPublicId: cloudinaryResp.public_id,
            user: userId,
          })
        )
          .populate('user')
          .execPopulate()
        resolve(videoDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  updateCaption: (caption, videoId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updatedCapt = await Video.findOneAndUpdate(
          { _id: videoId },
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

  deleteVideo: (videoId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const findVideo = await Video.findById(videoId)

        const delRes = await deleteVideoCloudinary(findVideo.videoPublicId)
        if (delRes.deleted) {
          const videoDoc = await Video.findOneAndDelete({ _id: videoId })
          resolve(videoDoc)
        }
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  incrementLike: (videoId) => {
    return new Promise(async (resolve, reject) => {
      try {
        await Video.findOneAndUpdate({ _id: videoId }, { $inc: { like: 1 } })
        const videoDoc = await Video.find({ _id: videoId })
          .populate('user')
          .exec()
        resolve(videoDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  decrementLike: (videoId) => {
    return new Promise(async (resolve, reject) => {
      try {
        await Video.findOneAndUpdate({ _id: videoId }, { $inc: { like: -1 } })
        const videoDoc = await Video.find({ _id: videoId })
          .populate('user')
          .exec()
        resolve(videoDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  incrementView: (videoId) => {
    return new Promise(async (resolve, reject) => {
      try {
        await Video.findOneAndUpdate({ _id: videoId }, { $inc: { view: 1 } })
        const videoDoc = await Video.find({ _id: videoId })
          .populate('user')
          .exec()
        resolve(videoDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },
}
