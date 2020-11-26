const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');

// Body parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS middleware
app.use(
	cors({
		credentials: true,
		origin: 'http://localhost:3000',
	})
);

// Helmet middleware
app.use(helmet());

// Handle routes 
const articles = require('./routes/articles');
app.use('/articles', articles);

// Port
const port = process.env.port || 4000;
app.listen(port, () => console.log('APP RUNNING ON PORT 4000'));
