const urls = [
	'https://mir-s3-cdn-cf.behance.net/project_modules/fs/1dcbb847343851.560800656c6f6.jpg',
	'https://tehnoteca.ru/img/1261/1260580/artix_rs7_8.jpg',
	'https://cdn2.static1-sima-land.com/items/3296886/0/700-nw.jpg',
	'https://www.apple.com/newsroom/images/product/iphone/standard/product_red_back_full.jpg.og.jpg',
	'https://wholefoodsmagazine.com/wp-content/uploads/2016/10/GettyImages-476335046.jpg',
]
export const withIncrementId = () => {
	let id = 0
	return (title = 'Product', description = '', price = 1000) => {
		id++
		return {
			id,
			title: `${title} ${id}`,
			isSamePrice: true,
			isActive: true,
			images: shuffle(urls),
			description,
			price,
		}
	}
}

export const createTemplateProduct = withIncrementId()

export const shuffle = (arr = []) =>
	arr
		.map((value) => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value)
