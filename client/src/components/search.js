import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import { searchResult } from '../redux/actions/globalActions';
import { connect } from 'react-redux';
import '../styles/search.scss';

function Search(props) {
	const [query, setQuery] = useState('');
	const getData = async () => {
		await axios
			.get(
				`https://newsapi.org/v2/everything?q=${query}&apiKey=475f0cef461f4621bb12a738b586e83d`
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
