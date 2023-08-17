import { MainLayout } from './layouts/MainLayout'
import { Route, Routes } from 'react-router-dom'
import FullPizza from './pages/FullPizza'
import React, { Suspense } from 'react'
import Home from './pages/Home'
import './scss/app.scss'

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'))
const NotFound = React.lazy(
	() => import(/* webpackChunkName: "NotFoundBlock" */ './components/NotFoundBlock'),
)

function App() {
	return (
		<Suspense fallback={<h2>Загрузка...</h2>} >
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route path="" element={<Home />} />
					<Route
						path="cart"
						element={<Cart />}
					/>
					<Route path="pizza/:id" element={<FullPizza />} />
					<Route
						path="*"
						element={<NotFound />}
					/>
				</Route>
			</Routes>
		</Suspense>
	)
}

export default App
