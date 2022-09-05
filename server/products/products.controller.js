import productsService from './products.service.js'

class ProductsController {
	async getAll(req, res) {
		try {
			const products = await productsService.getAll()
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
}

export default new ProductsController()
