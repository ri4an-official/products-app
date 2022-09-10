export interface IProduct {
	id?: number
	title: string
	images: string[]
	description: string
	basePrice: number
	isSamePrice: boolean
	cities: ICity[]
	isActive: boolean 
	message?: string
}

export interface IResponse {
	page: number
	total: number
	items: IProduct[]
}

export interface IParams {
	title?: string
}
export interface IPagination {
	p?: number
	limit?: number
}

export type IOptions = IParams & IPagination

export interface ICity {
	id?: number
	name: string
	price: number
}
