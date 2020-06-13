require('dotenv').config()
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

module.exports = {
  uploadImage: (file) => {
    return new Promise((resolve, reject) => {
      let cld_upload_stream = cloudinary.uploader.upload_stream(
        { resource_type: 'image', folder: 'insta/post', format: 'jpg' },
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

  uploadVideo: (file) => {
    return new Promise((resolve, reject) => {
      let cld_upload_stream = cloudinary.uploader.upload_stream(
        { resource_type: 'video', folder: 'insta/post', format: 'mp4' },
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

  deleteImageCloudinary: (publicId) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(
        publicId,
        { resource_types: 'image' },
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

  deleteVideoCloudinary: (publicId) => {
    return new Promise((resolve, reject) => {
      cloudinary.api.delete_resources(
        publicId,
        { resource_type: 'video' },
        (err, result) => {
          if (result) {
            resolve(result)
          } else {
            reject(error)
          }
        }
      )
    })
  },

  uploadProfPic: (file) => {
    return new Promise((resolve, reject) => {
      let cld_upload_stream = cloudinary.uploader.upload_stream(
        { resource_type: 'image', folder: 'insta/profpic', format: 'png' },
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

  uploadStoryImage: (file) => {
    return new Promise((resolve, reject) => {
      let cld_upload_stream = cloudinary.uploader.upload_stream(
        { resource_type: 'image', folder: 'insta/stories', format: 'jpg' },
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

  uploadStoryVideo: (file) => {
    return new Promise((resolve, reject) => {
      let cld_upload_stream = cloudinary.uploader.upload_stream(
        { resource_type: 'video', folder: 'insta/stories', format: 'mp4' },
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
}
