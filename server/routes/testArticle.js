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


const model =mongoose.model('articles', articleSchema);

module.exports = model;
