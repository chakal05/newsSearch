import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import CssBaseline from '@material-ui/core/CssBaseline';
//import store from './redux/store/index';
import ProtectedRoute from './components/protectedRoute';
import Landing from './pages/landing';
import Annonser from './pages/annonser';
import Dashboard from './pages/dashboard';
import history from './services/history';
import MyHeader from './components/header';
import Container from '@material-ui/core/Container';
import './index.scss';
import { userContext } from './components/userContext';

// const storage = store();
function App() {
	const isAuthenticated =
		JSON.parse(localStorage.getItem('userToken')) || {};

	return (
		<>
			<CssBaseline />
			<Router history={history}>
				<MyHeader />
				<Switch>
					<Route path='/' exact component={Landing} />
					<userContext.Provider
						value={[
							`User username is ${isAuthenticated.tokenUserName}`,
							`User email is ${isAuthenticated.tokenUserEmail}`,
						]}>
						<ProtectedRoute
							exact
							path='/dashboard'
							component={Dashboard}
						/>
						<ProtectedRoute
							exact
							path='/annonser'
							component={Annonser}
						/>
					</userContext.Provider>
				</Switch>
			</Router>
		</>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));

// //{
// //	 <Provider   store={storage}  ></Provider>
// }
