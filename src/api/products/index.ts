import { IProduct } from '../../models/product'
import { fetchExtended, Method, productConfig } from './config'

class ProductService {
	async getAll() {
		const res: IProduct[] = await fetchExtended(productConfig.GET_ALL)
		return res
	}
	async create(product: IProduct) {
		const res: IProduct = await fetchExtended(
			productConfig.CREATE,
			Method.POST,
			product
		)
		return res
	}
	async edit(id: number, product: IProduct) {
		const res: IProduct = await fetchExtended(
			productConfig.EDIT + id,
			Method.POST,
			product
		)
		return res
	}
	async delete(id: number) {
		const res: IProduct = await fetchExtended(
			productConfig.DELETE + id,
			Method.POST
		)
		return res
	}
}
const productService = new ProductService()
export default productService
