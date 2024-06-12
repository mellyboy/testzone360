if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'dev';
}

const dotenv = require('dotenv');
const path = require('path');

const env = process.env.NODE_ENV || 'dev';
dotenv.config({ path: path.resolve(__dirname, `./config/.env.${env}`) });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./route/user');
const feedRoutes = require('./route/feed');
const taskRoutes = require('./route/task');

const pool = require('./db');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

//routes
app.use('/api/user', userRoutes);
app.use('/api', feedRoutes);
app.use('/api', taskRoutes);

//start
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
