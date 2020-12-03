import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import NewsList from '../components/newsList';
import '../styles/results.scss';

export default function Dashboard() {
	const [data, setData] = useState([]);
	const token = JSON.parse(localStorage.getItem('userToken'));
	const getNews = () => {
		axios
			.get('/articles', {
				params: {
					user: token.tokenUserId,
				},
			})
			.then((response) => {
				setData(response.data);
			});
	};

	useEffect(() => {
		getNews();
	}, []);
	return (
		<div className='root'>
			<div>
				<Grid container>
					<Grid item xs={12}>
						<h1 style={{ marginLeft: '1.5rem' }}>
							{' '}
							Saved articles{' '}
						</h1>
					</Grid>
					<Grid item className='list'>
						{!data[0] && (
							<h3 style={{ marginLeft: '2rem' }}>
								No item saved
							</h3>
						)}
						<NewsList
							data={data}
							refresh={() => {
								getNews();
							}}
							action={0}
						/>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}
