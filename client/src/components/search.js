import React, { useState } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import axios from 'axios';
import { searchResult } from '../redux/actions/globalActions';
import { connect } from 'react-redux';
import '../styles/search.scss';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Search(props) {
	//   axios.request(options).then(function (response) {
	//     console.log(response.data);
	// }).catch(function (error) {
	//     console.error(error);
	// });

	const key = process.env.REACT_APP_NEWS_KEY;
	const [query, setQuery] = useState('');
	const options = {
		method: 'GET',
		url:
			'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI',
		params: {
			pageSize: '10',
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
			.then((response) => {
				props.dispatch(searchResult(response.data.value));
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
				placeholder={`Search ...`}
				className='userInput'
				variant='outlined'
				onChange={(e) => {
					setQuery(e.target.value.trim());
                }}
                InputProps={{
                    endAdornment:(
                        <InputAdornment position='end'>
                        <FontAwesomeIcon icon={faSearch}/>
                        </InputAdornment>
                    )
                }}
                >
              
            </TextField>
           
		</form>
	);
}

export default connect()(Search);
