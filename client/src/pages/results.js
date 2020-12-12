import React from 'react';
import { connect } from 'react-redux';
import NewsList from '../components/newsList';
import Search from '../components/search';
import { Grid, LinearProgress } from '@material-ui/core';
import '../styles/results.scss';
function Results(props) {
	return (
		<div className='root'>
			<Grid container justify='center'>
            <Grid item xs={12} className='searchBox'>
					<Search
						onSubmit={() => {
							//
						}}
                    />
                  {!props.results[0] && <LinearProgress className='progress'/>}  
                </Grid>
                <Grid item className='list'>
                
              
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
