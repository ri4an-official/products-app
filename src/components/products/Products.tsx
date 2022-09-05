import { IProduct } from '../../models/product'
import Product from './Product'

const Products = ({ children }: { children: IProduct[] }) => {
	return (
		<div className='products'>
			{children.map((p) => (
				<Product>{p}</Product>
			))}
		</div>
	)
}
export default Products
