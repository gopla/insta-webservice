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
        const userDoc = await User.find({ username })
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
        })
        resolve(userDoc)
      } catch (error) {
        reject(setError(302, error))
      }
    })
  },

  updateUser: async (id, user) => {
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

        const userDoc = await User.findOneAndUpdate(
          { _id: id },
          { $set: user },
          { new: true }
        )
        resolve(userDoc)
      } catch (error) {
        console.log(error)

        reject(setError(302, error))
      }
    })
  },

  deleteuser: async (id) => {
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

  changePass: async (id, user) => {
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
}
