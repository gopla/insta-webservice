const { model, Schema } = require('mongoose')

module.exports = model(
  'Follow',
  new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      followedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
    { collection: 'follow' }
  )
)
