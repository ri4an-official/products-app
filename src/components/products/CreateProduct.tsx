import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import useInput from '../../models/hooks/useInput'
import { useAppDispatch, useAppSelector } from '../../models/hooks/useStore'
import { IProduct } from '../../models/product'
import { createProduct } from '../../store/products'

const CreateProduct = () => {
	const error = useAppSelector((s) => s.products.error)
	const dispatch = useAppDispatch()

	const [images, setImages] = useState<string[]>([])
	const nav = useNavigate()
	const title = useInput()
	const desc = useInput()
	const price = useInput()
	const [isSamePrice, setIsSamePrice] = useState(true)

	const isDisabled = useMemo(
		() => !title.value || !price.value || !images.length,
		[title, price, images]
	)

	const onImageChange = (e: any) => {
		const [file] = e.target.files
		setImages([...images, URL.createObjectURL(file)])
	}

	const fetchProduct = async () => {
		const product: IProduct = {
			title: title.value,
			description: desc.value,
			basePrice: +price.value,
			images,
			isSamePrice,
			cities: [],
		}
		await dispatch(createProduct(product))
		if (!error) nav('/')
	}

	return (
		<div className='create-product'>
			<h3>Добавить товар</h3>
			<section>
				<div className='block'>
					<label>Название</label>
					<input type='text' {...title} />
				</div>
				<div className='block'>
					<label>Описание</label>
					<textarea {...desc} />
				</div>
				<div className='block'>
					<label>Фотографии</label>
					<section className='images'>
						{images.map((i) => (
							<p>
								<button
									className='btn btn-danger'
									onClick={() =>
										setImages((imgs) =>
											imgs.filter((im) => im !== i)
										)
									}
								>
									Delete
								</button>
								<img className='product-image' key={i} src={i} />
							</p>
						))}
					</section>
					<input type='file' onChange={onImageChange} />
				</div>
				<div className='block'>
					<label>Цена</label>
					<div className='price-block'>
						<p className='form-check'>
							<input
								checked={isSamePrice}
								onChange={(e) => setIsSamePrice(e.target.checked)}
								className='form-check-input'
								type='checkbox'
							/>
							<span className='form-check-label'>
								Одна цена для всех
							</span>
						</p>
						<input type='number' {...price} />
					</div>
					{/* {!isSamePrice && <CitiesTable>{prod</CitiesTable>} */}
				</div>
				<p className='btn-block'>
					<button className='btn' onClick={() => nav('/')}>
						Cancel
					</button>
					<button
						disabled={isDisabled}
						className='btn btn-success'
						onClick={fetchProduct}
					>
						Create product
					</button>
				</p>
				{error && (
					<div className='alert alert-danger' role='alert'>
						{error}
					</div>
				)}
			</section>
		</div>
	)
}
export default CreateProduct
