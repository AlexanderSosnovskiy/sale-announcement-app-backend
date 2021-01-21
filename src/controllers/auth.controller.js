import { validationResult } from 'express-validator'

import UserModel from '../models/user.model'
import generateJWT from '../helpers/JWT/generateJWT'
import errorHandler from '../helpers/dbErrorHandler'
import errorFormatter from '../helpers/errorFormatter'

let signup = async (req, res) => {
  let errors = validationResult(req).formatWith(errorFormatter)
  let { email } = req.body

  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array({ onlyFirstError: true }))
  }
  let isUserExists = await UserModel.findOne({ where: { email: email } })

  if (isUserExists) {
    return res.status(422).json({
      message: 'User with such email already exists!',
    })
  }

  await UserModel.create(req.body)
    .then(user => {
      if (user) {
        let token = generateJWT(user.getDataValue('id'))

        return res.status(200).json({
          token: token,
        })
      }
    })
    .catch(err => {
      return res.json({
        message: errorHandler.getErrorMessage(err),
      })
    })
}

let signin = async (req, res) => {
  let errors = validationResult(req).formatWith(errorFormatter)
  let { email, password } = req.body

  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array({ onlyFirstError: true }))
  }

  await UserModel.findOne({
    where: {
      email: email,
    },
    attributes: { include: ['hashedPassword', 'salt'] },
  })
    .then(user => {
      let isPasswordCorrect = user && user.matchPassword(password)
      let isEmailCorrect = user && user.matchEmail(email)

      if (!user || !isPasswordCorrect || !isEmailCorrect) {
        let incorrectField = !user || !isEmailCorrect ? 'email' : 'password'

        return res.status(422).json({
          field: incorrectField,
          message: 'Wrong email or password!',
        })
      }

      let token = generateJWT(user.getDataValue('id'))

      return res.status(200).json({
        token: token,
      })
    })
    .catch(err => {
      return res.json({
        message: errorHandler.getErrorMessage(err),
      })
    })
}

export default {
  signup,
  signin,
}
