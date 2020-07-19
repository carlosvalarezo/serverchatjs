'use strict';

const path = require('path');
const fs = require('fs');
const swaggerTools = require('swagger-tools');
const jsyaml = require('js-yaml');
const express = require('express');
const connectDB = require('./config/db');

const https = require('https');
const privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
const certificate = fs.readFileSync('sslcert/server.cert', 'utf8');

const credentials = {key: privateKey, cert: certificate};

const healthRoute = require('./routes/health');
const userRoute = require('./routes/user');
const loginRoute = require('./routes/login');
const authRoute = require('./routes/auth');
const messageRoute = require('./routes/message');

const PORT = process.env.PORT || 8443;

connectDB();
const app = express();

app.use(express.json({extended: false}));
app.use(express.urlencoded({extended: false}));

app.use('/health', healthRoute);
app.use('/user', userRoute);
app.use('/login', loginRoute);
app.use('/auth', authRoute);
app.use('/message', messageRoute);
// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
const spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
const swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

});

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(8443);

app.disable('etag');
