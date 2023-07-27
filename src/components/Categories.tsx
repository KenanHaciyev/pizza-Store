import React from 'react'

type CategoriesPropsType = {
	value: number
	onChangeCategory: (i: number) => void
}

const Categories: React.FC<CategoriesPropsType> = ({ value, onChangeCategory }) => {
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
}

export default Categories
