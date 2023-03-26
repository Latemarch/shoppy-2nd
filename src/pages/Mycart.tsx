import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getCart } from "../apis/firebase";
import CartItem from "../components/CartItem";
import { IValue, useAuthContext } from "../context/AuthContextProvider";

export default function Mycart() {
	const { user } = useAuthContext() as IValue;
	const { data: products, isLoading } = useQuery(["carts", user?.uid], () =>
		getCart(user ? user.uid : "")
	);
	isLoading && <p>Loading...</p>;
	return (
		<ul className="flex my-10 flex-col items-center">
			{products?.map((p) => (
				<CartItem key={user?.uid} product={p} user={user} />
			))}
		</ul>
	);
}
