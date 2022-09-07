import { ICity } from '../../models/product'
import City from './City'

const CitiesTable = ({ children }: { children: ICity[] }) => {
	return (
		<table className='table'>
			<tr>
				<th>Город</th>
				<th>Цена</th>
			</tr>
			{children.map((c) => (
				<City>{c}</City>
			))}
		</table>
	)
}
export default CitiesTable
