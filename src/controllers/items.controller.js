import { validationResult } from 'express-validator'

import ItemModel from '../models/item.model'
import errorHandler from '../helpers/dbErrorHandler'
import errorFormatter from '../helpers/errorFormatter'
import uploadFile from '../helpers/uploadFile'

let createItem = async (req, res) => {
  let errors = validationResult(req).formatWith(errorFormatter)
  let { userId } = req
  let { title, price } = req.body

  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array({ onlyFirstError: true }))
  }

  await ItemModel.create({
    title: title,
    price: price,
    userId: userId,
  })
    .then(item => {
      ItemModel.findByPk(item.getDataValue('id'), { include: ['user'] })
        .then(item => {
          if (!item) {
            return res.status(404).json()
          }

          return res.status(200).json(item)
        })
        .catch(err => {
          return res.json({
            message: errorHandler.getErrorMessage(err),
          })
        })
    })
    .catch(err => {
      return res.json({
        message: errorHandler.getErrorMessage(err),
      })
    })
}

let getItemsList = async (req, res) => {
  let { userId } = req

  await ItemModel.findAll({
    where: { userId: userId },
    include: ['user'],
  })
    .then(items => {
      if (items.length === 0) {
        return res.status(404).json()
      }

      return res.status(200).json(items)
    })
    .catch(err => {
      return res.json({
        message: errorHandler.getErrorMessage(err),
      })
    })
}

let getItemById = async (req, res) => {
  let itemId = req.params.id

  await ItemModel.findByPk(itemId, { include: ['user'] })
    .then(item => {
      if (!item) {
        return res.status(404).json()
      }

      return res.status(200).json(item)
    })
    .catch(err => {
      return res.json({
        message: errorHandler.getErrorMessage(err),
      })
    })
}

let updateItem = async (req, res) => {
  let errors = validationResult(req).formatWith(errorFormatter)
  let itemId = req.params.id
  let { userId } = req
  let { title, price } = req.body

  if (!title && !price) {
    return res.status(403).json({
      message: "At least one of following values: 'title' or 'price' should exist!",
    })
  }

  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array({ onlyFirstError: true }))
  }

  await ItemModel.findByPk(itemId, { include: ['user'] })
    .then(async item => {
      if (!item) {
        return res.status(404).json()
      }

      if (item.getDataValue('userId') !== userId) {
        return res.status(403).json()
      }

      await item
        .update({ title, price })
        .then(updatedItem => {
          return res.status(200).json(updatedItem)
        })
        .catch(err => {
          return res.json({
            message: errorHandler.getErrorMessage(err),
          })
        })
    })
    .catch(err => {
      return res.json({
        message: errorHandler.getErrorMessage(err),
      })
    })
}

let deleteItemById = async (req, res) => {
  let itemId = req.params.id
  let { userId } = req

  await ItemModel.findByPk(itemId)
    .then(async item => {
      if (!item) {
        return res.status(404).json()
      }

      if (item.getDataValue('userId') !== userId) {
        return res.status(403).json()
      }

      await item
        .destroy()
        .then(async item => {
          return res.status(200).json()
        })
        .catch(err => {
          return res.json({
            message: errorHandler.getErrorMessage(err),
          })
        })
    })
    .catch(err => {
      return res.json({
        message: errorHandler.getErrorMessage(err),
      })
    })
}

let uploadImage = async (req, res) => {
  let itemId = req.params.id
  let { userId } = req

  await ItemModel.findByPk(itemId, { include: ['user'] })
    .then(async item => {
      if (!item) {
        return res.status(404).json()
      }

      if (item.getDataValue('userId') !== userId) {
        return res.status(403).json()
      }

      await uploadFile(req, res)
        .then(async file => {
          await item
            .update({ image: file.secure_url })
            .then(updatedItem => {
              return res.status(200).json(updatedItem)
            })
            .catch(err => {
              return res.json({
                message: errorHandler.getErrorMessage(err),
              })
            })
        })
        .catch(err => {
          return res.status(500).json()
        })
    })
    .catch(err => {
      return res.json({
        message: errorHandler.getErrorMessage(err),
      })
    })
}

export default {
  getItemsList,
  getItemById,
  updateItem,
  createItem,
  deleteItemById,
  uploadImage,
}
