import { Route, Routes } from 'react-router'
import ProductPage from './components/ProductPage'
import CreateProduct from './components/products/CreateProduct'
import EditProduct from './components/products/EditProduct'

function App() {
	return (
		<div id='app'>
			<Routes>
				<Route path='/edit/:id' element={<EditProduct />} />
				<Route path='/create' element={<CreateProduct />} />
				<Route caseSensitive path='/' element={<ProductPage />} />
			</Routes>
		</div>
	)
}

export default App
