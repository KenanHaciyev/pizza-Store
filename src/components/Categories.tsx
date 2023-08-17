import React from 'react'
import { CategoriesPropsType } from '../types/types'

const Categories: React.FC<CategoriesPropsType> = React.memo(({ value, onChangeCategory }) => {
	const categories = ['Все', 'Мясные', 'Вегетерианская', 'Гриль', 'Острые', 'Закрытые']

	return (
		<div className="categories">
			<ul>
				{categories.map((item, i) => {
					return (
						<li
							key={i}
							onClick={() => onChangeCategory(i)}
							className={value === i ? 'active' : null}
						>
							{item}
						</li>
					)
				})}
			</ul>
		</div>
	)
})

export default Categories
