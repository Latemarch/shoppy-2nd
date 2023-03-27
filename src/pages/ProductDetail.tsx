import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProduct } from "../apis/firebase";
import Button from "../components/Button";
import useCart from "../hooks/useCart";
import { IProduct } from "./NewProduct";

export default function ProductDetail() {
	const { addOrUpdateItem } = useCart();
	const { id } = useParams<{ id: string }>();
	const { isLoading, data: item } = useQuery<IProduct>(
		["product", id],
		() => getProduct(id),
		{ enabled: !!id }
	);
	const handleClick = () => addOrUpdateItem.mutate({ ...item, quantity: 1 });
	return (
		<div>
			{isLoading && <h1>Loading...</h1>}
			{item && (
				<section className="flex flex-col items-center sm:flex-row w-full p-4">
					<img
						className="w-full basis-7/12"
						src={item.image ? item.image : item.imgUrl}
						alt={item.title}
					/>
					<div className="flex w-full basis-5/12">
						<div className="w-full flex flex-col justify-between">
							<h2 className="w-full text-3xl font-bold py-2 border-b border-gray-400">
								{item.title}
							</h2>
							<p>{item.price}</p>
						</div>
					</div>
					<Button text={"장바구니에 추가"} onClick={handleClick}></Button>
				</section>
			)}
		</div>
	);
}
