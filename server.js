const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app = express();

// Settings
const port = process.env.PORT || 3000;

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api/tasks', require('./app/routes/task.routes'));
app.use('/api/users', require('./app/routes/user.routes'));
app.use('/api/type_tasks', require('./app/routes/type_task.routes'));

// Static files
app.use(express.static(__dirname + '/app/public'));

// Server is listening
app.listen(port, () => {
  console.log('Server is running on port', port);
});
