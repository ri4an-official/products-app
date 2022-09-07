import { IProduct } from '../../models/product'
import './Product.css'

const Product = ({ children }: { children: IProduct }) => (
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
	</tr>
)
export default Product
