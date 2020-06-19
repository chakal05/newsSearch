const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
	cors({
		credentials: true,
		origin: 'http://localhost:3000',
	})
);
app.use(helmet());

//Middleware

const auth = function (req, res, next) {
	if (!req.headers.authorization)
		return res.status(403).json({ error: 'No credentials sent!' });

	next();
};

const posts = require('./routes/posts');
const users = require('./routes/users');

app.use('/posts', posts);
app.use('/users', users);

// if(process.env.NODE_ENV === 'production'){
// // Static folder
// app.use(express.static(__dirname + "/public/"));

// //SPA
// app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));

// }

const port = process.env.port || 4000;
app.listen(port, () => console.log('APP RUNNING ON PORT 4000'));
