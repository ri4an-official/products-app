import { useEffect } from 'react'
import useInput from '../../models/hooks/useInput'
import { useAppDispatch } from '../../models/hooks/useReactRedux'
import { ICity } from '../../models/product'
import { setCityProducts } from '../../store/products'

interface Props {
	children: ICity
	productId?: number
}

const City = ({ children, productId }: Props) => {
	const product = children.products.find((p) => p.id === productId)
	const price = useInput((product?.price ?? '') + '')
	const dispatch = useAppDispatch()

	useEffect(() => {
		return () => {
			dispatch(
				setCityProducts({
					cityId: children.id ?? 1,
					price: +price.value,
					productId,
				})
			)
		}
	}, [])

	return (
		<tr>
			<td>{children.name}</td>
			<td>
				<input {...price} />
			</td>
		</tr>
	)
}
export default City
