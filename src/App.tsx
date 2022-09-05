import { useEffect, useState } from 'react'
import CreateProduct from './components/products/CreateProduct'
import Products from './components/products/Products'
import { IProduct } from './models/product'

function App() {
	const [products, setProducts] = useState<IProduct[]>([])

	useEffect(() => {
		const fetchProducts = async () => {
			const res = await fetch('http://localhost:8080/products')
			const prds: IProduct[] = await res.json()
			setProducts(prds)
		}
		fetchProducts()
	}, [products])

	return (
		<div id='app'>
			<CreateProduct />
			<Products>{products}</Products>
		</div>
	)
}

export default App
