const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/coloc', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// 'useFindAndModify' set to false

mongoose.set('useFindAndModify', false);
//Connection to db

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Message schema

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	age: String,
	gender: String,
    city: Number,
    photo: String,
	professionalSituation: String,
	published: String,
	availableFrom: String,
});

async function loadUsers() {
	let user = mongoose.model('posts', userSchema);
	return user;
}

// add Message

router.post('/', async function (req, res) {
	let payload = {
		senderName: 'req.body.name',
		userFrom: 'req.body.from',
		userTo: 'req.body.to',
		headline: 'req.body.headline',
		message: 'req.body.message',
		time: 'req.body.time',
		userToRead: 'req.body.user_to_read',
	};

	let query = await loadUsers();
	const newMessage = new query(payload);
	newMessage.save((err) => {
		if (err) return res.sendStatus(500).send(err);
		return res
			.status(200)
			.send(`Message from db: Inserted a new row`);
	});
});

// get personel list

router.get('/', async function (req, res) {

	const query = await loadUsers();
	// Get all messages

	query
		.find({}, (error, posts) => {
            if (error) return res.send(error);
            console.log(posts)
			return res.send(posts);
		})
		.catch((err) => {
			throw err;
		});
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
