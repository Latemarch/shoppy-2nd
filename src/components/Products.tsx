import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getProducts } from "../apis/firebase";
import useProduct from "../hooks/useProduct";
import { IProduct } from "../pages/NewProduct";
import ProductCard from "./ProductCard";

export default function Products() {
	const {
		productQuery: { data: items, isLoading },
	} = useProduct();
	return (
		<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
			{isLoading && <p>Loading...</p>}
			{items && items.map((item) => <ProductCard key={item.id} item={item} />)}
		</ul>
	);
}
