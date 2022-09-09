import { ICity } from '../../models/product'
import City from './City'

interface Props {
	children: ICity[]
	setCities: (c: any) => any
}

const CitiesTable = ({ children, setCities }: Props) => {
	return (
		<table className='table'>
			<thead>
				<tr>
					<th>Город</th>
					<th>Цена</th>
				</tr>
			</thead>
			<tbody>
				{children.map((c) => (
					<City setCities={setCities} key={c.id}>
						{c}
					</City>
				))}
			</tbody>
		</table>
	)
}
export default CitiesTable
