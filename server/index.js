import cors from 'cors'
import express from 'express'
import router from './products/products.router.js'

const PORT = process.env.PORT ?? 4000

const app = express()

app.use(express.json()).use(cors()).use('/products', router)

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`))
