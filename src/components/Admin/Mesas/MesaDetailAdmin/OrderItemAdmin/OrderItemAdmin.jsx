import React from 'react';
import { Image } from 'semantic-ui-react';
import classNames from 'classnames';
import moment from 'moment';
import 'moment/locale/es';

import './OrderItemAdmin.scss';

export const OrderItemAdmin = (props) => {

    const { order } = props;
    const { title, image } = order.product_data;

    const itemClass = classNames({
        'order-item-admin': true,
        [order.status.toLowerCase()]: true
    });

    return (
        <div className={itemClass}>
            <div className='order-item-admin__time'>
                <span>
                    {moment(order.created_at).format('DD-MMM HH:mm')} {' ('}
                </span>
                <span>
                    {moment(order.created_at).startOf('secods').fromNow()} {')'}
                </span>
            </div>
            <div className='order-item-admin__product'>
                <Image src={image} />
                <p>{title.toUpperCase()}</p>
            </div>
        </div>
    )
}
