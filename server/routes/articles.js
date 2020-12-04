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
    id:String,
	user: String,
	title: String,
	description: String,
	body: String,
	url: String,
	image: String,
	provider: String,
	datePublished: String,
});

async function loadPosts() {
	let article = mongoose.model('articles', articleSchema);
	return article;
}

// add article

router.post('/', async function (req, res) {
	const payload = {
        id: req.body.id,
		user: req.body.user,
		title: req.body.title,
		description: req.body.description,
		body: req.body.body,
		url: req.body.url,
		image: req.body.image,
		provider: req.body.provider,
		datePublished: req.body.datePublished,
	};

	const query = await loadPosts();
	const newArticle = new query(payload);
	newArticle.save((err) => {
		if (err) return res.status(500).send(err);
		return res.status(200).send('New item saved');
	});
});

// get articles

router.get('/', async function (req, res) {
	const query = await loadPosts();

	// Get all articles

	query
		.find({ user: req.query.user }, (error, posts) => {
			if (error) return res.status(404).send(err);
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
		if (err) return res.status(500);
		return res.status(200).send('Item deleted');
	});
});

module.exports = router;
