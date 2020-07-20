'use strict';

const path = require('path');
const fs = require('fs');
const swaggerTools = require('swagger-tools');
const jsyaml = require('js-yaml');
const express = require('express');
const connectDB = require('./config/db');

const http = require('http');
const privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
const certificate = fs.readFileSync('sslcert/server.cert', 'utf8');

const credentials = {key: privateKey, cert: certificate, requestCert: false,
    rejectUnauthorized: false};

const healthRoute = require('./routes/health');
const userRoute = require('./routes/user');
const loginRoute = require('./routes/login');
const messageRoute = require('./routes/message');


const PORT = process.env.PORT || 3000;

connectDB();
const app = express();
const httpServer = http.createServer(app);
const io = require("socket.io"),
      server = io.listen(httpServer);

    let
        sequenceNumberByClient = new Map();

    // event fired every time a new client connects:
    server.on("connection", (socket) => {
        console.info(`Client connected [id=${socket.id}]`);
        // initialize this client's sequence number
        sequenceNumberByClient.set(socket, 1);

        // when socket disconnects, remove it from the list:
        socket.on("disconnect", () => {
            sequenceNumberByClient.delete(socket);
            console.info(`Client gone [id=${socket.id}]`);
        });
    });

    // sends each client its current sequence number
    setInterval(() => {
        for (const [client, sequenceNumber] of sequenceNumberByClient.entries()) {
            client.emit("seq-num", sequenceNumber);
            sequenceNumberByClient.set(client, sequenceNumber + 1);
        }
    }, 1000);


app.use(express.json({extended: false}));
app.use(express.urlencoded({extended: false}));

app.use('/health', healthRoute);
app.use('/user', userRoute);
app.use('/login', loginRoute);
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

httpServer.listen(PORT);

app.disable('etag');
