let streamifier = require('streamifier')
import cloudinary from './cloudinary'

export default function uploadFile(req, res) {
  if (req.file.size > 10000000) {
    return res.status(422).json({
      field: 'image',
      message: `The file ${req.file.originalname} is too big!`,
    })
  }

  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result)
      } else if (!result || error) {
        reject(error)
      }
    })

    streamifier.createReadStream(req.file.buffer).pipe(stream)
  })
}
