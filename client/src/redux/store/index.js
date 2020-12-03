import {
	createStore,
	combineReducers,
	applyMiddleware,
	compose,
} from 'redux';
import thunk from 'redux-thunk';
import newsSearchReducer from '../reducers/newsSearchReducers';
const composeEnhencers =
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
	const store = createStore(
		combineReducers({
			results: newsSearchReducer,
		}),
		composeEnhencers(applyMiddleware(thunk))
	);
	return store;
};
