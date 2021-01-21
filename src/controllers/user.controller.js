import UserModel from '../models/user.model'
import errorHandler from '../helpers/dbErrorHandler'

let getMe = async (req, res) => {
  let { userId } = req

  await UserModel.findByPk(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json()
      }

      return res.status(200).json(user)
    })
    .catch(err => {
      return res.json({
        message: errorHandler.getErrorMessage(err),
      })
    })
}

export default {
  getMe,
}
