import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	User,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import { child, get, getDatabase, ref, remove, set } from "firebase/database";
import { IProduct } from "../pages/NewProduct";
import { v4 as uuid } from "uuid";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	// databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
	databaseURL:
		"https://shoppy-1e0d8-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const database = getDatabase();
const dbRef = ref(getDatabase());

export async function login() {
	signInWithPopup(auth, provider).catch(console.error);
}

export async function logout() {
	signOut(auth).catch(console.error);
}

export function onUserStateChange(callback: (user: User | null) => void) {
	onAuthStateChanged(auth, async (user) => {
		const updatedUser = user && (await adminUser(user));
		callback(updatedUser);
	});
}

async function adminUser(user: User) {
	return get(child(dbRef, "admins")) //
		.then((res) => {
			const admins = res?.val();
			const isAdmin = admins.includes(user.uid);
			return { ...user, isAdmin };
		});
}
export async function getProducts(): Promise<IProduct[]> {
	const snapshot = await get(child(dbRef, "products")); //
	if (snapshot.exists()) {
		const data: IProduct[] = Object.values(snapshot.val());
		return data;
	}
	return [];
}

export async function getProduct(id: string | undefined): Promise<IProduct> {
	const snapshot = await get(child(dbRef, `products/${id}`)); //
	if (snapshot.exists()) {
		const data: IProduct = snapshot.val();
		return data;
	}
	return {};
}
export async function addNewProduct(product: IProduct, imgUrl: string) {
	const id = uuid();
	if (typeof product.options !== "string") {
		return;
	}
	set(ref(database, `products/${id}`), {
		...product,
		imgUrl,
		id,
		options: product.options?.split(","),
	});
}

export async function getCart(userId: string): Promise<any[]> {
	const snapshot = await get(child(dbRef, `carts/${userId}`)); //
	const items = snapshot.val() || {};
	return Object.values(items);
}

export async function addOrUpdateToCart(
	userId: string,
	item: IProduct | undefined
) {
	return set(ref(database, `carts/${userId}/${item?.id}`), item);
}

export async function removeFromCart(userId: string, id: string) {
	return remove(ref(database, `carts/${userId}/${id}`));
}
