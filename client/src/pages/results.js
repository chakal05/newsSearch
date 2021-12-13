import React from 'react';
import { connect } from 'react-redux';
import NewsList from '../components/newsList';
import { Grid, LinearProgress } from '@material-ui/core';
import '../styles/results.scss';
import MyHeader from '../components/header';
function Results(props) {
	return (
		<div className='root'>
			<div className='myHeader'>
				<MyHeader show={1} />
			</div>
			<Grid container>
				<Grid item xs={12} className='searchBox'>
					{!props.results[0] && (
						<LinearProgress className='progress'  />
					)}
				</Grid>
				<Grid item  className='list'>
					<NewsList data={props.results} action={1} />
				</Grid>
			</Grid>
		</div> 
	);
}

const propsToState = (state) => {
	return {
		results: state.results,
	};
};

export default connect(propsToState)(Results);
