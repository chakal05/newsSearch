import React, { useContext, useState } from 'react';
import { userContext } from '../components/userContext';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import pic from '../assets/undraw_pizza_sharing_wxop.svg';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import {
	Button,
	CardActions,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@material-ui/core';

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
	const [title, setTitle] = useState('');
	const [headline, setHeadline] = useState('');
	const [body, setBody] = useState('');
	const [author, setAuthor] = useState('');
	const [open, setOpen] = useState(false);
	const [opna, setOpna] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const classes = useStyles();

	const data = useContext(userContext);

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
						<img src={pic} alt='pic' />
					</Grid>
				</Grid>
			</section>
			<section>
				<Grid container>
					<Grid
						item
						xs={12}
						className={classes.postSectionTitle}>
						<h1> Articles </h1>
						<div>
							<Button
								variant='outlined'
								onClick={handleClickOpen}>
								Add an article
							</Button>
							<Dialog
								open={open}
								onClose={handleClose}
								aria-labelledby='form-dialog-title'>
								<DialogTitle id='form-dialog-title'>
									Adding article
								</DialogTitle>
								<DialogContent>
									<DialogContentText>
										To add an article to this website,
										please enter title, headline, body and
										author name here. We will display the
										article for you.
									</DialogContentText>
									<form
										onSubmit={(e) => {
											e.preventDefault();
										}}>
										<TextField
											onChange={(e) => {
												setTitle(e.target.value);
											}}
											variant='outlined'
											label={'Title'}
										/>
										<TextField
											onChange={(e) => {
												setHeadline(e.target.value);
											}}
											variant='outlined'
											label='Headline'
										/>
										<TextField
											multiline
											rows={3}
											onChange={(e) => {
												setBody(e.target.value);
											}}
											variant='outlined'
											label='body'
										/>
										<TextField
											onChange={(e) => {
												setAuthor(e.target.value);
											}}
											variant='outlined'
											label='author'
										/>
									</form>
								</DialogContent>
								<DialogActions>
									<Button
										onClick={handleClose}
										color='primary'>
										Cancel
									</Button>
									<Button
										type='submit'
										color='primary'
										onClick={(e) => {
											e.preventDefault();
											if (
												(title, body, headline, author)
											) {
												axios
													.post('/articles', {
														title,
														body,
														headline,
														date: new Date(),
														author,
													})
													.then((response) => {
														if (
															response.status === 200
														) {
															alert(response.data);
															window.location.reload();
														}
													})
													.catch((err) => {
														if (err) throw err;
													});
											} else {
												alert(
													'Please, make sure every field is filled'
												);
											}
										}}>
										Add
									</Button>
								</DialogActions>
							</Dialog>
						</div>
					</Grid>
					<Grid container justify='center'>
						{data[0] &&
							data.map((item) => (
								<Grid
									item
									xs={3}
									style={{
										textAlign: 'center',
										margin: '.5rem',
									}}>
									<Card
										className={classes.root}
										variant='outlined'>
										<CardContent>
											<Typography
												className={classes.title}
												color='textSecondary'
												gutterBottom>
												Artilce id: {item._id}
											</Typography>
											<Typography
												variant='h5'
												component='h2'>
												Title: {item.title}
											</Typography>
											<Typography
												className={classes.pos}
												color='textSecondary'>
												Headline: {item.headline}
											</Typography>
											<Typography
												variant='body2'
												component='p'>
												Artcle body: {item.body}
											</Typography>
											<Typography
												variant='body2'
												component='p'>
												Author : {item.author}
											</Typography>
											<Typography
												variant='body2'
												component='p'>
												Date: {item.date.substr(0, 10)}
											</Typography>
										</CardContent>
										<CardActions
											style={{
												display: 'flex',
												justifyContent: 'center',
											}}>
											<div>
												<Button
													variant='contained'
													color='secondary'
													onClick={() => {
														axios
															.delete('/articles', {
																data: {
																	id: item._id,
																},
															})
															.then((response) => {
																if (
																	response.status ===
																	200
																) {
																	alert(
																		response.data
																	);
																	window.location.reload();
																}
															});
													}}>
													{' '}
													Delete{' '}
												</Button>
											</div>
											<div>
												<Button
													variant='contained'
													color='primary'
													onClick={() => {
														setOpna(true);
													}}>
													Update
												</Button>
												<Dialog
													open={opna}
													onClose={() => {
														setOpna(false);
													}}
													aria-labelledby='form-dialog-title'>
													<DialogTitle id='form-dialog-title'>
														Edit
													</DialogTitle>
													<DialogContent>
														<DialogContentText>
															To edit the article ,
															please change in the
															fields here.
														</DialogContentText>
														<form>
															<TextField
																onChange={(e) => {
																	setTitle(
																		e.target.value
																	);
																}}
																variant='outlined'
																label={'Title'}
																defaultValue={
																	item.title
																}
															/>
															<TextField
																onChange={(e) => {
																	setHeadline(
																		e.target.value
																	);
																}}
																variant='outlined'
																label='Headline'
																defaultValue={
																	item.headline
																}
															/>
															<TextField
																multiline
																rows={3}
																onChange={(e) => {
																	setBody(
																		e.target.value
																	);
																}}
																defaultValue={
																	item.body
																}
																variant='outlined'
																label='body'
															/>
															<TextField
																onChange={(e) => {
																	setAuthor(
																		e.target.value
																	);
																}}
																defaultValue={
																	item.author
																}
																variant='outlined'
																label='author'
															/>
														</form>
													</DialogContent>
													<DialogActions>
														<Button
															onClick={() => {
																setOpna(false);
															}}
															color='primary'>
															Cancel
														</Button>
														<Button
															type='submit'
															color='primary'
															onClick={() => {
																axios
																	.put(
																		`/articles/:${item._id}`,
																		{
																			id: item._id,
																			title,
																			headline,
																			body,
																			author,
																			date: new Date(),
																		}
																	)
																	.then(
																		(response) => {
																			if (
																				response.status ===
																				200
																			) {
																				alert(
																					response.data
																				);
																				window.location.reload();
																			}
																		}
																	);
															}}>
															Update
														</Button>
													</DialogActions>
												</Dialog>
											</div>
										</CardActions>
									</Card>
								</Grid>
							))}
					</Grid>
				</Grid>
			</section>
			<section>
				<Grid container>
					<Grid
						item
						xs={12}
						className={classes.postSectionTitle}>
						{
							//<h1>Tusentals potentiella rumskompisar</h1>
						}
					</Grid>
				</Grid>
			</section>
		</div>
	);
}

export default Landing;
