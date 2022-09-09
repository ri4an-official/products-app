import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import useInput from '../../models/hooks/useInput'
import { useAppSelector } from '../../models/hooks/useReactRedux'
import { ICity, IProduct } from '../../models/product'
import CitiesTable from '../cities/CitiesTable'

interface Props {
	fetchProduct: (p: IProduct) => void
	product?: IProduct
}

const FormProduct = ({ fetchProduct, product }: Props) => {
	const nav = useNavigate()
	const { error } = useAppSelector((s) => s.products)

	const [images, setImages] = useState<string[]>(product?.images ?? [])
	const [cities, setCities] = useState<ICity[]>(product?.cities ?? [])
	const [isSamePrice, setIsSamePrice] = useState(product?.isSamePrice ?? true)

	const title = useInput(product?.title)
	const desc = useInput(product?.description)
	const price = useInput(product?.basePrice! + '')

	const onImageChange = (e: any) => {
		const [file] = e.target.files
		setImages([...images, URL.createObjectURL(file)])
	}

	const isDisabled = useMemo(
		() => !title.value || !price.value || !images.length,
		[title, price, images]
	)

	const onFetch = async () => {
		const result: IProduct = {
			title: title.value,
			description: desc.value,
			basePrice: +price.value,
			images,
			isSamePrice,
			cities,
		}
		fetchProduct(result)
	}

	return (
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
						<p key={i}>
							<button
								className='btn btn-danger'
								onClick={() =>
									setImages((imgs) =>
										imgs.filter((im) => im !== i)
									)
								}
							>
								DELETE
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
						<span className='form-check-label'>Одна цена для всех</span>
					</p>
					<input disabled={!isSamePrice} type='number' {...price} />
				</div>
				{!isSamePrice && (
					<CitiesTable setCities={setCities}>{cities}</CitiesTable>
				)}
			</div>
			<p className='btn-block'>
				<button className='btn' onClick={() => nav('/')}>
					Cancel
				</button>
				<button
					disabled={isDisabled}
					className='btn btn-success'
					onClick={onFetch}
				>
					Save
				</button>
			</p>
			{error && (
				<div className='alert alert-danger' role='alert'>
					{error}
				</div>
			)}
		</section>
	)
}
export default FormProduct
