import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewProduct, getProducts } from "../apis/firebase";
import { IProduct } from "../pages/NewProduct";

export default function useProduct() {
	const queryClient = useQueryClient();

	const productQuery = useQuery(["products"], getProducts, {
		staleTime: 1000 * 60,
	});
	const addProduct = useMutation(
		({ product, url }: { product: IProduct; url: string }) =>
			addNewProduct(product, url),
		{ onSuccess: () => queryClient.invalidateQueries(["products"]) }
	);
	return { productQuery, addProduct };
}
