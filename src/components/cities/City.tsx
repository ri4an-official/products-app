import { ICity } from '../../models/product'

interface Props {
	children: ICity
	setCities: (c: ICity) => any
}

const City = ({ children, setCities }: Props) => {
	const onChange = (e: any) => setCities(e.target.value)

	return (
		<tr>
			<td>{children.name}</td>
			<td>
				<input value={children.price} onChange={onChange} />
			</td>
		</tr>
	)
}
export default City
