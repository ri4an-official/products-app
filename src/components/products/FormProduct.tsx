import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import useInput from '../../models/hooks/useInput'
import { useAppSelector } from '../../models/hooks/useReactRedux'
import { IProduct } from '../../models/product'
import { setCityProducts } from '../../store/products'
import CitiesTable from '../cities/CitiesTable'
import HtmlEditor from '../HtmlEditor'

interface Props {
	fetchProduct: (p: IProduct) => void
	product?: IProduct
}

const FormProduct = ({ fetchProduct, product }: Props) => {
	const nav = useNavigate()
	const { error } = useAppSelector((s) => s.products)

	const [images, setImages] = useState<string[]>(product?.images ?? [])
	const [isSamePrice, setIsSamePrice] = useState(product?.isSamePrice ?? true)

	const title = useInput(product?.title)
	// const desc = useInput(product?.description)
	const [desc, setDesc] = useState(product?.description ?? '')
	const price = useInput(product?.price! + '')

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
			id: 0,
			title: title.value,
			description: desc,
			price: +price.value,
			images,
			isSamePrice,
			isActive,
		}
		fetchProduct(result)
	}

	const [isActive, setIsActive] = useState(product?.isActive ?? true)
	const mapStatus = (status: boolean) => (status ? 'Активный' : 'В архиве')

	return (
		<section className='form-product'>
			<div className='block'>
				<label>Название</label>
				<input type='text' {...title} />
			</div>
			<div className='block'>
				<label>Описание</label>
				{/* <textarea {...desc} /> */}
				<HtmlEditor description={desc} setDescription={setDesc} />
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
				<label>Статус товара</label>
				<p className='form-check'>
					<input
						checked={isActive}
						onChange={(e) => setIsActive(e.target.checked)}
						className='form-check-input'
						type='checkbox'
					/>
					<span className='form-check-label'>{mapStatus(isActive)}</span>
				</p>
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
				{!isSamePrice && <CitiesTable product={product} />}
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
