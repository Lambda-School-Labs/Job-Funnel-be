if(!process.env.DB_ENV || process.env.DB_ENV === 'testing'){
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const fileUpload = require('express-fileupload');

const authenticate = require('./auth/authenticate-middleware.js');
const authRouter = require('./auth/auth-router.js');
const userRouter = require('./routers/users-router.js');
const historyRouter = require('./routers/history-router.js');
const debugRouter = require('./routers/debug-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(fileUpload({useTempFiles: true}));

server.use('/api/auth', authRouter);
server.use('/api/users', authenticate, userRouter);
server.use('/api/history', authenticate, historyRouter);
server.use('/api/debug', authenticate, debugRouter);

server.get('/', (req, res) => {
    res.status(200).json({message: 'hi'});
});

module.exports = server;