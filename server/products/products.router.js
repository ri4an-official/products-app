import { Router } from 'express'
import productsController from './products.controller.js'

const router = new Router()

router.get('/', productsController.getAll)
router.get('/cities/:id', productsController.getCities)
router.post('/cities/edit', productsController.setCities)
router.post('/create', productsController.create)
router.post('/edit/:id', productsController.edit)
router.post('/delete/:id', productsController.delete)

export default router
