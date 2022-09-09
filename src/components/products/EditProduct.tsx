import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../models/hooks/useReactRedux'
import { IProduct } from '../../models/product'
import { editProduct } from '../../store/products'
import FormProduct from './FormProduct'

const EditProduct = () => {
	const { error, items } = useAppSelector((s) => s.products)
	const dispatch = useAppDispatch()

	const id = +useParams<{ id: string }>().id!
	const findProduct = useMemo(() => items.find((p) => p.id === id)!, [items, id])

	const nav = useNavigate()
	const fetchProduct = async (product: IProduct) => {
		await dispatch(editProduct({ id, product }))
		if (!error) nav('/')
	}

	return (
		<div className='create-product'>
			<h3>Редактировать товар</h3>
			<FormProduct fetchProduct={fetchProduct} product={findProduct} />
		</div>
	)
}
export default EditProduct
