import React from 'react';
import axios from 'axios';
import { NavLink, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//import '../styles/header.scss';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	appBar: {
		background: 'none',
	},
	logo: {
		flexGrow: 1,
	},
	addAnnons: {
		//
	},

	rightLinks: {
		marginRight: theme.spacing(1),
	},
}));

export default function Header() {
	const [open, setOpen] = React.useState(false);

	const classes = useStyles();
	return (
		<AppBar
			className={classes.appBar}
			position='static'
			elevation={0}>
			<Toolbar>
				<Typography className={classes.logo}>
					<NavLink to='/'>Manedek</NavLink>
				</Typography>{' '}
				<Typography className={classes.addAnnons}>
					<NavLink className={classes.rightLinks} to=''>
						{' '}
						Lägg in annons{' '}
					</NavLink>
					<NavLink className={classes.rightLinks} to='/annonser'>
						{' '}
						Annonser{' '}
					</NavLink>
					<Button color='primary' onClick={() => setOpen(true)}>
						Logga in
					</Button>
					<Dialog
						open={open}
						onClose={() => setOpen(false)}
						aria-labelledby='form-dialog-title'>
						<DialogTitle id='form-dialog-title'>
							Logga in
						</DialogTitle>
						<DialogContent>
							<DialogContentText>
								To subscribe to this website, please enter
								your email address here. We will send updates
								occasionally.
							</DialogContentText>
							<TextField
								autoFocus
								margin='dense'
								id='email'
								label='Email Address'
								type='email'
								fullWidth
							/>
							<TextField
								margin='dense'
								id='password'
								label='Password'
								type='password'
								fullWidth
							/>
						</DialogContent>
						<DialogActions>
							<Button
								onClick={() => setOpen(false)}
								color='primary'>
								Cancel
							</Button>
							<Button
								onClick={async () => {
									await axios
										.get('/users', {
											params: {
												email: document.getElementById(
													'email'
												).value,
												password: document.getElementById(
													'password'
												).value,
											},
										})
										.then((response) => {
											if (response.status === 200) {
												return (window.location.href =
													'/dashboard');
											} else {
												setOpen(false);
											}
										});
								}}
								color='primary'>
								Subscribe
							</Button>
						</DialogActions>
					</Dialog>
				</Typography>
			</Toolbar>
		</AppBar>
	);
}
