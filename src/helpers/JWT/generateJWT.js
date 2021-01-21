import jwt from 'jsonwebtoken'
import config from '../../config'

export default function generateJWT(userId) {
  const JWT_SECRET_KEY = config.jwt.secret

  try {
    return jwt.sign({ id: userId }, JWT_SECRET_KEY, {
      expiresIn: '1d',
      algorithm: 'HS256',
    })
  } catch (err) {
    console.error(err)
  }
}
