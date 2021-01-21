let cloudinary = require('cloudinary').v2
import config from '../config'

cloudinary.config({
  cloud_name: config.cloud.name,
  api_key: config.cloud.key,
  api_secret: config.cloud.secret,
})

export default cloudinary
