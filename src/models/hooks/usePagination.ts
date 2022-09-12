import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function usePagination() {
	const [params] = useSearchParams()
	const [current, setCurrent] = useState(+(params.get('p') ?? 1))

	const onChange = (p: number) => {
		setCurrent(p)
	}

	return { current, onChange }
}
