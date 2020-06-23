import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import CssBaseline from '@material-ui/core/CssBaseline';
//import store from './redux/store/index';
import Landing from './pages/landing';
import Annonser from './pages/annonser';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import history from './services/history';
import MyHeader from './components/header';
import Container from '@material-ui/core/Container';
import './index.scss';

// const storage = store();
function App() {
	return (
		<>
			<CssBaseline />
			<Container maxWidth='md'>
				<Router history={history}>
					<MyHeader />
					<Switch>
						<Route path='/' exact component={Landing} />
						<Route path='/login' exact component={Login} />
						<Route
							exact
							path='/annonser'
							component={Annonser}
						/>

						<Route path='/dashboard' component={Dashboard} />
					</Switch>
				</Router>
			</Container>
		</>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));

// //{
// //	 <Provider   store={storage}  ></Provider> 
// }
