import { products } from '../data/index.js'

// Simulate query to db
const promisify = (data) => new Promise((res) => res(data)).catch(console.log)

class ProductsService {
	constructor() {
		this.products = products
	}
	async getAll({ p, limit, title }) {
		const products = [...(await promisify(this.products))]

		const page = +p,
			pageSize = +limit,
			start = (page - 1) * pageSize,
			end = page * pageSize

		const onFilter = (p) => p.title.toLowerCase().includes(title.toLowerCase())
		const items = products.filter(onFilter)

		const pagedItems = [...items].slice(start, end)

		const total = items.length

		return {
			items: pagedItems,
			page,
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
