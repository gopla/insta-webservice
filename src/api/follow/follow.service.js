const { setError } = require('../../middlewares/errorHandler')
const Follow = require('./follow.model')

module.exports = {
  getAllFollow: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const followDoc = await Follow.find()
        resolve(followDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  getFollowerPerUser: (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const followDoc = await Follow.find({ user: userId })
          .select('followedBy')
          .populate('followedBy')
          .exec()
        resolve(followDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  getFollowingPerUser: (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const followDoc = await Follow.find({ followedBy: userId })
          .select('user')
          .populate('user')
          .exec()
        console.log(followDoc)

        resolve(followDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  actionFollow: (following, follower) => {
    return new Promise(async (resolve, reject) => {
      try {
        const followDoc = await Follow.create({
          user: following,
          followedBy: follower,
        })
        resolve(followDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  actionUnfollow: (following, follower) => {
    return new Promise(async (resolve, reject) => {
      try {
        const followDoc = await Follow.findOneAndDelete({
          user: following,
          followedBy: follower,
        })
        resolve(followDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },
}
