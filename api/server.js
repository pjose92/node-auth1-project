const express = require('express');

// const knexSessionStore = require('connect-session-knex')(session);

// const express = require('express');
// const helmet = require('helmet');
// const cors = require('cors');

// const restricted = require('../auth/restricted-middleware');

// getting our express routers
// const usersRouter = require('../users/users-router');
const authRouter = require("../auth/auth-router");

// creating the server object
const server = express();


// global middleware
//  server.use(helmet());
//  server.use(cors());

//  server.use(session(sessionConfig));

server.use(express.json());


//  server.use("/api/users", usersRouter);
 server.use("/api/auth", authRouter);

 server.get("/", (req, res) => {
     res.json({ api: "up" });
 })

 module.exports = server;