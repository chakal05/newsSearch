require('dotenv').config()
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
	username: String,
	password: String,
	email: String,
	age: Number,
	gender: String,
	city: String,
	// imageName: {
	// 	type: String,
	// 	default: 'none',
	// },
	// imageData: {
	// 	type: String,
	// },
	professionalSituation: String,
	memberSince: String,
});

async function loadUsers() {
	let users = mongoose.model('users', userSchema);
	return users;
}

// add post

router.post('/', async function (req, res) {
	let payload = {
		username: 'johan12',
		password: bcrypt.hashSync('pass', salt),
		email: 'johan@gmail.com',
		age: 32,
		gender: 'male',
		city: 'Gothenburg',
		// imageName: {
		// 	type: 'jpg',
		// 	default: 'none',
		// },
		// imageData: {
		// 	type: 'jpg',
		// },
		professionalSituation: 'Student',
		memberSince: new Date().toLocaleString(),
	};

	let query = await loadUsers();
	const newMessage = new query(payload);
	newMessage.save((err) => {
		if (err) return console.log(err);
		return res.send(`Message from db: Inserted a new user`);
	});
});

// get users

router.get('/', async function (req, res) {
	const query = await loadUsers();
	// Get all users

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
					JSON.parse(JSON.stringify(result)),
					process.env.SECRET_TOKEN
                );
				return res.send({ accessToken: accessToken });
			} else {
				return res.send('Incorrect password');
			}
		} else {
			return res.send('Email or password incorrect');
		}
	}
});

router.get('/:id', async function (req, res) {
	const query = await loadUsers();
	query
		.find({ _id: req.query.id }, (error, messages) => {
			if (error) return res.status(500).send(error);
			return res.status(200).send(messages);
		})
		.catch((err) => {
			throw err;
		});
});

// update message
router.put('/:id', async function (req, res) {
	const query = await loadUsers();
	const update = {
		userToRead: 'yes',
	};
	await query.findByIdAndUpdate(
		req.body.id,
		update,
		{ new: true, upsert: true },

		(err) => {
			if (err) return res.status(500).send(err);
			return res.status(200).send('updated message status');
		}
	);
});

// delete Message

router.delete('/', async function (req, res) {
	id = req.body.id;
	let query = await loadUsers();
	query.findByIdAndRemove(id, (err, doc) => {
		if (err) return res.status(500).send(err);
		return res.status(200).send(`Deleted one item`);
	});
});

module.exports = router;
