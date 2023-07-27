import React, { useRef } from 'react'
import Categories from '../components/Categories'
import Sort, { list } from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import { useEffect } from 'react'
import { Skeleton } from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'
import {  useSelector } from 'react-redux'
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice'
import { useNavigate } from 'react-router-dom'
import { initialState } from '../redux/slices/filterSlice'
import { fetchPizzas } from '../redux/slices/pizzaSlice'
import {useAppDispatch} from '../redux/store'
import qs from 'qs'

const Home: React.FC = () => {
	const { categoryId, sort, currentPage, searchValue } = useSelector((state: any) => state.filter)
	const { items, status } = useSelector((state: any) => state.pizza)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const isSearch = useRef(false)
	const isMounted = useRef(false)

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id))
	}

	const onChangePage = (number) => {
		dispatch(setCurrentPage(number))
	}

	const getPizzas = async () => {
		dispatch(
			fetchPizzas({
				currentPage,
				categoryId,
				sort,
				searchValue,
			}),
		)

		window.scrollTo(0, 0)
	}

	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			})

			navigate(`?${queryString}`)
		}
		isMounted.current = true
	}, [sort.sortProperty, currentPage, categoryId, navigate])

	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1))
			if (
				initialState.categoryId === Number(params.categoryId) &&
				initialState.sort.sortProperty === params.sortProperty &&
				initialState.currentPage === Number(params.currentPage)
			) {
				getPizzas()
			}

			const sort = list.find((object) => object.sortProperty === params.sortProperty)

			dispatch(
				setFilters({
					...params,
					sort,
				}),
			)
			isSearch.current = true
		}
	}, [])

	useEffect(() => {
		window.scrollTo(0, 0)

		if (!isSearch.current) {
			getPizzas()
		}
		isSearch.current = false
	}, [categoryId, sort.sortProperty, searchValue, currentPage])

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={(id) => onChangeCategory(id)} />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			{status === 'error' ? (
				<div className="content__error-info">
					<h2>Произошла ошибка</h2>
					<p>Попробуйте перезагрузить приложение</p>
				</div>
			) : (
				<div className="content__items">
					{status === 'loading'
						? [...new Array(6)].map((item, i) => <Skeleton key={i} />)
						: items.map((pizza) => {
								return <PizzaBlock key={pizza.id} {...pizza} />
						  })}
				</div>
			)}
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	)
}

export default Home
