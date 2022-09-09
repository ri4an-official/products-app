import { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../models/hooks/useReactRedux'
import { IProduct } from '../../models/product'
import { editProduct, fetchProducts } from '../../store/products'
import FormProduct from './FormProduct'

const EditProduct = () => {
	const items = useAppSelector((s) => s.products.items)
	const error = useAppSelector((s) => s.products.error)

	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchProducts())
	}, [])

	const id = +useParams().id!
	const findProduct = useMemo(() => items.find((p) => p.id === id)!, [items, id])

	const nav = useNavigate()
	const fetchProduct = async (product: IProduct) => {
		await dispatch(editProduct({ id, product }))
		if (!error) nav('/')
	}

	return (
		<div className='edit-product'>
			<h3>Редактировать товар</h3>
			<FormProduct fetchProduct={fetchProduct} product={findProduct} />
		</div>
	)
}

export default EditProduct
