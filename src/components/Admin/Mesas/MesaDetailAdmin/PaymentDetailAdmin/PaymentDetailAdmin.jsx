import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { usePayment } from '../../../../../hooks'

import './PaymentDetailAdmin.scss';

export const PaymentDetailAdmin = (props) => {

    const { payment, orders, openCloseModal, onReloadOrders } = props;

    const { closePayment } = usePayment();

    const MySwal = withReactContent(Swal);

    const getIconPayment = (paymentType) => {
        switch(paymentType) {
            case 'CASH':
                return 'money bill alternate outline';
            case 'CARD':
                return 'credit card outline';
            default:
                return 'credit card outline';
        }
    }

    const onCloseTable = async () => {
        try {
            MySwal.fire({
                title: 'Cerrar Cuenta',
                text: "Esta acción no se puede revertir",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Cerrar Cuenta',
                cancelButtonText: 'Cancelar'
              }).then( async (result) => {
                if (result.isConfirmed) {
                    await closePayment(payment.id);
                    onReloadOrders();
                }
              });
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="payment-detail">
        
            <Table striped>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>Mesa</Table.Cell>
                        <Table.Cell>{payment.table_data.number}</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>Total</Table.Cell>
                        <Table.Cell>AR$ {payment.total_payment}</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>Forma de Pago</Table.Cell>
                        <Table.Cell>
                            <Icon name={getIconPayment(payment.payment_type)}/>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>

            <Button 
                primary 
                fluid 
                onClick={onCloseTable}
            >
                MARCAR COMO PAGADO Y CERRAR MESA
            </Button>

        </div>
    )
}
