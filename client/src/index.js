import React from 'react';
import ReactDOM from 'react-dom';
import { Router,Switch, Route} from 'react-router-dom';  
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import CssBaseline from '@material-ui/core/CssBaseline';
//import store from './redux/store/index';
import Landing from './pages/landing';
import history from './services/history';
import MyHeader from './components/header';
import Container from '@material-ui/core/Container';
import './index.scss';

// const storage = store();
function App() {
	return (
		<>
			<CssBaseline />
			<Container maxWidth='xl'>
				<Router history={history}>
					<MyHeader />
					 <Switch> 
						 <Route path='/' exact component={Landing} /> 

						{/*
							<Route
								exact
								path='/annonser'
								component={Annonser}
							/>
                        */}
						{/*<Route path='/annonser/:id' component={JobPost} /> */}
					</Switch> 
				</Router>
			</Container>
	</>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));

{ /* <Provider   store={storage}  ></Provider> */}