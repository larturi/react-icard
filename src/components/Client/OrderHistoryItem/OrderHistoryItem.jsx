import React from 'react';
import { Image } from 'semantic-ui-react';
import classNames from 'classnames';
import moment from 'moment';
import  'moment/locale/es';
import { ORDER_STATUS } from '../../../utils/constants';

import './OrderHistoryItem.scss';

export const OrderHistoryItem = (props) => {

    const { order } = props;
    const { title, image } = order.product_data ;

    return (
        <div className={classNames("order-history-item", {
            [order.status.toLowerCase()]: true
        })}>
            <div className="order-history-item__time">
                <span>
                    Pedido { moment(order.created_at).startOf('second').fromNow() }
                </span>
            </div>

            <div className="order-history-item__product">
                <Image src={image} />
                <p>{title}</p>
            </div>

            {order.status === ORDER_STATUS.PENDING ? (
                <span className="label-state black">Preparando</span>
            ) : (
                <span className="label-state green">Entregado</span>
            )}
        </div>
    )
}
