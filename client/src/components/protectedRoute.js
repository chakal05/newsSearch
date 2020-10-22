import React from 'react';
import { Redirect, Route } from 'react-router-dom';

//import history from '../services/history';

export default function ProtectedRoute(props) {
	const Component = props.component;
	const isAuthenticated = localStorage.getItem('userToken');

	if (isAuthenticated) {
		return <Route exact path={props.path} component={Component} />;
	} else {
		
		return <Redirect to='/' />;
	}
}
