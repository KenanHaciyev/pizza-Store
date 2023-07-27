import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Sort = {
	name: string
	sortProperty: string
}

interface FilterSliceState {
	searchValue?: string
	categoryId?: number
	currentPage?: number
	sort: Sort
}

export const initialState: FilterSliceState = {
	categoryId: 0,
	searchValue: '',
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
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload
		},
		setSort(state, action: PayloadAction<Sort>) {
			state.sort = action.payload
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
		setFilters(state, action: PayloadAction<FilterSliceState>) {
			state.categoryId = +action.payload.categoryId
			state.currentPage = +action.payload.currentPage
			state.sort = action.payload.sort
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload
		},
	},
})

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } =
	filterSlice.actions
export default filterSlice.reducer
