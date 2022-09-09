import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'
import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import usePagination from '../models/hooks/usePagination'
import { useAppDispatch, useAppSelector } from '../models/hooks/useReactRedux'
import { fetchProducts } from '../store/products'
import Products from './products/Products'
import SearchProduct from './products/SearchProduct'

function ProductPage() {
	const { items, pending, total } = useAppSelector((s) => s.products)
	const dispatch = useAppDispatch()

	const pag = usePagination()
	const [params, setParams] = useSearchParams()

	useEffect(() => {
		const title: string = params.get('title') ?? ''
		const p: number = +(params.get('p') ?? 1)
		dispatch(fetchProducts({ title, p }))
	}, [params])

	useEffect(() => {
		const title: string = params.get('title') ?? ''
		const p = pag.current.toString()
		setParams({ p, title })
	}, [pag.current])

	return (
		<div className='p-5'>
			<div style={{ textAlign: 'right' }}>
				<Link to='/create' className='btn btn-success'>
					Add product
				</Link>
			</div>
			<SearchProduct />
			<h3 className='text-center'>Products</h3>
			{pending ? (
				<h3>Loading...</h3>
			) : (
				<>
					<Products>{items}</Products>
					<Pagination
						{...pag}
						defaultCurrent={1}
						total={total}
						prevIcon={'<'}
						nextIcon={'>'}
						pageSize={5}
					/>
				</>
			)}
		</div>
	)
}

export default ProductPage
