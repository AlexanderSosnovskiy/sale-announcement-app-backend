import { DataTypes } from 'sequelize'

import sequelize from '../db'
import { encryptPassword, makeSalt } from '../helpers/encryptPassword'
import ItemModel from './item.model'

const UserModel = sequelize.define(
  'user',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(11),
    },
    phone: {
      allowNull: true,
      type: DataTypes.CHAR(20),
      defaultValue: '',
    },
    email: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.CHAR(50),
    },
    name: {
      allowNull: false,
      type: DataTypes.CHAR(50),
      defaultValue: '',
    },
    password: {
      type: DataTypes.VIRTUAL,
      set: function (password) {
        this.salt = makeSalt()
        this.hashedPassword = encryptPassword(password, this.salt)
      },
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.CHAR(250),
    },
    salt: {
      allowNull: false,
      type: DataTypes.CHAR(50),
    },
  },
  {
    tableName: 'users',
    indexes: [
      {
        unique: true,
        fields: ['id', 'email'],
      },
    ],
    defaultScope: {
      attributes: { exclude: ['hashedPassword', 'salt'] },
    },
  }
)

UserModel.prototype.matchEmail = function (email) {
  return email.trim() === this.email
}

UserModel.prototype.matchPassword = function (password) {
  return encryptPassword(password, this.salt) === this.hashedPassword
}

UserModel.hasMany(ItemModel, { onDelete: 'CASCADE' })
ItemModel.belongsTo(UserModel, {
  as: 'user',
  foreignKey: 'userId',
  onDelete: 'CASCADE',
})

export default UserModel
