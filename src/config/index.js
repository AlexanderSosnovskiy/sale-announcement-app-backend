import { resolve } from 'path'
require('dotenv').config({ path: resolve(process.cwd(), '.env') })

let config = {
  db: {
    development: {
      database: process.env.DEV_DB_NAME || 'dev_db',
      host: process.env.DEV_DB_HOST || 'localhost',
      port: process.env.DEV_DB_PORT || '3306',
      user: process.env.DEV_DB_USERNAME || 'root',
      password: process.env.DEV_DB_PASSWORD || 'qwerty',
    },
    test: {
      database: process.env.TEST_DB_NAME || 'test_db',
      host: process.env.TEST_DB_HOST || 'localhost',
      port: process.env.TEST_DB_PORT || '3306',
      user: process.env.TEST_DB_USERNAME || 'root',
      password: process.env.TEST_DB_PASSWORD || 'qwerty',
    },
    production: {
      database: process.env.DEV_DB_NAME || 'prod_db',
      host: process.env.DEV_DB_HOST || 'localhost',
      port: process.env.DEV_DB_PORT || '3306',
      user: process.env.DEV_DB_USERNAME || 'root',
      password: process.env.DEV_DB_PASSWORD || 'qwerty',
    },
  },
  server: {
    protocol: process.env.SERVER_PROTOCOL || 'http',
    host: process.env.SERVER_HOST || 'localhost',
    port: process.env.SERVER_PORT || '8080',
    getURL: function () {
      return `${this.protocol}://${this.host}:${this.port}`
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET || '',
  },
  cloud: {
    name: process.env.CLOUD_NAME,
    key: process.env.CLOUD_KEY,
    secret: process.env.CLOUD_SECRET,
  },
}

export default config
