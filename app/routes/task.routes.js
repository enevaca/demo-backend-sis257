const express = require('express');
const { withJWTAuthMiddleware } = require('express-kun');
const { SECRET_TOKEN } = require('../config/config');

const router = express.Router();
const protectedRouter = withJWTAuthMiddleware(router, SECRET_TOKEN);

const tasks = require('../controllers/task.controllers');

protectedRouter.post('/', tasks.create);

protectedRouter.get('/', tasks.finAll);

protectedRouter.get('/:taskId', tasks.finOne);

protectedRouter.put('/:taskId', tasks.update);

protectedRouter.delete('/:taskId', tasks.delete);

protectedRouter.delete('/', tasks.deleteAll);

module.exports = router;
