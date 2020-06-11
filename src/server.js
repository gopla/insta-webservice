const { connectDB } = require('./utils/database')
const app = require('./app')

const port = process.env.PORT || 3000

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(` -> Server started at http://localhost:${port}/`)
    })
  })
  .catch((err) => {
    console.log(err)
  })
