export type CartItem = {
	id: string
	title: string
	price: number
	imageUrl: string
	type: string
	size: number
	count: number
}

export interface CartSliceState {
	totalPrice: number
	items: CartItem[]
}

export type Sort = {
	name: string
	sortProperty: string
}

export interface FilterSliceState {
	searchValue?: string
	categoryId?: number
	currentPage?: number
	sort: Sort
}

export type FetchPizzasArgs = {
	currentPage: number
	categoryId: number
	sort: Sort
	searchValue: string
}

export type Pizza = {
	id: string
	title: string
	price: number
	imageUrl: string
	types: number[]
	sizes: number[]
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export interface PizzaSliceState {
	items: Pizza[]
	status: Status
}