import React, { useState, useEffect } from 'react';
import { Image, Button, Icon } from 'semantic-ui-react';
import { map, forEach } from 'lodash';
import { useParams, useHistory } from 'react-router-dom';
import { useOrder, useTable } from '../../../hooks';
import { removeProductCartApi, cleanProductCartApi } from '../../../api/cart';

import './ListProductsCart.scss';

export const ListProductsCart = (props) => {

    const { products, onReloadCart } = props;
    const { addOrderToTable } = useOrder();
    const { getTableByNumber } = useTable();
    const [total, setTotal] = useState(0);
    const { tableNumber } = useParams();
    const history = useHistory();

    useEffect(() => {
        let totalTemp = 0;
        forEach(products, (product) => {
            totalTemp += Number(product.price);
        });
        setTotal(totalTemp.toFixed(2));
    }, [products]);

    const removeProduct = (index) => {
        removeProductCartApi(index);
        onReloadCart();
    };

    const createOrder = async () => {
        const tableData = await getTableByNumber(tableNumber);
        const idTable = tableData[0].id;
        for await(const product of products) {
            await addOrderToTable(idTable, product.id);
        }
        cleanProductCartApi();
        history.push(`/client/${tableNumber}/orders`);
    };

    return (
        <div className="list-product-cart">
            {map(products, (product, index) => (
                <div key={index} className="list-product-cart__product">
                    <div>
                        <Image src={product.image} avatar />
                        <span>{product.title}</span>
                    </div>
                    <span className="list-product-cart__product__price">$ {product.price}</span>
                    <Icon name="close" onClick={() => removeProduct(index)} />
                </div>
            ))}

            <Button primary fluid onClick={createOrder}>
                Realizar Pedido {`(${total})`}
            </Button>
        </div>
    )
}
