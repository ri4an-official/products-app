import { products } from '../data/index.js'

const promisify = (data) => new Promise((res) => res(data)).catch(console.log)

class ProductsService {
	constructor() {
		this.products = products
	}
	async getAll() {
		return promisify(this.products)
	}
	async create(product) {
		if (!product) throw new Error('Undefined')
		this.products.push(product)
		const result = await promisify(product)
		return result
	}
	async edit(id, product) {
		if (product.id) throw new Error('ID is not edited!')
		const i = this.products.findIndex((p) => p.id === id)
		this.products[i] = { ...this.products[i], ...product }
		const result = await promisify(this.products[i])
		return result
	}
}

export default new ProductsService()
