import { BsCart, BsPen, BsShop } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IValue, useAuthContext } from "../context/AuthContextProvider";
import Button from "./Button";
import UserFC from "./UserFC";

export default function Header() {
	const { user, login, logout } = useAuthContext() as IValue;
	return (
		<header className="flex justify-between border-b border-gray-300 p-2">
			<div>
				<Link to="/" className="flex items-center text-4xl text-brand">
					<BsShop />
					<h1>Shoppy</h1>
				</Link>
			</div>
			<nav className="flex items-center gap-4 font-semibold">
				<Link to="/products/new" className="text-2xl">
					{user?.isAdmin ? <BsPen /> : null}
				</Link>
				<Link to="/products">Products</Link>
				<Link to="/cart" className="text-2xl">
					{user && <BsCart />}
				</Link>
				{!user ? (
					<Button text={"Login"} onClick={login} />
				) : (
					<>
						<UserFC user={user} />
						<Button text={"Logout"} onClick={logout} />
					</>
				)}
			</nav>
		</header>
	);
}
