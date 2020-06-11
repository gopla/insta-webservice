require('dotenv').config()
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

module.exports = {
  uploadFromBuffer: (file) => {
    return new Promise((resolve, reject) => {
      let cld_upload_stream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto', folder: 'insta' },
        (error, result) => {
          if (result) {
            resolve(result)
          } else {
            reject(error)
          }
        }
      )
      streamifier.createReadStream(file).pipe(cld_upload_stream)
    })
  },

  deleteImage: (publicId) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(
        publicId,
        { resource_types: 'auto' },
        (err, result) => {
          if (result) {
            resolve(result)
          } else {
            reject(err)
          }
        }
      )
    })
  },
}
