import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../models/hooks/useStore'
import { fetchProducts } from '../store/products'
import Products from './products/Products'

function ProductPage() {
	const { items, pending } = useAppSelector((s) => s.products)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchProducts())
	}, [])

	return (
		<div className='p-5'>
			<div style={{ textAlign: 'right' }}>
				<Link to='/create' className='btn btn-success'>
					Add product
				</Link>
			</div>
			<h3 className='text-center'>Products</h3>
			{pending ? <h3>Loading...</h3> : <Products>{items}</Products>}
		</div>
	)
}

export default ProductPage
