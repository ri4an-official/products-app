const PORT = 4000
const BASE_URL =
	process.env.NODE_ENV !== 'production'
		? `http://localhost:${PORT}/products`
		: `http://localhost:${PORT}/products`

export const productConfig = {
	GET_ALL: BASE_URL,
	GET_CITIES: `${BASE_URL}/cities/`,
	SET_CITIES: `${BASE_URL}/cities/edit`,
	CREATE: `${BASE_URL}/create`,
	EDIT: `${BASE_URL}/edit/`,
	DELETE: `${BASE_URL}/delete/`,
}

export enum Method {
	GET = 'GET',
	POST = 'POST',
}

export async function fetchExtended(url: string, method = 'GET', body: any = {}) {
	const options =
		method === Method.POST ? { body: JSON.stringify(body), method } : {}
	const headers = {
		'Content-Type': 'application/json',
	}

	const res = await fetch(url, { ...options, headers })

	const json = await res.json()
	return json
}

export const mapParams = (params?: any) =>
	'?' +
	Object.entries(params ?? {})
		.map(([key, value]) => `${key}=${value}`)
		.join('&')
