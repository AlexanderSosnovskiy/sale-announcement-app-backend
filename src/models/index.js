import UserModel from './user.model'
import ItemModel from './item.model'

UserModel.hasMany(ItemModel)
ItemModel.belongsTo(UserModel)
