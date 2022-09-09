import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../models/hooks/useReactRedux'
import { IProduct } from '../../models/product'
import { deleteProduct } from '../../store/products'
import './Product.css'

const Product = ({ children }: { children: IProduct }) => {
	const dispatch = useAppDispatch()
	const error = useAppSelector((s) => s.products.error)

	const onDelete = async () => {
		const isDelete = confirm(`Delete "${children.title}" ?`)
		if (!isDelete) return

		await dispatch(deleteProduct(children.id ?? 1))
		if (error) alert(error)
	}
	return (
		<tr className='text-center'>
			<td>
				<img
					className='ava'
					src={children.images[0] ?? ''}
					alt='product avatar'
				/>
			</td>
			<th>
				<div className='title'>{children.title}</div>
			</th>
			<td>
				<div className='description'>{children.description}</div>
			</td>
			<td>
				<div className='price'>{children.basePrice}</div>
			</td>
			<td>
				<Link to={`/edit/${children.id}`} className='btn btn-warning m-2'>
					Edit
				</Link>
				<button onClick={onDelete} className='btn btn-danger'>
					Delete
				</button>
			</td>
		</tr>
	)
}
export default Product
