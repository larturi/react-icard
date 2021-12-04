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


export const removeProductCartApi = (index) => {
    const idProducts = getProductsCart();
    idProducts.splice(index, 1);
    localStorage.setItem(PRODUCTS_CART, JSON.stringify(idProducts));
};

export const cleanProductCartApi = () => {
    localStorage.removeItem(PRODUCTS_CART);
};