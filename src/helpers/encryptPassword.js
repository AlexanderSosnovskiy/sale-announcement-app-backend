import crypto from 'crypto'

export let encryptPassword = (password, salt) => {
  let hash = ''

  try {
    hash = crypto.createHmac('sha1', salt).update(password).digest('hex')
  } catch (err) {
    throw err
  }

  return hash
}

export let makeSalt = () => {
  return Math.round(new Date().valueOf() * Math.random()) + ''
}
