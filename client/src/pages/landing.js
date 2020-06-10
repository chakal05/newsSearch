import React, { useState, useEffect } from 'react';
//import { Route, Link } from 'react-router-dom';
import axios from 'axios';
function Landing() {
	const [posts, setPost] = useState([]);

	const getPosts = async () => {
		await axios.get('http://localhost:4000').then((response) => {
			const listOfPost = [response.data];
			listOfPost.map((post) => setPost(post));
		});
	};

	useEffect(() => {
		getPosts();
	}, []);
	return (
		<div>
			<div>
				<h1>Presentation</h1>
			</div>
			<h2>Senaste inläggen</h2>{' '}
			<div>
				{posts.map((post) => (
					<div key={post._id}>
						<h5> {post.postTitle} </h5>
						<p>
							{' '}
							{post.postDescription} i <b>{post.location}</b>{' '}
						</p>
					</div>
				))}
			</div>
			<button> Se mer </button>
		</div>
	);
}

export default Landing;
