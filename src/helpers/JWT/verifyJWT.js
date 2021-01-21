import jwt from 'jsonwebtoken'
import config from '../../config'

export default function verifyJWT(token) {
  const JWT_SECRET_KEY = config.jwt.secret

  try {
    return jwt.verify(token, JWT_SECRET_KEY)
  } catch (err) {
    console.error(err)
  }
}
