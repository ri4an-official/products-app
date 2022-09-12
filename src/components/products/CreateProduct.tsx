import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../models/hooks/useReactRedux'
import { IProduct } from '../../models/product'
import { createProduct } from '../../store/products'
import FormProduct from './FormProduct'

const CreateProduct = () => {
	const error = useAppSelector((s) => s.products.error)
	const dispatch = useAppDispatch()

	const nav = useNavigate()
	const fetchProduct = async (product: IProduct) => {
		await dispatch(createProduct(product))
		if (!error) nav('/')
	}

	return (
		<div className='create-product'>
			<h3>Добавить товар</h3>
			<FormProduct fetchProduct={fetchProduct} />
		</div>
	)
}
export default CreateProduct
