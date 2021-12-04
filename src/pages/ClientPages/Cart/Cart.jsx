/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { size } from 'lodash';
import { Button } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import { useProduct } from '../../../hooks';
import { getProductsCart } from '../../../api/cart';
import { ListProductsCart } from '../../../components/Client';

export const Cart = () => {

    const { getProductById } = useProduct();
    const { tableNumber } = useParams();

    const [products, setProducts] = useState(null);
    const [reloadCart, setReloadCart] = useState(false);

    const onReloadCart = () => {
        setReloadCart((prev) => !prev);
    }

    useEffect(() => {
        (async () => {
          const idProductsCart = getProductsCart();
    
          const productsArray = [];
          for await (const idProduct of idProductsCart) {
            const response = await getProductById(idProduct);
            productsArray.push(response);
          }
          setProducts(productsArray);
        })();
      }, [reloadCart]);

    return (
        <div>
            <h2>Mi Carrito</h2>
            {!products ? (
                <p>Cargando...</p>
            ) : size(products) > 0 ? (
                <ListProductsCart products={products} onReloadCart={onReloadCart}/>
            ) : (
                <div style={{ textAlign: "center" }}>
                <p>Tu carrito esta vacio</p>
                <Link to={`/client/${tableNumber}/orders`}>
                  <Button primary>Ver pedidos</Button>
                </Link>
              </div>
            )}
        </div>
    )
}
