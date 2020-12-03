import React from 'react';
import Search from '../components/search';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
	landing: {
		height: '93.3vh',
		padding: '70px 0',
	},
	topTxt: {
		marginTop: '9rem',
		fontSize: '4rem',
		marginBottom: '2rem',
	},

}));

function Landing(props) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<section className={classes.landing}>
				<Grid container align='center'>
					<Grid item xs={12}>
						<h1 className={classes.topTxt}>
							Search worldwide news
						</h1>
						<Search
							onSubmit={() => {
								props.history.push('/results');
							}}
						/>
					</Grid>
				</Grid>
			</section>
		</div>
	);
}

export default Landing;
