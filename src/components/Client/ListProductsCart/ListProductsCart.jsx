import React, { useState, useEffect } from 'react';
import { Image, Button, Icon } from 'semantic-ui-react';
import { map, forEach } from 'lodash';
import { useParams, useHistory } from 'react-router-dom';

import './ListProductsCart.scss';

export const ListProductsCart = (props) => {

    const { products } = props;

    return (
        <div className="list-product-cart">
            {map(products, (product, index) => (
                <div key={index} className="list-product-cart__product">
                    <div>
                        <Image src={product.image} avatar />
                        <span>{product.title}</span>
                    </div>
                    <span className="list-product-cart__product__price">$ {product.price}</span>
                    <Icon name="close"/>
                </div>
            ))}

            <Button primary fluid>
                Realizar Pedido
            </Button>
        </div>
    )
}
