import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	activeChapter: '',
	chapterList: [],
	chapterListStatus: 'loading',
	chapterFiltered: [],
};

const chapterSlice = createSlice({
	name: 'chapter',
	initialState,
	reducers: {
		setActiveChapter: (state, action) => {
			state.activeChapter = action.payload;
		},
		setChapterFilter: (state, action) => {
			state.chapterFiltered = action.payload;
		},
		chapterListLoading: (state) => {
			state.chapterListStatus = 'loading';
		},
		chapterListError: (state) => {
			state.chapterListStatus = 'error';
		},
		chapterListSuccess: (state, action) => {
			state.chapterListStatus = 'idle';
			state.chapterFiltered = action.payload;
			state.chapterList = action.payload;
		},
	},
});

const {actions, reducer} = chapterSlice;

export default reducer;
export const {
	setActiveChapter,
	setChapterFilter,
	chapterListLoading,
	chapterListError,
	chapterListSuccess,
} = actions;