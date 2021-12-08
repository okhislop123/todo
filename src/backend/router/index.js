const { Router } = require('express');

const rootRouter = Router();
const { todoRoute } = require('./todo.router');

rootRouter.use('/doto', todoRoute);
module.exports = {
  rootRouter,
};
