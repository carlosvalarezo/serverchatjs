'use strict';

const path = require('path');
const fs = require('fs');
const swaggerTools = require('swagger-tools');
const jsyaml = require('js-yaml');
const express = require('express');
const connectDB = require('./config/db');
const http = require('http');


const PORT = process.env.PORT || 8001;

const app = express();
const httpServer = http.createServer(app).listen(PORT);

const healthRoute = require('./routes/health');
const userRoute = require('./routes/user');
const loginRoute = require('./routes/login');
const messageRoute = require('./routes/message');

connectDB();

app.use((req, res, next) => {
  res.header('Content-Type','application/json');
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers','*');
  next();
});

app.use(express.json({extended: false}));
app.use(express.urlencoded({extended: false}));


app.use('/health', healthRoute);
app.use('/user', userRoute);
app.use('/login', loginRoute);
app.use('/message', messageRoute);

const spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
const swaggerDoc = jsyaml.safeLoad(spec);

swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  app.use(middleware.swaggerMetadata());
  app.use(middleware.swaggerValidator());
  app.use(middleware.swaggerUi());
});

app.disable('etag');
