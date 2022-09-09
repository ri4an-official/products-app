const cities = [
	{ id: 1, name: 'Алматы', price: 5200 },
	{ id: 2, name: 'Актобе', price: 5200 },
]
function createProduct(id, title, images, description = title, basePrice = 1000) {
	return {
		id,
		title,
		description,
		images,
		basePrice,
		isSamePrice: true,
		cities,
	}
}

const shuffle = (arr = []) =>
	arr
		.map((value) => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value)

const urls = [
	'https://mir-s3-cdn-cf.behance.net/project_modules/fs/1dcbb847343851.560800656c6f6.jpg',
	'https://tehnoteca.ru/img/1261/1260580/artix_rs7_8.jpg',
	'https://cdn2.static1-sima-land.com/items/3296886/0/700-nw.jpg',
	'https://www.apple.com/newsroom/images/product/iphone/standard/product_red_back_full.jpg.og.jpg',
	'https://wholefoodsmagazine.com/wp-content/uploads/2016/10/GettyImages-476335046.jpg',
]

export const products = [
	createProduct(1, 'Product 1', shuffle(urls)),
	createProduct(2, 'Product 2', shuffle(urls)),
	createProduct(3, 'Product 3', shuffle(urls)),
	createProduct(4, 'Product 4', shuffle(urls)),
	createProduct(5, 'Product 5', shuffle(urls)),
	createProduct(6, 'Product 6', shuffle(urls)),
	createProduct(7, 'Product 7', shuffle(urls)),
	createProduct(8, 'Product 8', shuffle(urls)),
	createProduct(9, 'Product 9', shuffle(urls)),
	createProduct(10, 'Product 10', shuffle(urls)),
]
