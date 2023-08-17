import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import React from 'react'
import axios from 'axios'

export const FullPizza: React.FC = () => {
	const [pizza, setPizza] = React.useState<{
		title: string
		imageUrl: string
		price: number
	}>()
	const params = useParams()
	const navigate = useNavigate()

	React.useEffect(() => {
		const fetchPizza = async () => {
			try {
				const { data } = await axios.get(
					`https://64a2962ab45881cc0ae56477.mockapi.io/items/${params.id}`,
				)
				setPizza(data)
			} catch (e) {
				alert('Произошла ошибка')
				navigate('/')
			}
		}
		fetchPizza()
	}, [])

	if (!pizza) {
		return <h2>Loading...</h2>
	}

	return (
		<div className="container">
			<h2 className='pizza-block__header' >{pizza.title}</h2>
			<img className='pizza-block__item' src={pizza.imageUrl} alt="pizza" />
			<div className='pizza-block__price' >{pizza.price} ₽</div>
		</div>
	)
}

export default FullPizza
