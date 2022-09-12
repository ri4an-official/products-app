import productsService from './products.service.js'

class ProductsController {
	async getCities(req, res) {
		try {
			const id = +req.params.id
			const cities = await productsService.getCities(id)
			res.json(cities)
		} catch (e) {
			res.status(404).json({ message: e.message })
		}
	}

	async setCities(req, res) {
		const { cityId, productId, price } = req.body
		const city = await productsService.setCity(+cityId, +productId, +price)
		res.json(city)
	}

	async getAll(req, res) {
		try {
			const { p = 1, limit = 5, title = '' } = req.query
			const products = await productsService.getAll({ p, limit, title })
			res.json(products)
		} catch (e) {
			res.status(404).json({ message: e.message })
		}
	}
	async create(req, res) {
		try {
			const product = req.body
			const result = await productsService.create(product)
			res.json(result)
		} catch (e) {
			res.status(404).json({ message: e.message })
		}
	}
	async edit(req, res) {
		try {
			const id = +req.params.id
			const product = req.body
			const result = await productsService.edit(id, product)
			res.json(result)
		} catch (e) {
			res.status(404).json({ message: e.message })
		}
	}
	async delete(req, res) {
		try {
			const id = +req.params.id
			const result = await productsService.delete(id)
			res.json(result)
		} catch (e) {
			res.status(404).json({ message: e.message })
		}
	}
}

export default new ProductsController()
