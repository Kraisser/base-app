import {configureStore} from '@reduxjs/toolkit';

import {default as chapList} from './chapSlice';
import {default as program} from './programSlice';
import {default as modal} from './modalSlice';
import {default as editSlice} from './editSlice';

const stringMiddleware = () => (dispatch) => (action) => {
	if (typeof action === 'string') {
		return dispatch({
			type: action,
		});
	}
	return dispatch(action);
};

const store = configureStore({
	reducer: {chapList, program, modal, editSlice},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stringMiddleware),
	devTools: process.env.NODE_ENV !== 'production',
});

export default store;
