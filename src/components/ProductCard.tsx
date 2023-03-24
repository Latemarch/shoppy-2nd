import React from "react";
import { IProduct } from "../pages/NewProduct";

export default function ProductCard({ item }: { item: IProduct }) {
	return (
		<div className="flex flex-col grid m-2 shadow-md rounded">
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
