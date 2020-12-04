import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import '../styles/header.scss';

const useStyles = makeStyles((theme) => ({
	root: {
		marginBottom: '-4rem',
	},
	appBar: {
		background: '#FAFAFA',
	},
	logo: {
		flexGrow: 1,
		fontSize: '1.3rem',
		color: '#000',
	},
	addAnnons: {
		//
	},

	rightLinks: {
		marginRight: theme.spacing(1),
		color: '#000',
	},
}));

export default function Header(props) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const [register, setRegister] = useState(false);
	const [error, setError] = useState('');

	const parseJwt = (token) => {
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		var jsonPayload = decodeURIComponent(
			atob(base64)
				.split('')
				.map(function (c) {
					return (
						'%' +
						('00' + c.charCodeAt(0).toString(16)).slice(-2)
					);
				})
				.join('')
		);
		return JSON.parse(jsonPayload);
	};

	const setHeaders = () => {
		const token = JSON.parse(localStorage.getItem('userToken'))
			.accessToken;
		if (token) {
			axios.defaults.headers.common['authorization'] = token;
		}
	};

	return (
		<div className={classes.root}>
			<AppBar
				className={classes.appBar}
				position='static'
				elevation={0}>
				<Toolbar>
					<Typography className={classes.logo}>
						<NavLink className={classes.logo} to='/'>
							SasMiya
						</NavLink>
					</Typography>{' '}
					<Typography className={classes.addAnnons}>
						<NavLink
							className={classes.rightLinks}
							to='/dashboard'>
							{' '}
							Saved news{' '}
						</NavLink>

						<Button
							className={classes.rightLinks}
							variant='text'
							onClick={() => {
								if (
									!JSON.parse(
										localStorage.getItem('userToken')
									)
								) {
									setOpen(true);
								} else {
									localStorage.removeItem('userToken');
									return (window.location.href = '/');
								}
							}}>
							{JSON.parse(localStorage.getItem('userToken'))
								? 'logout'
								: 'login'}
						</Button>

						<Dialog
							open={open}
							onClose={() => {
								setOpen(false);
							}}
							aria-labelledby='form-dialog-title'>
							<DialogTitle id='form-dialog-title'>
								<Button
									onClick={() => setRegister(false)}
									variant='text'>
									{' '}
									Login{' '}
								</Button>
								<Button
									variant='text'
									onClick={() => setRegister(true)}>
									{' '}
									Register{' '}
								</Button>
							</DialogTitle>
							{!register && (
								<>
									{' '}
									<DialogContent>
										<TextField
											autoFocus
											margin='dense'
											name='email'
											label='Email Address'
											type='email'
											fullWidth
											onChange={(e) => {
												setEmail(e.target.value.trim());
											}}
										/>
										<TextField
											//	error={val || false}

											margin='dense'
											name='pass'
											label='Password'
											type='password'
											style={{ marginBottom: '2rem' }}
											fullWidth
											onChange={(e) => {
												setPass(e.target.value.trim());
											}}
										/>
										{error && (
											<Typography
												color='secondary'
												variant='subtitle2'>
												{error}
											</Typography>
										)}

										<br />

										<Typography variant='subtitle2'>
											Don't have an account? Register,
											please{' '}
										</Typography>
									</DialogContent>
									<DialogActions>
										<Button
											onClick={() => {
												setOpen(false);
											}}
											color='primary'>
											Cancel
										</Button>
										<Button
											onClick={async () => {
												// User login

												if (email && pass) {
													await axios
														.get('/users', {
															params: {
																email: email,
																password: pass,
															},
														})
														.then((response) => {
															if (
																response.status ===
																200
															) {
																// Get token
																const token =
																	response.data
																		.accessToken;

																// Decode token
																const decoded = parseJwt(
																	token
																);

																//	Save token in an object

																const userToken = {
																	accessToken: token,
																	tokenUserId:
																		decoded.id,
																	tokenUserEmail:
																		decoded.email,
																};
																// Save object in localStorage
																localStorage.setItem(
																	'userToken',
																	JSON.stringify(
																		userToken
																	)
																);

																//	Set header for subsequent request
																setHeaders();

																// change window
																return setOpen(false);
															}
														})
														.catch((err) => {
															if (err) {
																setError(
																	`Something went wrong with your credentials.
                                                                     Please, check again`
																);
															}
														});
												} else {
													setError(
														'Email and password must be provided'
													);
												}
											}}
											color='primary'>
											Login
										</Button>
									</DialogActions>{' '}
								</>
							)}
							{register && (
								<>
									{' '}
									<DialogContent>
										<TextField
											autoFocus
											margin='dense'
											name='email'
											label='Email Address'
											type='email'
											fullWidth
											onChange={(e) => {
												setEmail(e.target.value.trim());
											}}
										/>
										<TextField
											//	error={val || false}

											margin='dense'
											name='pass'
											label='Password'
											type='password'
											style={{ marginBottom: '2rem' }}
											fullWidth
											onChange={(e) => {
												setPass(e.target.value.trim());
											}}
										/>
									</DialogContent>
									<DialogActions>
										<Button
											onClick={() => {
												setOpen(false);
											}}
											color='primary'>
											Cancel
										</Button>
										<Button
											onClick={async () => {
												// User login

												if (email && pass) {
													await axios
														.post('/users', {
															email: email,
															password: pass,
														})
														.then((response) => {
															if (
																response.status ===
																200
															) {
																alert(
																	'Account created'
																);
																setRegister(false);
															}
														})
														.catch((err) => {
															if (err) {
																throw err;
															}
														});
												}
											}}
											color='primary'>
											Login
										</Button>
									</DialogActions>{' '}
								</>
							)}
						</Dialog>
					</Typography>
				</Toolbar>
			</AppBar>
			<Toolbar />
		</div>
	);
}
