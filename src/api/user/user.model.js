const { Schema, model } = require('mongoose')

module.exports = model(
  'User',
  new Schema(
    {
      name: {
        type: String,
      },
      username: {
        type: String,
        unique: true,
      },
      password: {
        type: String,
      },
      desc: {
        type: String,
        default: '',
      },
      image: {
        type: String,
        default: '',
      },
      location: {
        type: String,
        default: '',
      },
      posted: {
        type: Number,
        default: 0,
      },
      follower: {
        type: Number,
        default: 0,
      },
      following: {
        type: Number,
        default: 0,
      },
    },
    { collection: 'user' }
  )
)
