import { useSearchParams } from 'react-router-dom'
import useInput from '../../models/hooks/useInput'

const SearchProduct = () => {
	const [params, setParams] = useSearchParams()
	const search = useInput(params.get('title') ?? '')

	const onSearch = () => setParams({ title: search.value })

	return (
		<div className='search'>
			<input placeholder='Поиск...' {...search} />
			<button onClick={onSearch} className='btn btn-secondary'>
				Найти
			</button>
		</div>
	)
}
export default SearchProduct
