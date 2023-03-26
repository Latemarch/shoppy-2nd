import { User } from "firebase/auth";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";
import { addOrUpdateToCart, removeFromCart } from "../apis/firebase";
import useCart from "../hooks/useCart";

interface ICartItem {
	price: number;
	quantity: number;
	image: string;
	imgUrl: string;
	title: string;
	id: string;
}
interface ICart {
	product: ICartItem;
	user: User | null;
}
export default function CartItem({ product, user }: ICart) {
	const { removeItem, addOrUpdateItem } = useCart();
	const handleClickMinus = () => {
		if (product.quantity > 1)
			user &&
				addOrUpdateItem.mutate({
					...product,
					quantity: product.quantity - 1,
				});
	};
	const handleClickPlus = () => {
		user &&
			addOrUpdateItem.mutate({
				...product,
				quantity: product.quantity + 1,
			});
	};
	const handleDelete = () => {
		user && removeItem.mutate(product.id);
	};
	return (
		<li className="w-[80%] m-2 flex items-center justify-center rounded-md shadow-md bg-gray-100">
			<img
				className="w-[100px] py-2 rounded-md"
				src={product.image ? product.image : product.imgUrl}
				alt={product.title}
			/>
			<div className="ml-6 w-full basis-7/12">
				<p className="font-bold">{product.title}</p>
				<p>₩{product.price}</p>
			</div>
			<div className="flex items-center p-2">
				<AiOutlineMinusSquare
					className="cursor-pointer mr-1"
					onClick={handleClickMinus}
				/>
				<p>{product.quantity}</p>
				<AiOutlinePlusSquare
					className="ml-1 cursor-pointer"
					onClick={handleClickPlus}
				/>
				<BsFillTrash3Fill
					onClick={handleDelete}
					className="ml-3 cursor-pointer"
				/>
			</div>
		</li>
	);
}
