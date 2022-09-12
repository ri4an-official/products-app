import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import productService from '../../api/products'
import { ICity, IProduct, SetCity } from './../../models/product'
import { IOptions } from './../../models/product/index'

export const fetchProducts = createAsyncThunk(
	'products/get-all',
	async (params?: IOptions) => {
		return await productService.getAll(params)
	}
)
export const fetchCities = createAsyncThunk('cities/get', async (id?: number) => {
	return await productService.getCities(id)
})

export const setCityProducts = createAsyncThunk(
	'cities/set',
	async (props: SetCity) => {
		return await productService.setCityProducts(props)
	}
)

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
		total: 0,
		cities: [] as ICity[],
	},
	reducers: {},
	extraReducers(builder) {
		builder.addCase(fetchCities.fulfilled, (s, { payload }) => {
			s.cities = [...payload]
		})

		builder.addCase(fetchProducts.pending, (s) => {
			s.pending = true
		})

		builder.addCase(fetchProducts.fulfilled, (s, { payload }) => {
			s.items = [...payload.items]
			s.total = payload.total
			s.pending = false
		})

		builder.addCase(createProduct.fulfilled, (s, { payload }) => {
			s.error = payload.message ?? ''
			s.items.push(payload)
		})

		builder.addCase(editProduct.fulfilled, (s, { payload }) => {
			s.error = payload.message ?? ''
		})
		builder.addCase(deleteProduct.fulfilled, (s, { payload }) => {
			s.error = payload.message ?? ''
			if (!s.error) s.items = s.items.filter((p) => p.id !== payload.id)
		})
	},
})
export default products.reducer
