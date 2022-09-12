import { cities, products } from '../data/index.js'

// Simulate query to db
const promisify = (data) => new Promise((res) => res(data)).catch(console.log)

class ProductsService {
	constructor() {
		this.products = products
		this.cities = cities
	}
	async getCities(id) {
		const cities = [...(await promisify(this.cities))]
		const filteredCities = cities.map((c) => ({
			...c,
			products: c.products.filter((p) => p.id === id),
		}))
		return filteredCities
	}
	async setCity(cid, pid, price) {
		const cities = [...(await promisify(this.cities))]
		const city = cities.find((c) => c.id === cid)

		if (!pid) {
			city.products.push({ id: Date.now(), price })
			return city
		}

		city.products = city.products.map((p) =>
			p.id === pid ? { ...p, price } : p
		)

		this.cities = this.cities.map((c) => (c.id === cid ? { ...city, ...c } : c))

		return city
	}
	async getAll({ p, limit, title }) {
		const products = [...(await promisify(this.products))]

		const page = +p,
			pageSize = +limit,
			start = (page - 1) * pageSize,
			end = page * pageSize

		const onFilter = (p) => p.title.toLowerCase().includes(title.toLowerCase())
		const filtered = products.filter(onFilter)

		const paged = filtered.slice(start, end)

		const total = filtered.length
		const items = paged

		return {
			items,
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
