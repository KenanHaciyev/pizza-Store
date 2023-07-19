import React from 'react'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import { useEffect, useState } from 'react'
import { Skeleton } from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'
import { SearchContext } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setCategoryId } from '../redux/slices/filterSlice'

const Home = () => {
	const { categoryId, sort } = useSelector(state => state.filter)
	const dispatch = useDispatch()


	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id))
	}

	const { searchValue } = React.useContext(SearchContext)

	useEffect(() => {
		setIsLoading(true)
		fetch(
			`https://64a2962ab45881cc0ae56477.mockapi.io/items?page=${currentPage}&limit=4&${categoryId > 0 ? `category=${categoryId}` : ''
			}&sortBy=${sort.sortProperty}&order=desc${searchValue ? '&search=' + searchValue : ''}`
		)
			.then((res) => res.json())
			.then((response) => {
				setItems(response)
				setIsLoading(false)
				window.scrollTo(0, 0)
			})
	}, [categoryId, sort.sortProperty, searchValue, currentPage])

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories
					value={categoryId}
					onChangeCategory={(id) => onChangeCategory(id)}
				/>
				<Sort/>
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{isLoading
					? [...new Array(6)].map((item, i) => <Skeleton key={i} />)
					: items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
			</div>
			<Pagination onChangePage={(num) => setCurrentPage(num)} />
		</div>
	)
}

export default Home
