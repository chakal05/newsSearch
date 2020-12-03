import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function ProtectedRoute(props) {
	const Component = props.component;
	

	if (JSON.parse(localStorage.getItem('userToken'))) {
		return <Route exact path={props.path} component={Component} />;
	} else {
		alert('You need to login first');
		return <Redirect to='/' />;
	}
}
