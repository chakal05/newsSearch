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
	user: String,
	title: String,
	description: String,
	content: String,
	url: String,
	image: String,
	author: String,
	pubilshedAt: String,
});

async function loadPosts() {
	let article = mongoose.model('articles', articleSchema);
	return article;
}

// add article

router.post('/', async function (req, res) {
	const payload = {
		user: req.body.user,
		title: req.body.title,
		description: req.body.description,
		content: req.body.content,
		url: req.body.url,
		image: req.body.image,
		author: req.body.author,
		pubilshedAt: req.body.pubilshedAt,
	};

	const query = await loadPosts();
	const newArticle = new query(payload);
	newArticle.save((err) => {
		if (err) return res.sendStatus(500).send(err);
		return res.status(200).send(`Saved item`);
	});
});

// get articles

router.get('/', async function (req, res) {
	const query = await loadPosts();

	// Get all articles

	query
		.find({ user: req.query.user }, (error, posts) => {
			if (error) return res.status(404).send(error);
			return res.status(200).send(posts);
		})
		.catch((err) => {
			throw err;
		});
});

// delete article

router.delete('/', async function (req, res) {
	
	id = req.body.id;
	let query = await loadPosts();
	query.findByIdAndRemove(id, (err, doc) => {
		if (err) return res.status(500).send(err);
		return res.status(200).send(`Deleted item`);
	});
});

module.exports = router;
