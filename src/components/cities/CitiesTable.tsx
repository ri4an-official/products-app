import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../models/hooks/useReactRedux'
import { IProduct } from '../../models/product'
import { fetchCities } from '../../store/products'
import City from './City'

type Props = {
	product?: IProduct
}

const CitiesTable = ({ product }: Props) => {
	const cities = useAppSelector((s) => s.products.cities)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchCities(product?.id))
	}, [])

	return (
		<table className='table'>
			<thead>
				<tr>
					<th>Город</th>
					<th>Цена</th>
				</tr>
			</thead>
			<tbody>
				{cities.map((c) => (
					<City productId={product?.id} key={c.id}>
						{c}
					</City>
				))}
			</tbody>
		</table>
	)
}
export default CitiesTable
