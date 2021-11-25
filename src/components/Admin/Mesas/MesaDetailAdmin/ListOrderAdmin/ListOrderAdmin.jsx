import React from 'react';
import { map } from 'lodash';

import './ListOrderAdmin.scss';

import { OrderItemAdmin } from '..';

export const ListOrderAdmin = (props) => {

    const { orders } = props;

    return (
        <div className="list-orders-admin">
            {map(orders, (order, index) => (
                <OrderItemAdmin key={order.id} order={order} />
            ))}
        </div>
    )
}
