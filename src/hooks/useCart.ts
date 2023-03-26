import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { addOrUpdateToCart, removeFromCart } from "../apis/firebase";
import { IValue, useAuthContext } from "../context/AuthContextProvider";
import { IProduct } from "../pages/NewProduct";

export default function useCart() {
	const { user } = useAuthContext() as IValue;
	const uid = user ? user.uid : "default";
	const queryClient = useQueryClient();

	const removeItem = useMutation((id: string) => removeFromCart(uid, id), {
		onSuccess: () => {
			queryClient.invalidateQueries(["carts", uid]);
		},
	});

	const addOrUpdateItem = useMutation(
		(product: IProduct) => addOrUpdateToCart(uid, product),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["carts", uid]);
			},
		}
	);

	return { removeItem, addOrUpdateItem };
}
