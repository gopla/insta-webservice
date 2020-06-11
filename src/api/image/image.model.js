const { model, Schema } = require('mongoose')

module.exports = model(
  'Image',
  new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      imageLink: {
        type: String,
        required: true,
      },
      imagePublicId: {
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
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
    {
      collection: 'image',
    }
  )
)
