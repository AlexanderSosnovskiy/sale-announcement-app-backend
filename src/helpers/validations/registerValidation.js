import { check } from 'express-validator'

export let registerValidation = [
  check('email')
    .notEmpty()
    .withMessage('Wrong email!')
    .isEmail()
    .withMessage('Incorrect email schema!'),
  check('password')
    .notEmpty()
    .withMessage('Wrong password!')
    .isLength({ min: 5 })
    .withMessage('Password must be 5+ chars!'),
  check('name').notEmpty().withMessage('Wrong name!'),
  check('phone').optional({ nullable: true, checkFalsy: true }),
]
