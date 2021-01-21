import { DataTypes } from 'sequelize'

import sequelize from '../db'

const ItemModel = sequelize.define(
  'item',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(11),
    },
    title: {
      allowNull: false,
      type: DataTypes.CHAR,
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    image: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    createdAt: {
      allowNull: false,
      defaultValue: Date.now(),
      type: DataTypes.BIGINT,
    },
  },
  {
    tableName: 'items',
    indexes: [
      {
        unique: true,
        fields: ['id'],
      },
    ],
  }
)

export default ItemModel
