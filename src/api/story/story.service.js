const { setError } = require('../../middlewares/errorHandler')
const {
  uploadStoryImage,
  uploadStoryVideo,
  deleteImageCloudinary,
  deleteVideoCloudinary,
} = require('../../utils/cloudinary')
const Story = require('./story.model')

module.exports = {
  getAllStories: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const storyDoc = await Story.find().populate('user').exec()
        resolve(storyDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  getStoryByUser: (user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const storyDoc = await Story.find({ user }).populate('user').exec()

        if (storyDoc[0] != null) resolve(storyDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  postImageStory: (story) => {
    return new Promise(async (resolve, reject) => {
      try {
        const cloudinaryResp = await uploadStoryImage(story.file)

        const storyDoc = await Story.create({
          user: story.userId,
          storyLink: cloudinaryResp.secure_url,
          storyPublicId: cloudinaryResp.public_id,
        })
        resolve(storyDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  postVideoStory: (story) => {
    return new Promise(async (resolve, reject) => {
      try {
        const cloudinaryResp = await uploadStoryVideo(story.file)

        const storyDoc = await Story.create({
          user: story.userId,
          storyLink: cloudinaryResp.secure_url,
          storyPublicId: cloudinaryResp.public_id,
        })

        resolve(storyDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  deleteStory: (storyId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const storyRes = await Story.find({ _id: storyId })
        const jpgFile = storyRes.storyLink.match(/.jpg.*/) ? true : false
        if (jpgFile) {
          await deleteImageCloudinary(storyRes.storyPublicId)
        } else {
          await deleteVideoCloudinary(storyRes.storyPublicId)
        }
        const resp = await Story.findByIdAndDelete({ _id: storyId })
        resolve(resp)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },
}
