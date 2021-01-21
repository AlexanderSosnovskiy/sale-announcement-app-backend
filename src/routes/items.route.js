import express from 'express'
import itemsCtrl from '../controllers/items.controller'
import { itemValidation } from '../helpers/validations/itemValidation'
import readFileBuffer from '../helpers/multer'

let itemsRouter = express.Router()

itemsRouter.route('/').get(itemsCtrl.getItemsList).post(itemValidation.create, itemsCtrl.createItem)

itemsRouter
  .route('/:id')
  .get(itemsCtrl.getItemById)
  .put(itemValidation.update, itemsCtrl.updateItem)
  .delete(itemsCtrl.deleteItemById)

itemsRouter.route('/:id/images').post(readFileBuffer.single('file'), itemsCtrl.uploadImage)

export default itemsRouter
