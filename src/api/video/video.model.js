const { model, Schema } = require('mongoose')

module.exports = model(
  'Video',
  new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      videoLink: {
        type: String,
        required: true,
      },
      videoPublicId: {
        type: String,
        required: true,
      },
      caption: {
        type: String,
        required: true,
      },
      view: {
        type: Number,
        default: 0,
      },
      like: {
        type: Number,
        default: 0,
      },
      comment: {
        type: Number,
        default: 0,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
    { collection: 'video' }
  )
)
