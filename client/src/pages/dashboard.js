import React, { useContext } from 'react';
import { userContext } from '../components/userContext';

export default function Dashboard() {
	const msg = useContext(userContext);
	return (
		<div>
			<h1> Dashboard </h1>
            <h3>
            <ul style={{listStyle:'none'}}>
            {msg.map((item, index) => {
                return <li key={index}  > {item} </li>
            }
            )} 
            </ul>
            </h3>
		</div>
	);
}
