require('dotenv').config({ path: './.env' });

const express = require('express');
const app = express();
const PORT = 8080;


// init morgan
const morgan = require('morgan');
app.use(morgan('dev'));

// init body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// init cors
const cors = require('cors');
app.use(cors());

// init db client
const client = require('./db/client');
client.connect();

// cookie parser and secret
require('dotenv').config({path: './.env' })
const cookieParser = require('cookie-parser')
app.use(cookieParser(process.env.COOKIE_SECRET))

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Router: /api
app.use('/api', require('./api'));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
