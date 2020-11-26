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

const articleSchema = new mongoose.Schema({
	title: String,
	headline: String,
	author: String,
	body: String,
	date: String,
});

async function loadPosts() {
	let article = mongoose.model('articles', articleSchema);
	return article;
}

// add article

router.post('/', async function (req, res) {
	const payload = {
		title: req.body.title,
		body: req.body.body,
		headline: req.body.headline,
		author: req.body.author,
		date: req.body.date,
	};

	const query = await loadPosts();
	const newArticle = new query(payload);
	newArticle.save((err) => {
		if (err) return res.sendStatus(500).send(err);
		return res.send(`Message from db: Inserted a new article`);
	});
});

// get articles

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

// Update article 

router.put('/:id', async function (req, res) {
	const query = await loadPosts();
	const update = {
		title: req.body.title,
		body: req.body.body,
		headline: req.body.headline,
		author: req.body.author,
		date: req.body.date,
	};
	await query.findByIdAndUpdate(
		req.body.id,
		update,
		{ new: true, upsert: true },

		(err) => {
			if (err) return res.status(500).send(err);
			return res.status(200).send('updated article');
		}
	);
});

// delete article

router.delete('/', async function (req, res) {
	id = req.body.id;
	let query = await loadPosts();
	query.findByIdAndRemove(id, (err, doc) => {
		if (err) return res.status(500).send(err);
		return res.status(200).send(`Deleted article`);
	});
});

module.exports = router;
