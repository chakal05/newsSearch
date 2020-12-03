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

// Check for headers

const auth = function (req, res, next) {
	console.log(req.headers.authorization);
	if (!req.headers.authorization)
		return res.status(403).json({ error: 'No credentials sent!' });
	return next();
};

// Handle routes
const articles = require('./routes/articles');
const users = require('./routes/users');
app.use('/articles', auth, articles);
app.use('/users', users);

process.env.NODE_ENV = 'development';

//Static folder

app.use(express.static(__dirname + '/public/'));

// SPA

app.get(/.*/, (req, res) =>
	res.sendFile(__dirname + '/public/index.html')
);

// Port
const port = process.env.port || 4000;

app.listen(port, () => console.log(`App listening on port ${port}!`));
