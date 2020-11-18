import React, { useContext } from 'react';
import { userContext } from '../components/userContext';
import { makeStyles } from '@material-ui/core/styles';
import pic from '../assets/undraw_pizza_sharing_wxop.svg';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
						<h1> Our first subscribers </h1>
					</Grid>
					<Grid container justify='center'>
						{data.map((item) => (
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
											Id number: {item.id}
										</Typography>
										<Typography variant='h5' component='h2'>
											Firstname: {item.first_name}
										</Typography>
										<Typography
											className={classes.pos}
											color='textSecondary'>
											Lastname: {item.last_name}
										</Typography>
										<Typography
											variant='body2'
											component='p'>
											Gender: {item.gender}
										</Typography>
										<Typography
											variant='body2'
											component='p'>
											Email : {item.email}
										</Typography>
										<Typography
											variant='body2'
											component='p'>
											Ip address: {item.ip_address}
										</Typography>
									</CardContent>
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
