import { ICity } from '../../models/product'

const City = ({ children }: { children: ICity }) => {
	return (
		<tr>
			<th>{children.name}</th>
			<th>
				<input type='text' value={children.price} />
			</th>
		</tr>
	)
}
export default City
