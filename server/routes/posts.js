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

// post schema

const postSchema = new mongoose.Schema({
	postTitle: String,
	postOwnerId: String,
	postHeadline: String,
	postDescription: String,
	rent: Number,
	location: String,
    moveIn: String,
    moveOut: String,
    numberOfGuest: Number,
    numberOfRums: Number,
    size: String,
    published: String,
});

async function loadPosts() {
	let post = mongoose.model('posts', postSchema);
	return post;
}

// add Post

// router.post('/', async function (req, res) {
// 	let payload = {
// 		senderName: 'req.body.name',
// 		userFrom: 'req.body.from',
// 		userTo: 'req.body.to',
// 		headline: 'req.body.headline',
// 		message: 'req.body.message',
// 		time: 'req.body.time',
// 		userToRead: 'req.body.user_to_read',
// 	};

// 	let query = await loadPosts();
// 	const newMessage = new query(payload);
// 	newMessage.save((err) => {
// 		if (err) return res.sendStatus(500).send(err);
// 		return res
// 			.status(200)
// 			.send(`Message from db: Inserted a new row`);
// 	});
// });

// get post list

router.get('/', async function (req, res) {
	const query = await loadPosts();
	// Get all messages

	query
		.find({}, (error, posts) => {
            if (error) return res.status(404).send(error);
			return res.status(200).send(posts);
		})
		.catch((err) => {
			throw err;
		});
});

// router.get('/:id', async function (req, res) {
//     console.log(req.query)
// 	const query = await loadPosts();
// 	query
// 		.find({ _id: req.query.id }, (error, messages) => {
// 			if (error) return res.status(500).send(error);
// 			return res.status(200).send(messages);
// 		})
// 		.catch((err) => {
// 			throw err;
// 		});
// });

// router.put('/:id', async function (req, res) {
// 	const query = await loadPosts();
// 	const update = {
// 		userToRead: 'yes',
// 	};
// 	await query.findByIdAndUpdate(
// 		req.body.id,
// 		update,
// 		{ new: true, upsert: true },

// 		(err) => {
// 			if (err) return res.status(500).send(err);
// 			return res.status(200).send('updated message status');
// 		}
// 	);
// });

// delete Message

// router.delete('/', async function (req, res) {
// 	id = req.body.id;
// 	let query = await loadPosts();
// 	query.findByIdAndRemove(id, (err, doc) => {
// 		if (err) return res.status(500).send(err);
// 		return res.status(200).send(`Deleted one item`);
// 	});
// });

module.exports = router;
