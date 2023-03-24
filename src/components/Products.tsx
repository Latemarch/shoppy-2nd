import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getProducts } from "../apis/firebase";
import { IProduct } from "../pages/NewProduct";
import ProductCard from "./ProductCard";

export default function Products() {
	const {
		isLoading,
		error,
		data: items,
	} = useQuery<IProduct[]>(["products"], getProducts);
	items && console.log(items);
	return (
		<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
			{isLoading && <p>Loading...</p>}
			{items && items.map((item) => <ProductCard key={item.id} item={item} />)}
		</ul>
	);
}
