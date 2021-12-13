import React, { useState } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import axios from 'axios';
import { searchResult } from '../redux/actions/globalActions';
import { connect } from 'react-redux';
import '../styles/search.scss';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Search(props) {
	const key = process.env.REACT_APP_NEWS_KEY;
	const [query, setQuery] = useState('');
	const options = {
		method: 'GET',
		url:
			'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI',
		params: {
			pageSize: '17',
			q: query,
			autoCorrect: 'true',
			pageNumber: '1',
			toPublishedDate: 'null',
			fromPublishedDate: 'null',
		},
		headers: {
			'x-rapidapi-key': key,
			'x-rapidapi-host':
				'contextualwebsearch-websearch-v1.p.rapidapi.com',
		},
	};

	const getData = async () => {
		await axios
			.request(options)
			.then((response, next) => {
				if (response.status === 200) {
					props.dispatch(searchResult(response.data.value));
				}
			})
			.catch((err) => {
				throw err;
			});
	};

	return (
		<div className='search'>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					getData();
					props.onSubmit();
				}}>
				<TextField
					placeholder={`Search news keyword e.g Bitcoin`}
					className='userInput'
					variant='outlined'
                    focus=''
					onChange={(e) => {
						setQuery(e.target.value.trim());
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<FontAwesomeIcon icon={faSearch} />
							</InputAdornment>
						),
					}}></TextField>
			</form>
		</div>
	);
}

export default connect()(Search);
