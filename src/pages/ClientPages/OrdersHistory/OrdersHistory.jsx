/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { map, size, forEach} from 'lodash';
import { useParams } from 'react-router-dom';
import { OrderHistoryItem } from '../../../components/Client';
import { useOrder, useTable } from '../../../hooks';

export const OrdersHistory = () => {

    const { loading, orders, getOrdersByTable } = useOrder();
    const { getTableByNumber } = useTable();
    const { tableNumber } = useParams();

    useEffect(() => {
        (async () => {
            const table = await getTableByNumber(tableNumber);
            const idTable = table[0].id;

            getOrdersByTable(idTable, "", "ordering=-status,-created_at");
        })();
    }, []);

    return (
        <div>
            <h2>Historial de Pedidos</h2>

            {loading ? <p>Cargando...</p> : (
                <>
                    {map(orders, (order) => (
                        <OrderHistoryItem key={order.id} order={order} />
                    ))}
                </>
            )}
        </div>
    )
}
