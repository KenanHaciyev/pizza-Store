import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { FetchPizzasArgs, Pizza, PizzaSliceState, Status } from '../types'



const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING,
}

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
	'pizza/fetchPizzaStatus',
	async (params) => {
		const { currentPage, categoryId, sort, searchValue } = params

		const { data } = await axios.get(
			`https://64a2962ab45881cc0ae56477.mockapi.io/items?page=${currentPage}&limit=4&${
				categoryId > 0 ? `category=${categoryId}` : ''
			}&sortBy=${sort.sortProperty}&order=desc${searchValue ? '&search=' + searchValue : ''}`,
		)
		return data
	},
)

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<Pizza[]>) {
			state.items = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state) => {
			state.items = []
			state.status = Status.LOADING
		})
		builder.addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<Pizza[]>) => {
			state.items = action.payload
			state.status = Status.SUCCESS
		})
		builder.addCase(fetchPizzas.rejected, (state) => {
			state.items = []
			state.status = Status.ERROR
		})
	},
})

export const { setItems } = pizzaSlice.actions
export default pizzaSlice.reducer
