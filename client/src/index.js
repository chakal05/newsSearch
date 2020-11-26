import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import ProtectedRoute from './components/protectedRoute';
import Landing from './pages/landing';
import Annonser from './pages/annonser';
import Dashboard from './pages/dashboard';
import history from './services/history';
import MyHeader from './components/header';
import axios from 'axios';
// import './index.scss';
import { userContext } from './components/userContext';

function App() {
	const [data, setData] = useState([]);
	const getData = async () => {
		await axios
			.get('http://localhost:4000/articles')
			.then((response) => {
				setData(response.data);
			});
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			<CssBaseline />
			<Router history={history}>
				<MyHeader />
				<Switch>
					<userContext.Provider value={data}>
						<Route path='/' exact component={Landing} />
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
