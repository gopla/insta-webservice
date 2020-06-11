require('dotenv').config()
const mongoose = require('mongoose')
const { DB_USERNAME, DB_PASS, DB_NAME } = process.env
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}

module.exports = {
  connectDB: async () => {
    return await mongoose.connect(
      `mongodb+srv://${DB_USERNAME}:${DB_PASS}@clusterinsta-ewn5a.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
      options
    )
  },

  closeDB: async () => {
    return await mongoose.connection.close()
  },

  clearDB: async () => {
    return await mongoose.connection.dropDatabase()
  },
}
