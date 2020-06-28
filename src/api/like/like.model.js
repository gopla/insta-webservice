const { model, Schema } = require('mongoose')

module.exports = model(
  'Like',
  new Schema(
    {
      image: {
        type: Schema.Types.ObjectId,
        ref: 'Image',
      },
      video: {
        type: Schema.Types.ObjectId,
        ref: 'Video',
      },
      likedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      createdAt: {
        type: String,
      },
    },
    { collection: 'like' }
  )
)
