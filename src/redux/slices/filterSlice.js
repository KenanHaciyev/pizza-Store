import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: 'популярности',
		sortProperty: 'rating',
	},
}

const filterSlice = createSlice({
	name: 'sort',
	initialState,
	reducers: {
		setCategoryId(state, action) {
			state.categoryId = action.payload
		},
		setSort(state, action) {
			state.sort = action.payload
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload
		},
		setFilters(state, action) {
			state.categoryId = +action.payload.categoryId
			state.currentPage = +action.payload.currentPage
			state.sort = action.payload.sort
		},
	},
})

export const { setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions
export default filterSlice.reducer
