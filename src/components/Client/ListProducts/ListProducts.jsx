import React from 'react';
import { Image, Button, Icon } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { map } from 'lodash';
import { addProductCart } from '../../../api/cart';

import './ListProducts.scss';

export const ListProducts = (props) => {

    const { products } = props;

    const addCart = (product) => {
        addProductCart(product.id);
        toast.success(`${product.title} añadido al carrito`);
    };

    return (
        <div className="list-products-client">
            {map(products, (product) => (
                <div key={product.id} className="list-products-client__product">
                    <div className="list-products-client__title">
                        <Image src={product.image} size="small" />
                        <span>{product.title}</span>
                    </div>

                    <div className="list-products-client__button">
                        <Button primary icon onClick={() => addCart(product)}>
                            <Icon name="add" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}
