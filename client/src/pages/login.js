import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		//	textAlign: 'center',
		color: theme.palette.text.secondary,
    },
    textField:{
        marginBottom: theme.spacing(2)
    }
}));

export default function Login() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<Grid container>
					<Grid item xs={8}>
						{' '}
						Left text with a picture{' '}
					</Grid>
					<Grid item xs={4}>
                    <TextField
                    label="E-postadress"
                    id="filled-size-small"
                    variant="outlined"
                    size="small"
                    className={classes.textField}
                  />
                  <TextField
                  label="Password"
                  id="filled-size-small"
                  type="password"
                  variant="outlined"
                  size="small"
                />
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
}
