const { model, Schema } = require('mongoose')

module.exports = model(
  'ImageComment',
  new Schema(
    {
      image: {
        type: Schema.Types.ObjectId,
        ref: 'Image',
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
        type: String,
      },
      like: {
        type: Number,
        default: 0,
      },
    },
    { collection: 'imagecomment' }
  )
)
