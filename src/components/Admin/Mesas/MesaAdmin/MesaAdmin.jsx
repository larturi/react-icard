/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { size } from 'lodash';
import { Label } from 'semantic-ui-react';
import { useOrder } from '../../../../hooks';
import { Link } from 'react-router-dom';
import { ORDER_STATUS } from '../../../../utils/constants';
import { ReactComponent as IcTable } from "../../../../assets/mesa.svg";
import classNames from "classnames";
import { usePayment } from '../../../../hooks';

import './MesaAdmin.scss';

export const MesaAdmin = (props) => {

    const { table, reload } = props;

    const { getOrders } = useOrder();

    const [ordersTable, setOrdersTable] = useState([]);
    const [busyTable, setBusyTable] = useState(false);
    const [pendingPayment, setPendingPayment] = useState(false);

    const { getPaymentByTable } = usePayment();

    useEffect( async () => {
        const response = await getOrders(table.number, ORDER_STATUS.PENDING);
        setOrdersTable(response);
    }, [reload]);

    useEffect( async () => {
        const response = await getOrders(table.number, ORDER_STATUS.DELIVERED);
        if (size(response) > 0) {
            setBusyTable(true);
        } else {
            setBusyTable(false);
        }
    }, [reload]);

    useEffect(() => {
        (async () => {
            const response = await getPaymentByTable(table.id);
            if (size(response) > 0) {
                setPendingPayment(true);
            } else {
                setPendingPayment(false);
            }
        })()
    }, [reload])

    return (
        <Link className="table-admin" to={`/admin/table/${table.id}`}>
            {size(ordersTable) > 0 ? (
                <Label circular color="orange">
                    {size(ordersTable)}
                </Label>
            ) : null }

            {pendingPayment && (
                <Label circular color="orange">
                  Cobrar
                </Label>
            )}

            <IcTable
                className={classNames({
                    pending: size(ordersTable) > 0,
                    busy: busyTable,
                    pendingPayment: pendingPayment,
                })}
            />
            <p>Mesa {table.number}</p>
        </Link>
    )
}
