import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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
					<NavLink className={classes.rightLinks} to='/login'>
						Logga in
					</NavLink>
				</Typography>
			</Toolbar>
		</AppBar>
	);
}
