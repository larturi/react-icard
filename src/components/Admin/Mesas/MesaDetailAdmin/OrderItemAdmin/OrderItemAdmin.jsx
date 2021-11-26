import React from 'react';
import { Button, Image } from 'semantic-ui-react';
import classNames from 'classnames';
import moment from 'moment';
import 'moment/locale/es';
import { ORDER_STATUS } from '../../../../../utils/constants';
import { useOrder } from '../../../../../hooks';

import './OrderItemAdmin.scss';

export const OrderItemAdmin = (props) => {

    const { order, onReloadorders } = props;
    const { title, image } = order.product_data;
    const { checkDeliveredOrder } = useOrder();

    const onCheckdeliveredOrder = async () => {
        await checkDeliveredOrder(order.id);
        onReloadorders();
    }

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
            {
                order.status === ORDER_STATUS.PENDING && (
                    <Button primary onClick={() => onCheckdeliveredOrder()}>Marcar Entregado</Button>
                )
            }
        </div>
    )
}
