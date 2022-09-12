import { createTemplateProduct } from './config.js'

export const cities = [
	{
		id: 1,
		name: 'Алматы',
		products: [
			{ id: 1, price: 1999 },
			{ id: 2, price: 2999 },
			{ id: 3, price: 3999 },
		],
	},
	{
		id: 2,
		name: 'Актобе',
		products: [
			{ id: 1, price: 4999 },
			{ id: 2, price: 5999 },
			{ id: 3, price: 6999 },
		],
	},
	{
		id: 3,
		name: 'Павлодар',
		products: [
			{ id: 1, price: 7999 },
			{ id: 2, price: 8999 },
			{ id: 3, price: 9999 },
		],
	},
]

export const products = []
for (let i = 0; i < 18; i++) products.push(createTemplateProduct())
