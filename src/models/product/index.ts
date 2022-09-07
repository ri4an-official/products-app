export interface IProduct {
	id?: number
	title: string
	images: string[]
	description: string
	basePrice: number
	isSamePrice: boolean
	cities: ICity[]

	message?: string
}
export interface ICity {
	id?: number
	name: string
	price: number
}
