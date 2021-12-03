/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { useProduct } from '../../../hooks';
import { getProductsCart } from '../../../api/cart';

export const Cart = () => {

    const { getProductById } = useProduct();

    const [products, setProducts] = useState(null);

    console.log(products);

    useEffect(() => {
        (async () => {
            const idProductsCart = await getProductsCart();

            const productsArray = [];

            for await (const idProduct of idProductsCart) {
                const response = await getProductById(idProduct);
                setProducts(response);
            }

            setProducts(productsArray);
        })();
    }, []);

    return (
        <div>
            <h2>Mi Carrito</h2>
        </div>
    )
}
