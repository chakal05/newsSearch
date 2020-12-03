import React from 'react';
import ReactDOM from 'react-dom';
//import { userContext } from './components/userContext';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import ProtectedRoute from './components/protectedRoute';
import store from './redux/store/index';
import Landing from './pages/landing';
import Results from './pages/results';
import Dashboard from './pages/dashboard';
import history from './services/history';
import MyHeader from './components/header';
import './index.scss';

const storage = store();

function App() {
	return (
		<Provider store={storage}>
			<CssBaseline />
			<Router history={history}>
				<MyHeader />
				<Switch>
						<Route path='/' exact component={Landing} />
						<Route path='/results' exact component={Results} />
						<ProtectedRoute
							exact
							path='/dashboard'
							component={Dashboard}
						/>
				</Switch>
			</Router>
		</Provider>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));
