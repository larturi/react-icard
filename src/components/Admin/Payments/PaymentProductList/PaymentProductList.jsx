/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { map, sumBy } from 'lodash';
import { Image } from 'semantic-ui-react';

import { useOrder } from '../../../../hooks'; 

import './PaymentProductList.scss';

export const PaymentProductList = (props) => {

    const { payment } = props; 
    const { getOrdersByPayment } = useOrder();
    const [orders, setOrders] = useState([]);

    console.log(orders);

    useEffect(() => {
        (async () => {
            const response = await getOrdersByPayment(payment.id);
            setOrders(response);
        })();
    }, []);

    return (
        <div className="payment-product-list">
            {map(orders, (order) => (
                <div className="payment-product-list__product" key={order.id}>
                    <div>
                        <Image src={order.product_data.image} avatar size="tiny" />
                        <span>{order.product_data.title}</span>
                    </div>
                    <span>ARS $ {order.product_data.price}</span>
                </div>
            ))}
            <div className="payment-product-list__total">
                <span>TOTAL: ARS $ {sumBy(orders, function(o) { return Number(o.product_data.price) })}</span>
            </div>
        </div>
    );
}
