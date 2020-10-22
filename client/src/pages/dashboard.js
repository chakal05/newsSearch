import React, { useContext } from 'react';
import { userContext } from '../components/userContext';

export default function Dashboard() {
	const msg = useContext(userContext);
	return (
		<div>
            <div style={{margin:'1rem'}}>
            <h1 > Dashboard </h1>
            <h3>
            <p> User email: {msg.tokenUserEmail} </p>
            <p> User username: {msg.tokenUserName} </p>
            </h3>
            </div>
		</div>
	);
}
