/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { map, size, forEach} from 'lodash';
import { Button } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { OrderHistoryItem } from '../../../components/Client';
import { useOrder, useTable, usePayment } from '../../../hooks';
import { ModalConfirm } from '../../../components/Common';

export const OrdersHistory = () => {

    const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
    const { getTableByNumber } = useTable();
    const { tableNumber } = useParams();
    const { createPayment, getPaymentByTable } = usePayment();

    
    const [showTypePayment, setShowTypePayment] = useState(false);
    const [isRequestAccount, setIsRequestAccount] = useState(false);
    const [idTable, setIdTable] = useState(null);
    
    useEffect(() => {
        (async () => {
            const table = await getTableByNumber(tableNumber);
            const idTableTemp = table[0].id;
            
            setIdTable(idTableTemp);
            
            getOrdersByTable(idTableTemp, "", "ordering=-status,-created_at");
        })();
    }, []);
    
    useEffect(() => {
        (async () => {
            if (idTable) {
                const response = await getPaymentByTable(idTable);
                setIsRequestAccount(response);
            }     
        })();
    }, [idTable]);
    
    const onCreatePayment = async (paymentType) => {
        setShowTypePayment(false);

        let totalPayment = 0;

        forEach(orders, (order) => {
            totalPayment += Number(order.product_data.price);
        });

        const paymentData = {
            table: idTable,
            total_payment: totalPayment.toFixed(2),
            payment_type: paymentType,
            status_payment: "PENDING"
        }

        const payment = await createPayment(paymentData);

        for await (const order of orders) {
            await addPaymentToOrder(order.id, payment.id);
        }

        window.location.reload();
    }

    return (
        <div>
            <h2>Historial de Pedidos</h2>

            {loading ? <p>Cargando...</p> : (
                <>
                    {size(orders) > 0 && (
                        <Button primary fluid onClick={() => size(isRequestAccount) ===0 && setShowTypePayment(true)}>
                            {size(isRequestAccount) > 0 ? ("La cuenta ya fue pedida") : ("Pedir la cuenta")}
                        </Button>
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
                onClose={() => onCreatePayment("CASH")}
                onConfirmText="Tarjeta"
                onConfirm={() => onCreatePayment("CARD")}
            />
        </div>
    )
}
