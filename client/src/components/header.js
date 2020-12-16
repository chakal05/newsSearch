import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import {
	AppBar,
	Toolbar,
	Button,
	Dialog,
	TextField,
	Typography,
	Menu,
	MenuItem,
	DialogTitle,
	DialogContent,
	DialogActions,
} from '@material-ui/core';
import '../styles/header.scss';
import Search from '../components/search';
import logo from '../assets/sasmiyaLogo.png';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Header(props) {
	const [open, setOpen] = useState(false);
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const [register, setRegister] = useState(false);
	const [error, setError] = useState('');
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

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
		<div className='root'>
			<AppBar className='appBar' position='static' elevation={0}>
				<Toolbar className='toolB' style={{ height: '80px' }}>
					<div className='logo'>
						<NavLink to='/'>
							{props.show === 1 && (
								<img
									src={logo}
									alt='logo'
									style={{
										height: '60px',
										width: '60px',
										float: 'left',
										marginRight: '1rem',
									}}
								/>
							)}
						</NavLink>
						<div>
							{props.show === 1 && (
								<Search onSubmit={() => {}} />
							)}
						</div>
					</div>{' '}
					<div className='rightPart'>
						<div className='bars'>
							<Button
								className='btn'
								aria-controls='simple-menu'
								aria-haspopup='true'
								onClick={handleClick}>
								<FontAwesomeIcon
									style={{
										fontSize: '1.5rem',
									}}
									icon={faBars}
								/>
							</Button>
							<Menu
								id='simple-menu'
								anchorEl={anchorEl}
								keepMounted
								open={Boolean(anchorEl)}
								onClose={handleClose}>
								<MenuItem onClick={() => {}}>
									<NavLink
										style={{ color: '#000' }}
										to='/dashboard'>
										{' '}
										SAVED NEWS{' '}
									</NavLink>
								</MenuItem>

								<MenuItem
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
									{JSON.parse(
										localStorage.getItem('userToken')
									)
										? 'LOGOUT'
										: 'LOGIN'}
								</MenuItem>
							</Menu>
						</div>

						<div className='default'>
							<NavLink className='rightLinks' to='/dashboard'>
								{' '}
								SAVED NEWS{' '}
							</NavLink>
							<Button
								style={{
									color: '#000',
									marginTop: '-1px',
									marginLeft: '5px',
								}}
								size='large'
								variant='text'
								className='loginBtn'
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
									<div>
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
													setEmail(
														e.target.value.trim()
													);
												}}
											/>
											<TextField
												margin='dense'
												name='pass'
												label='Password'
												type='password'
												style={{
													marginBottom: '2rem',
												}}
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
																	return setOpen(
																		false
																	);
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
									</div>
								)}
								{register && (
									<div>
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
													setEmail(
														e.target.value.trim()
													);
												}}
											/>
											<TextField
												//	error={val || false}

												margin='dense'
												name='pass'
												label='Password'
												type='password'
												style={{
													marginBottom: '2rem',
												}}
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
												Register
											</Button>
										</DialogActions>{' '}
									</div>
								)}
							</Dialog>
						</div>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}
