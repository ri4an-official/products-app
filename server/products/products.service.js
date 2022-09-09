import { products } from '../data/index.js'

// Simulate query to db
const promisify = (data) => new Promise((res) => res(data)).catch(console.log)

class ProductsService {
	constructor() {
		this.products = products
	}
	async getAll({ p, limit, title }) {
		const products = await promisify(this.products)

		const total = products.length,
			skip = p * limit

		const paged = [...products].filter((_, i) => i + 1 >= skip)

		if (!title) return

		const onFilter = (p) => p.title.toLowerCase().includes(title.toLowerCase())

		const res = paged.filter(onFilter)
		return {
			items: res,
			page: p,
			total,
		}
	}
	async create(product) {
		if (!product || !product.title || product.id)
			throw new Error('Fill required fields!')
		this.products.push({ ...product, id: products.length + 1 })
		const result = await promisify(this.products[this.products.length - 1])
		return result
	}
	async edit(id, product) {
		const i = this.products.findIndex((p) => p.id === id)
		if (i === -1) throw new Error(`Product with id "${id}" is not exist!`)

		this.products[i] = { ...this.products[i], ...product }
		const result = await promisify(this.products[i])
		return result
	}
	async delete(id) {
		const product = this.products.find((p) => p.id === id)
		if (!product) throw new Error(`Product with id "${id}" is not exist!`)

		this.products = this.products.filter((p) => p.id !== id)
		const result = await promisify(product)
		return result
	}
}

export default new ProductsService()
