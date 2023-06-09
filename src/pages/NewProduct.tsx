import React, { useState } from "react";
import uploadImage from "../apis/uploader";
import useProduct from "../hooks/useProduct";

export interface IProduct {
	id?: string;
	imgUrl?: string;
	image?: string;
	title?: string;
	price?: number;
	options?: string | string[];
	quantity?: number;
}

export default function NewProductShoppy() {
	const [product, setProduct] = useState<IProduct>({});
	const [file, setFile] = useState<File | null>();
	const [success, setSuccess] = useState<string | null>(null);
	const [isLoading, setLoading] = useState<boolean>(false);

	const { addProduct } = useProduct();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, files } = e.target;
		if (name === "file") {
			setFile(files && files[0]);
			return;
		}
		setProduct((product) => ({ ...product, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		uploadImage(file).then((url) => {
			addProduct.mutate(
				{ product, url },
				{
					onSuccess: () => {
						setSuccess("Uploading is completed.");
						setTimeout(() => setSuccess(null), 4000);
						setLoading(false);
					},
				}
			);
		});
	};

	return (
		<section className="w-full text-center">
			<h2 className="text-2xl font-bold my-4">새로운 상품 등록</h2>
			{success && <p className="my-2">{success}</p>}
			{file && (
				<img
					className="w-96 mx-auto mb-2"
					src={URL.createObjectURL(file)}
					alt="local file"
				/>
			)}
			<form
				className="flex flex-col items-center w-full"
				onSubmit={handleSubmit}
			>
				<input
					className="w-3/4 p-2 outline-none border border-gray-300 my-1"
					type="file"
					accept="image/*"
					name="file"
					required
					onChange={handleChange}
				/>
				<input
					className="w-3/4 p-2 outline-none border border-gray-300 my-1"
					type="text"
					name="title"
					value={product?.title ?? ""}
					placeholder="제품명"
					required
					onChange={handleChange}
				/>
				<input
					className="w-3/4 p-2 outline-none border border-gray-300 my-1"
					type="text"
					name="price"
					value={product?.price ?? ""}
					placeholder="가격"
					required
					onChange={handleChange}
				/>
				<input
					className="w-3/4 p-2 outline-none border border-gray-300 my-1"
					type="text"
					name="options"
					value={product?.options ?? ""}
					placeholder="사이즈 (,)로 구분"
					required
					onChange={handleChange}
				/>
				<button
					disabled={isLoading}
					className="bg-red-400 w-3/4 border hover:bg-blue font-bold py-2 px-4 rounded"
				>
					{isLoading ? "Uploading..." : "제품등록"}
				</button>
			</form>
		</section>
	);
}
