import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzaStatus', async (params) => {
	const { currentPage, categoryId, sort, searchValue } = params

	const { data } = await axios.get(
		`https://64a2962ab45881cc0ae56477.mockapi.io/items?page=${currentPage}&limit=4&${
			categoryId > 0 ? `category=${categoryId}` : ''
		}&sortBy=${sort.sortProperty}&order=desc${searchValue ? '&search=' + searchValue : ''}`,
	)
	return data
})

const initialState = {
	items: [],
	status: 'loading',
}

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload
		},
	},
	extraReducers: {
		[fetchPizzas.pending]: (state) => {
			state.items = []
			state.status = 'loading'
		},
		[fetchPizzas.fulfilled]: (state, action) => {
			state.items = action.payload
			state.status = 'success'
		},
		[fetchPizzas.rejected]: (state, action) => {
			state.items = []
			state.status = 'error'
		},
	},
})

export const { setItems } = pizzaSlice.actions
export default pizzaSlice.reducer
