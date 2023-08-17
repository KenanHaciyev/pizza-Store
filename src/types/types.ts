export type PaginationPropsType = {
	currentPage: number
	onChangePage: (page: number) => void
}

export type PizzaBlockPropsType = {
	id: string
	title: string
	price: number
	imageUrl: string
	types: number[]
	sizes: number[]
	count: number
}

export type CartItemType = {
	title: string
	price: number
	type: string
	size: number
	count: number
	imageUrl: string
	id: string
}

export type CategoriesPropsType = {
	value: number
	onChangeCategory: (i: number) => void
}

export type ListType = {
	name: string
	sortProperty: string
}
