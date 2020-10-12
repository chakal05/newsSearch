import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root:{
        marginBottom: '-4rem'
    },
    appBar: {
    background:'#7277FE'
	},
	logo: {
        flexGrow: 1,
        color:'#fff',
	},
	addAnnons: {
		//
	},

	rightLinks: {
        marginRight: theme.spacing(1),
        color:'#fff',
	},
}));

export default function Header() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<AppBar className={classes.appBar} position='static' elevation={0}>
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
							Lägg in annons{' '}
						</NavLink>
						{
							//? Should disappear when user is logged in
						}
						<NavLink className={classes.rightLinks} to='/login'>
							Logga in
						</NavLink>
					</Typography>
				</Toolbar>
			</AppBar>
			<Toolbar />
		</div>
	);
}
