import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
//import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import pic from '../assets/undraw_pizza_sharing_wxop.svg';
import pic2 from '../assets/undraw_connection_b38q.svg'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';


// Page style

const useStyles = makeStyles((theme) => ({
	root: {},
	landing: {
		background: '#7277FE',
		height: '70vh',
		paddingTop: '1rem',
	},
	topTxt: {
		maxWidth: '50%',
		padding: '3rem',
		color: '#fff',
		fontSize: '2rem',
	},
	pic: {},
	postSectionTitle: {
		textAlign: 'center',
		padding: '3rem',
    },
    card: {
        maxWidth: 345,
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
    
      avatar: {
        backgroundColor: red[500],
      },
}));

function Landing() {
	const classes = useStyles();
	const posts = [
		{
			postTitle: 'A nice apartment close to the center',
			postOwnerId: 'sdf1w3',
			postHeadline: '2rem',
			postDescription:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin molestie malesuada. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Sed porttitor lectus nibh. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Donec rutrum congue leo eget malesuada. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.',
			rent: 3000,
			location: 'Paris',
			moveIn: 'As soon as possible',
			moveOut: 'Undetermined',
			numberOfGuest: 1,
			numberOfRums: 2,
			size: '57 m2',
			published: 'October 12, 2020',
			availableFrom: 'Immediately',
		},
	];
	// const [posts, setPost] = useState([]);

	// // Get posts

	// const getPosts = async () => {
	// 	await axios.get('/posts').then((response) => {
	// 		const listOfPost = [response.data];
	// 		listOfPost.map((post) => setPost(post));
	// 	});
	// };

	// useEffect(() => {
	// 	getPosts();
	// }, []);
	return (
		<div className={classes.root}>
			<section className={classes.landing}>
				<Grid container>
					<Grid item xs={5} className={classes.topTxt}>
						<h3 style={{ fontSize: '5rem' }}> Lorem Ipsum</h3>
						<p style={{ fontSize: '1.5rem' }}>
							Nulla quis lorem ut libero malesuada feugiat.
							Proin eget tortor risus. Donec rutrum congue leo
							eget malesuada. Vestibulum ante ipsum primis in
							faucibus orci luctus et ultrices posuere cubilia
							Curae; Donec velit neque, auctor sit amet aliquam
							vel, ullamcorper sit amet ligula. Curabitur non
							nulla sit amet nisl tempus convallis quis ac
							lectus. Proin eget tortor risus.
						</p>
					</Grid>
					<Grid item xs={7} className={classes.pic}>
						<img src={pic} />
					</Grid>
				</Grid>
			</section>
			<section>
				<Grid container>
					<Grid
						item
						xs={12}
						className={classes.postSectionTitle}>
						<h1> Sista inläggen </h1>
					</Grid>
					<Grid container justify='center'>
                    <Grid item xs={4}>
                    {posts.map((item) => (
                        <Card className={classes.card} key={item} >
                            <CardHeader
                                avatar={
                                    <Avatar
                                        aria-label='recipe'
                                        className={classes.avatar}>
                                        R
                                    </Avatar>
                                }
                                action={
                                    <IconButton aria-label='settings'></IconButton>
                                }
                                title={item.postTitle}
                                subheader={item.published}
                            />
                            <CardMedia
                                className={classes.media}
                                image={pic2}
                                title='Paella dish'
                            />
                            <CardContent>
                                <Typography
                                    variant='body2'
                                    color='textSecondary'
                                    component='p'>
                                  {item.postDescription}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing></CardActions>
                        </Card>
                    ))} 
                    </Grid>
					</Grid>
				</Grid>
			</section>
			<section>
				<Grid container>
					<Grid
						item
						xs={12}
						className={classes.postSectionTitle}>
						<h1>Tusentals potentiella rumskompisar</h1>
					</Grid>
				</Grid>
			</section>
		</div>
	);
}

export default Landing;

// Display individual posts

// {posts.map((post) => (
//     <div key={post._id}>
//         <h5> {post.postTitle} </h5>
//         <p>
//             {' '}
//             {post.postDescription} i <b>{post.location}</b>{' '}
//         </p>
//         <button
//             onClick={async () => {
//                 await axios.get('http://localhost:4000/:id', {
//                     params: {
//                         id: post._id,
//                     },
//                 });
//             }}>
//             {' '}
//             Se mer{' '}
//         </button>
//     </div>
// ))}
