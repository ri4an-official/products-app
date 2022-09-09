const BASE_URL =
	process.env.NODE_ENV !== 'production' ? 'http://localhost:8080/products' : ''

export const productConfig = {
	GET_ALL: BASE_URL,
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
