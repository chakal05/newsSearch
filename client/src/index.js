import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import store from './redux/store/index';
import Landing from './pages/landing';
import Results from './pages/results';
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
					
				</Switch>
			</Router>
		</Provider>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));
