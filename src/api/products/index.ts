import { ICity, IOptions, IProduct, SetCity } from '../../models/product'
import { fetchExtended, mapParams, Method, productConfig } from '../config'
import { IResponse } from './../../models/product/index'

class ProductService {
	async getCities(productId?: number) {
		const res: ICity[] = await fetchExtended(
			productConfig.GET_CITIES + productId
		)
		return res
	}
	async setCityProducts(options: SetCity) {
		const res: ICity[] = await fetchExtended(
			productConfig.SET_CITIES,
			Method.POST,
			options
		)
		return res
	}
	async getAll(params?: IOptions) {
		const res: IResponse = await fetchExtended(
			productConfig.GET_ALL + mapParams(params)
		)
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
