/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { forEach} from 'lodash';

import { useOrder, useTable, usePayment } from '../../hooks';
import { HeaderPage, AddOrderForm } from '../../components/Admin';
import { ModalBasic } from '../../components/Common';
import { ListOrderAdmin, PaymentDetailAdmin } from '../../components/Admin/Mesas/MesaDetailAdmin';

export const TableDetailsAdmin = () => {

    const [reloadOrders, setReloadOrders] = useState(false);

    const { id } = useParams();
    const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
    const { getTable, table } = useTable();
    const { createPayment, getPaymentByTable } = usePayment();

    const [showModal, setshowModal] = useState(false);
    const [paymentData, setPaymentData] = useState(null)

    const MySwal = withReactContent(Swal);

    useEffect(() => {
        getOrdersByTable(id, '', 'ordering=-status,created_at');
    }, [id, reloadOrders]);

    useEffect(() => getTable(id), [id]);

    useEffect(() => {
        ( async() => {
            const response = await getPaymentByTable(id);
            if(response.length > 0) {
                // Cuenta pedida
                setPaymentData(response[0]);
            } 
        })()
    }, [reloadOrders]);

    const onReloadOrders = () => {
        setReloadOrders((prev) => !prev);
    }

    const openCloseModal = () => {
        setshowModal((prev) => !prev);
    }

    const openCreatePayment = async () => {
        const { paymentType } = await MySwal.fire({
            title: 'Medio de pago',
            input: 'select',
            inputOptions: {
                CARD: 'Card',
                CASH: 'Cash',
            },
            inputPlaceholder: 'Medio de pago',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#207c28',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            inputValidator: (paymentType) => {

                return new Promise(async (resolve) => {
                    if (paymentType !== '') {
                        let totalPayment = 0;
                        forEach(orders, (order) => {
                            totalPayment += Number(order.product_data.price);
                        });

                        const paymentData = {
                            table: id,
                            total_payment: totalPayment.toFixed(2),
                            payment_type: paymentType,
                            status_payment: 'PENDING',
                        }

                        const payment = await createPayment(paymentData);

                        for await (const order of orders) {
                            await addPaymentToOrder(order.id, payment.id);
                        }

                        onReloadOrders();

                        resolve();
                    } else {
                      resolve('Debe elegir una forma de pago.')
                    }
                });
            }
        });
    }

    return (
        <>
            <HeaderPage 
                title={`Detalle de mesa ${table?.number || ''}`} 
                btnTitle={paymentData ? "Ver Cuenta" : "Añadir pedido"} 
                btnClick={openCloseModal}
                btnTitleTwo={!paymentData ? "Generar Cuenta" : null}
                btnClickTwo={openCreatePayment}
            />
            {loading ? (
                <Loader active inline='centered'>Cargando...</Loader>
            ) : (
                <ListOrderAdmin orders={orders} onReloadorders={onReloadOrders} />
            )}

            <ModalBasic show={showModal} onClose={openCloseModal} title={paymentData ? "Cerrar Mesa" : "Generar Pedido"}>
                { paymentData ? (
                    <PaymentDetailAdmin 
                        payment={paymentData}
                        orders={orders}
                        openCloseModal={openCloseModal}
                        onReloadOrders={onReloadOrders}
                    />
                ) : (
                    <AddOrderForm 
                        idTable={id} 
                        openCloseModal={openCloseModal} 
                        onReloadorders={onReloadOrders} 
                    />
                )}
            </ModalBasic>
        </>
    )
}
