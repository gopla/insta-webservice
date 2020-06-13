const { setError } = require('../../middlewares/errorHandler')
const { hash, compare } = require('./user.utils')
const jwt = require('jsonwebtoken')
const User = require('./user.model')

async function getUsername(username) {
  return await User.findOne({ username })
}

module.exports = {
  getAllUser: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const userDoc = await User.find()
        resolve(userDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  getUserByUsername: (username) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userDoc = await User.findOne({ username })
        resolve(userDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  storeNewUser: (user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const uname = user.username.toLowerCase()

        const isUserExist = await getUsername(uname)
        if (isUserExist) {
          reject(setError(302, 'Username already exist'))
          return
        }

        const hashedPass = await hash(user.password)
        const userDoc = await User.create({
          name: user.name,
          username: uname,
          password: hashedPass,
          image:
            'https://res.cloudinary.com/gopla/image/upload/v1591950484/insta/profpic/noprofpic_r9kdwm.png',
        })
        resolve(userDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  updateUser: (id, user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const uname = user.username.toLowerCase()

        const isUserExist = await User.findOne({
          username: uname,
          _id: { $ne: id },
        })
        if (isUserExist) {
          reject(setError(302, 'Username already exist'))
          return
        }

        const userDoc = await User.findOneAndUpdate({ _id: id }, { $set: user })
        resolve(userDoc)
      } catch (error) {
        console.log(error)

        reject(setError(302, error))
      }
    })
  },

  deleteuser: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userDoc = await User.findOneAndDelete({ _id: id })
        resolve(userDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  authenticate: (user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userDoc = await getUsername(user.username)
        if (!userDoc) {
          reject(setError(404, 'Username not found'))
          return
        }

        const isPassMatch = await compare(user.password, userDoc.password)
        if (!isPassMatch) {
          reject(setError(302, 'Password did not match'))
          return
        }

        const token = jwt.sign(
          {
            id: userDoc._id,
            name: userDoc.name,
            username: userDoc.username,
          },
          process.env.JWT_SECRET || ''
        )
        resolve(token)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  changePass: (id, user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const _user = await User.findOne({ _id: id })

        const hashedPass = await hash(user.newPass)

        const isPassMatch = await compare(user.curPass, _user.password)
        if (!isPassMatch) {
          reject(setError(302, 'Old password did not match'))
          return
        } else if (user.newPass != user.conPass) {
          reject(setError(302, 'New Password did not match'))
          return
        }

        const userDoc = await User.findByIdAndUpdate(
          { _id: id },
          { password: hashedPass },
          { new: true }
        )
        resolve(userDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  incrementPost: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userDoc = await User.findOneAndUpdate(
          { _id: id },
          { $inc: { posted: 1 } }
        )
        resolve(userDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  decrementPost: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userDoc = await User.findOneAndUpdate(
          { _id: id },
          { $inc: { posted: -1 } }
        )
        resolve(userDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  incrementFollower: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userDoc = await User.findOneAndUpdate(
          { _id: id },
          { $inc: { follower: 1 } }
        )
        resolve(userDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  decrementFollower: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userDoc = await User.findOneAndUpdate(
          { _id: id },
          { $inc: { follower: -1 } }
        )
        resolve(userDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  incrementFollowing: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userDoc = await User.findOneAndUpdate(
          { _id: id },
          { $inc: { following: 1 } }
        )
        resolve(userDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  decrementFollowing: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userDoc = await User.findOneAndUpdate(
          { _id: id },
          { $inc: { following: -1 } }
        )
        resolve(userDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },
}
