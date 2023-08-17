import React from 'react'
import { PaginationPropsType } from '../../types/types'
import styles from './Pagination.module.scss'
import ReactPaginate from 'react-paginate'


const Pagination: React.FC<PaginationPropsType> = ({ currentPage, onChangePage }) => {
	return (
		<ReactPaginate
			className={styles.root}
			breakLabel="..."
			nextLabel=">"
			previousLabel="<"
			onPageChange={(event) => onChangePage(event.selected + 1)}
			pageRangeDisplayed={4}
			pageCount={3}
			forcePage={currentPage - 1}
			renderOnZeroPageCount={null}
		/>
	)
}

export default Pagination
