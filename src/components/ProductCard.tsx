import React from "react";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../pages/NewProduct";

export default function ProductCard({ item }: { item: IProduct }) {
	const navigate = useNavigate();
	return (
		<div
			className="flex flex-col grid m-2 shadow-md rounded"
			onClick={() => navigate(`products/detail/${item.id}`)}
		>
			<img
				className="p-1 rounded-xl w-full pb-1"
				src={item.image ? item.image : item.imgUrl}
				alt={item.title}
			/>
			<div className="flex justify-between pb-2">
				<p>{item.title}</p>
				<p>₩{item.price}</p>
			</div>
		</div>
	);
}
