/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { map, size, forEach} from 'lodash';
import { Button } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { OrderHistoryItem } from '../../../components/Client';
import { useOrder, useTable } from '../../../hooks';
import { ModalConfirm } from '../../../components/Common';

export const OrdersHistory = () => {

    const { loading, orders, getOrdersByTable } = useOrder();
    const { getTableByNumber } = useTable();
    const { tableNumber } = useParams();

    const [showTypePayment, setShowTypePayment] = useState(false);

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
                    {size(orders) > 0 && (
                        <Button primary fluid onClick={() => setShowTypePayment(true)}>Pedir la cuenta</Button>
                    )}

                    {map(orders, (order) => (
                        <OrderHistoryItem key={order.id} order={order} />
                    ))}
                </>
            )}

            <ModalConfirm
                title="Pagar con Tarjeta o Efectivo"
                show={showTypePayment}
                onCloseText="Efectivo"
                onClose={() => console.log('Pagar en eftvo')}
                onConfirmText="Tarjeta"
                onConfirm={() => console.log('Pagar con tarjeta')}
            />
        </div>
    )
}
