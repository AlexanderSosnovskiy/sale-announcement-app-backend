# Usage

## Development:

1. In the root folder run:
```npm install``` or
```yarn```

2. Install MySQL client if you don't have it. 

3. Change the file '.env' with your configurations for MySQL 

4. Run the following command with your own configs which you defined in '.env' file:
```mysql -h localhost -u root -p```

5. In the root folder run the following command:
```npm run serve``` or 
```yarn serve```

The server will run on port 3000.


## Folder structure 
```
    src/
      config/
      controllers/
      db/
      helpers/
      middlewares/
      models/
      routes/
      app.js
    .babelrc
    .env
    nodemon.json
    .prettierc
    package-lock.json
    package.json
```
