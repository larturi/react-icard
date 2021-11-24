/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { size } from 'lodash';
import { Label } from 'semantic-ui-react';
import { useOrder } from '../../../../hooks';
import { ORDER_STATUS } from '../../../../utils/constants';
import { ReactComponent as IcTable } from "../../../../assets/mesa.svg";
import classNames from "classnames";

import './MesaAdmin.scss';

export const MesaAdmin = (props) => {

    const { table } = props;

    const { getOrders } = useOrder();

    const [ordersTable, setOrdersTable] = useState([]);
    const [busyTable, setBusyTable] = useState(false);

    useEffect( async () => {
        const response = await getOrders(table.number, ORDER_STATUS.PENDING);
        setOrdersTable(response);
    }, []);

    useEffect( async () => {
        const response = await getOrders(table.number, ORDER_STATUS.DELIVERED);
        if (size(response) > 0) {
            setBusyTable(true);
        } else {
            setBusyTable(false);
        }
    }, []);

    return (
        <div className="table-admin">
            {size(ordersTable) > 0 ? (
                <Label circular color="orange">
                    {size(ordersTable)}
                </Label>
            ) : null }
            <IcTable
                className={classNames({
                    pending: size(ordersTable) > 0,
                    busy: busyTable,
                })}
            />
            <p>Mesa {table.number}</p>
        </div>
    )
}
