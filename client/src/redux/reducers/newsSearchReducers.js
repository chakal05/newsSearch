
const jobSearchReducerDefaultState = [];

export default (state = jobSearchReducerDefaultState, action) => {
	switch (action.type) {
		case 'RETRIEVE_RESULTS':
            return [...action.results];
       
		default:
			return state;
	}
};