import { IProduct } from '../../models/product'
import Product from './Product'

const Products = ({ children }: { children: IProduct[] }) => (
	<table className='table table-hover'>
		<thead>
			<tr className='text-center'>
				<th scope='col'></th>
				<th scope='col'>Title</th>
				<th scope='col'>Description</th>
				<th scope='col'>Price</th>
			</tr>
		</thead>
		<tbody>
			{children.map((p) => (
				<Product key={p.id}>{p}</Product>
			))}
		</tbody>
	</table>
)
export default Products
