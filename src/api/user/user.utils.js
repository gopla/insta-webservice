const { hash, compare } = require('bcryptjs')
const saltRounds = 10

module.exports = {
  hash: async (password) => {
    return await hash(password, saltRounds)
  },
  compare: async (password, hashedPassword) => {
    return await compare(password, hashedPassword)
  },
}
