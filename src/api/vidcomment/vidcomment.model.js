const { model, Schema } = require('mongoose')

module.exports = model(
  'VideoComment',
  new Schema(
    {
      video: {
        type: Schema.Types.ObjectId,
        ref: 'Video',
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      comment: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      like: {
        type: Number,
        default: 0,
      },
    },
    { collection: 'videocomment' }
  )
)
