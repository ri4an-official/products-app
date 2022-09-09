import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../models/hooks/useReactRedux'
import { fetchProducts } from '../store/products'
import Products from './products/Products'
import SearchProduct from './products/SearchProduct'

function ProductPage() {
	const { items, pending } = useAppSelector((s) => s.products)
	const dispatch = useAppDispatch()

	const [params, setParams] = useSearchParams()

	useEffect(() => {
		const title: string = params.get('title') ?? ''
		dispatch(fetchProducts({ title }))
	}, [params])

	return (
		<div className='p-5'>
			<div style={{ textAlign: 'right' }}>
				<Link to='/create' className='btn btn-success'>
					Add product
				</Link>
			</div>
			<SearchProduct />
			<h3 className='text-center'>Products</h3>
			{pending ? <h3>Loading...</h3> : <Products>{items}</Products>}
		</div>
	)
}

export default ProductPage
