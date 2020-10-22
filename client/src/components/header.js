import React, { createContext } from 'react';
import axios from 'axios';
import { NavLink, Redirect } from 'react-router-dom';
import history from '../services/history';
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

const useStyles = makeStyles((theme) => ({
	root: {
		marginBottom: '-4rem',
	},
	appBar: {
		background: '#7277FE',
	},
	logo: {
		flexGrow: 1,
		color: '#fff',
	},
	addAnnons: {
		//
	},

	rightLinks: {
		marginRight: theme.spacing(1),
		color: '#fff',
	},
}));

let userInfo;
export const userContext = createContext(userInfo);

export default function Header() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [email, setEmail] = React.useState('');
	const [pass, setPass] = React.useState('');
	const [token, setToken] = React.useState(false);

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
		if (localStorage.getItem('userToken')) {
			axios.defaults.headers.common[
				'authorization'
			] = localStorage.getItem('userToken');
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
							Manedek
						</NavLink>
					</Typography>{' '}
					<Typography className={classes.addAnnons}>
						<NavLink
							className={classes.rightLinks}
							to='/annonser'>
							{' '}
							Lägg in annons 
						</NavLink>
						<NavLink
							className={classes.rightLinks}
							to='/dashboard'>
							{' '}
							Dashboard{' '}
						</NavLink>
						{
							//? Should disappear when user is logged in
						}

						<Button
							className={classes.rightLinks}
							onClick={() => {
								if (!token) {
									setOpen(true);
								} else {
									setToken(false);
									localStorage.removeItem('userToken');
									return history.push('/');
								}
							}}>
							{token ? 'logout' : 'login'}
						</Button>

						<Dialog
							open={open}
							onClose={() => {
								setOpen(false);
							}}
							aria-labelledby='form-dialog-title'>
							<DialogTitle id='form-dialog-title'>
								Login
							</DialogTitle>
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
									fullWidth
									//helperText='Incorrect entry.'
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
												.get('/users', {
													params: {
														email: email,
														password: pass,
													},
												})
												.then((response) => {
													if (response.status === 200) {
														// Get token
														const token =
															response.data
																.accessToken;

														// Decode token
														const decoded = parseJwt(
															token
														);

														setToken(true);

														//	Save token in an object

														const userToken = {
															accessToken: token,
															tokenUserName:
																decoded.username,
															tokenUserId: decoded._id,
															tokenUserProfil:
																decoded.profil,
															tokenUserEmail:
																decoded.email,
														};
														// Save object in localStorage
														localStorage.setItem(
															'userToken',
															JSON.stringify(userToken)
														);

														// Save to context

														userInfo = userToken;

														//	Set header for subsequent request
														setHeaders();

														// change window
														return history.push(
															'/dashboard'
														);
													}
												})
												.catch((err) => {
													if (err) {
														throw err;
													}
												});
											setOpen(false);
										}
									}}
									color='primary'>
									Login
								</Button>
							</DialogActions>
						</Dialog>
					</Typography>
				</Toolbar>
			</AppBar>
			<Toolbar />
		</div>
	);
}
