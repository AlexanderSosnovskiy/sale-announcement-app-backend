import { check, oneOf } from 'express-validator'

export let itemValidation = {
  create: [
    check('title')
      .notEmpty()
      .withMessage('Title is required!')
      .isLength({ min: 3 })
      .withMessage('Title should contains at least 3 chars!'),
    check('price').notEmpty().withMessage('Price is required!'),
  ],
  update: [
    check('title')
      .optional()
      .isLength({ min: 3 })
      .withMessage('Title should contain at least 3 chars!'),
    check('price')
      .optional()
      .notEmpty()
      .withMessage('Price should contain at least 1 number!')
      .isFloat()
      .withMessage('Price should be decimal!'),
  ],
}
