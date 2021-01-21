import mysql from 'mysql2'
import { Sequelize } from 'sequelize'

import config from '../config'

let env = process.env.NODE_ENV || 'development'
const { database, host, port, user, password } = config.db[env]

let sequelize = new Sequelize(database, user, password, {
  dialect: 'mysql',
  host: host,
  port: port,
  define: {
    timestamps: false,
    freezeTableName: false,
    dialectOptions: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      useUTC: false,
      timezone: 'Etc/GMT+2',
    },
  },
  logging: false,
})

process.on('exit', () => {
  sequelize
    .close()
    .then(() => {
      console.log(`Connection to database "${database}" is closed!`)
      process.exit(0)
    })
    .catch(err => {
      console.log(err)
    })
})

async function init() {
  let pool = mysql.createPool({ host, port, user, password }).promise()
  await pool
    .query(`CREATE DATABASE IF NOT EXISTS ${database}`)
    .then(result => {
      console.log(`Database: "${database}" was created and running on: ${host}:${port}`)
      pool.end()
    })
    .catch(err => {
      console.log(err)
    })

  console.log('Waiting for creating tables...')

  await sequelize
    .sync({ alter: true })
    .then(result => {
      let tables = Object.keys(sequelize.models)
        .map(table => {
          return table.replace(table[0], table[0].toUpperCase()) + 's'
        })
        .join(', ')
      console.log(`Tables: "${tables}" were created!`)
    })
    .catch(err => {
      console.log(err)
    })
}

init()

export default sequelize
