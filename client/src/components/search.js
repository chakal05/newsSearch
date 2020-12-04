import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import { searchResult } from '../redux/actions/globalActions';
import { connect } from 'react-redux';
import '../styles/search.scss';

function Search(props) {
	const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';

	const key = process.env.REACT_APP_NEWS_KEY;
	const [query, setQuery] = useState('');
	const getData = async () => {
		await axios
			.get(
				`${corsProxyUrl}https://newsapi.org/v2/everything?q=${query}&apiKey=${key}`
			)
			.then((response) => {
				props.dispatch(searchResult(response.data.articles));
			})
			.catch((err) => {
				throw err;
			});
	};

	return (
		<form
			className='root'
			onSubmit={(e) => {
				e.preventDefault();
				getData();
				props.onSubmit();
			}}>
			<TextField
				placeholder={`Search with key words, like 'Bitcoin'`}
				className='userInput'
				variant='outlined'
				onChange={(e) => {
					setQuery(e.target.value.trim());
				}}
			/>
		</form>
	);
}

export default connect()(Search);
