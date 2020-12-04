const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(12);
mongoose.connect('mongodb://localhost/coloc', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

//'useFindAndModify' set to false

mongoose.set('useFindAndModify', false);

//Connection to db

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// User schema

const userSchema = new mongoose.Schema({
	email: String,
	password: String,
	memberSince: String,
});

async function loadUsers() {
	let user = mongoose.model('users', userSchema);
	return user;
}

// add User

router.post('/', async function (req, res) {
	const hashed = bcrypt.hashSync(req.body.password, salt);

	let payload = {
		email: req.body.email,
		password: hashed,
		memberSince: new Date(),
	};

	let query = await loadUsers();
	const newUser = new query(payload);
	newUser.save((err) => {
		if (err) return res.status(500).send(err);
		return res
			.status(200)
			.send(`Message from db: Inserted a new row`);
	});
});

router.get('/', async function (req, res) {
	const query = await loadUsers();
	if (req.query.email && req.query.password) {
		const result = await query.findOne({
			email: req.query.email,
		});

		if (result) {
			let check = bcrypt.compareSync(
				req.query.password,
				result.password
			);
			if (check) {
				const accessToken = jwt.sign(
					{
						id: result._id,
						email: result.email,
					},
					process.env.SECRET_TOKEN
				);
				return res.status(200).json({ accessToken: accessToken });
			} else {
				return res.status(404).send('Incorrect password');
			}
		} else {
			return res.status(404).send('Email or password incorrect');
		}
	}
});

module.exports = router;
