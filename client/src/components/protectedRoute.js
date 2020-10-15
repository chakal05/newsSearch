import React from 'react';
import {Redirect} from 'react-router-dom'
//import history from '../services/history';


export default function ProtectedRoute(props) {
	const Component = props.component;
	const isAuthenticated = localStorage.getItem('userToken');

    if(isAuthenticated){
        return <Component/>
    }else {
        return <Redirect to={'/'} />
    }
}

//history.push('/')