import { fetchData } from "./fetchData";

const BASE_API = process.env.REACT_APP_BASE_API;
const PRODUCTS_CART = 'productsCart';

export const getProductsCart = () => {
    const response = localStorage.getItem(PRODUCTS_CART);
    return response ? JSON.parse(response) : [];
}

export const addProductCart = (idProduct) => {
    const products = getProductsCart();
    products.push(idProduct);
    localStorage.setItem(PRODUCTS_CART, JSON.stringify(products));
};
