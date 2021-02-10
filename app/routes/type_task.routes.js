const express = require('express');
const { withJWTAuthMiddleware } = require('express-kun');
const { SECRET_TOKEN } = require('../config/config');

const router = express.Router();
const protectedRouter = withJWTAuthMiddleware(router, SECRET_TOKEN);

const typeTasks = require('../controllers/type_task.controllers');

protectedRouter.post('/', typeTasks.create);

protectedRouter.get('/', typeTasks.finAll);

protectedRouter.get('/:taskId', typeTasks.finOne);

protectedRouter.put('/:taskId', typeTasks.update);

protectedRouter.delete('/:taskId', typeTasks.delete);

protectedRouter.delete('/', typeTasks.deleteAll);

module.exports = router;
