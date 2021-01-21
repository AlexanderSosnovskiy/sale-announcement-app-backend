import express from 'express'

import itemsRouter from './items.route'
import authCtrl from '../controllers/auth.controller'
import userCtrl from '../controllers/user.controller'
import { loginValidation } from '../helpers/validations/loginValidation'
import { registerValidation } from '../helpers/validations/registerValidation'
import checkToken from '../middlewares/checkToken'

let appRouter = express.Router()

appRouter.post('/login', loginValidation, authCtrl.signin)
appRouter.post('/register', registerValidation, authCtrl.signup)

appRouter.get('/me', checkToken, userCtrl.getMe)

appRouter.use('/items', checkToken, itemsRouter)

export default appRouter
