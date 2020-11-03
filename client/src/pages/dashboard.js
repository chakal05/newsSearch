import React, { useContext } from 'react';
import { userContext } from '../components/userContext';

export default function Dashboard() {
	const data = useContext(userContext);
	return (
		<div>
            <div style={{margin:'1rem'}}>
            <h1 > Dashboard </h1>
            <h3>
            <p> Name: {data.name } </p>
            <p> Birth year: {data.birth_year} </p>
            </h3>
            </div>
		</div>
	);
}


