import verifyJWT from '../helpers/JWT/verifyJWT'

export default function checkToken(req, res, next) {
  if (req.path === '/api/login' || req.path === '/api/register') {
    return next()
  }

  let authHeader = req.headers['authorization']

  if (typeof authHeader !== 'undefined') {
    let token = authHeader.split(' ')[1]
    let { id } = verifyJWT(token)

    if (id) {
      req.userId = id
    }

    next()
  } else {
    res.sendStatus(401).json()
  }
}
