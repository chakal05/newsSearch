import React from 'react';
import Search from '../components/search';
import Grid from '@material-ui/core/Grid';
import '../styles/landing.scss';

function Landing(props) {
	return (
		<div >
			<section className='landing'>
				<Grid className='container' container align='center'>
					<Grid item xs={12} className='box'>
						<h1 className='topTxt'>
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
