import { check } from 'express-validator'

export let loginValidation = [
  check('email').notEmpty().withMessage('Enter your email, please!'),
  check('password').notEmpty().withMessage('Wrong password!'),
]
