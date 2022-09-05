import { IProduct } from '../../models/product'

const Product = ({ children }: { children: IProduct }) => {
	return (
		<div className='product' key={children.id}>
			<img className='ava' src={children.images[0]} alt='product avatar' />
			<h3 className='title'>{children.title}</h3>
			<p className='description'>{children.description}</p>
			<span className='price'>{children.price}</span>
		</div>
	)
}
export default Product
