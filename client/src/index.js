import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import ProtectedRoute from './components/protectedRoute';
import store from './redux/store/index';
import Landing from './pages/landing';
import Results from './pages/results';
import Dashboard from './pages/dashboard';
import history from './services/history';
import './index.scss';

const storage = store();

function App() {
	return (
		<Provider store={storage}>
			<CssBaseline />
			<Router history={history}>
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
