import { useState } from 'react'

export default function usePagination<T>(items: T[], limit = 5) {
	const [page, setPage] = useState(1)

	const maxPage = Math.ceil(items.length / limit)

	const next = () => setPage((cp) => Math.min(cp + 1, maxPage))
	const prev = () => setPage((cp) => Math.max(cp - 1, 1))
	const jump = (page: number) => {
		const pageNumber = Math.max(1, page)
		setPage(Math.min(pageNumber, maxPage))
	}
	const pagedItems = () => {
		const begin = (page - 1) * limit
		const end = begin + limit
		return items.slice(begin, end)
	}
	return { next, prev, jump, pagedItems, currentPage: page, maxPage }
}
