import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import productService from '../../api/products'
import { IProduct } from './../../models/product'

export const fetchProducts = createAsyncThunk('products/get-all', async () => {
	return await productService.getAll()
})

export const createProduct = createAsyncThunk(
	'products/create',
	async (product: IProduct) => {
		const res: IProduct = await productService.create(product)
		return res
	}
)

export const editProduct = createAsyncThunk(
	'products/edit',
	async (payload: { id: number; product: IProduct }) => {
		const res: IProduct = await productService.edit(payload.id, payload.product)
		return res
	}
)

export const deleteProduct = createAsyncThunk(
	'products/delete',
	async (id: number) => {
		const res: IProduct = await productService.delete(id)
		return res
	}
)

const products = createSlice({
	name: 'products',
	initialState: {
		items: [] as IProduct[],
		pending: false,
		error: '',
	},
	reducers: {},
	extraReducers(builder) {
		builder.addCase(fetchProducts.pending, (s) => {
			s.pending = true
		})

		builder.addCase(fetchProducts.fulfilled, (s, { payload }) => {
			s.items = [...payload]
			s.pending = false
		})

		builder.addCase(createProduct.fulfilled, (s, { payload }) => {
			s.error = payload.message ?? ''
			s.items.push(payload)
		})

		builder.addCase(editProduct.fulfilled, (s, { payload }) => {
			s.error = payload.message ?? ''
			// s.items.push(payload)
		})
	},
})
export default products.reducer
