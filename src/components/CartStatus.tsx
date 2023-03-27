import { useQuery } from "@tanstack/react-query";
import { BsCart } from "react-icons/bs";
import { getCart } from "../apis/firebase";
import { IValue, useAuthContext } from "../context/AuthContextProvider";

export default function CartStatus() {
	const { user } = useAuthContext() as IValue;
	const { data: products } = useQuery(["carts", user?.uid], () =>
		getCart(user ? user.uid : "")
	);

	console.log(products);
	return (
		<div className="relative">
			<BsCart />
			{products && (
				<p className="flex items-center justify-center text-center w-5 h-5 text-white p-1 text-sm rounded-full absolute -top-2 left-3 bg-brand ">
					{products.length}
				</p>
			)}
		</div>
	);
}
