/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { useOrder, useTable } from '../../hooks';
import { HeaderPage, AddOrderForm } from '../../components/Admin';
import { ModalBasic } from '../../components/Common';
import { ListOrderAdmin } from '../../components/Admin/Mesas/MesaDetailAdmin';

export const TableDetailsAdmin = () => {

    const [reloadOrders, setReloadOrders] = useState(false);

    const { id } = useParams();
    const { loading, orders, getOrdersByTable } = useOrder();
    const { getTable, table } = useTable();

    const [showModal, setshowModal] = useState(false);

    const MySwal = withReactContent(Swal);

    useEffect(() => {
        getOrdersByTable(id, '', 'ordering=-status,created_at');
    }, [id, reloadOrders]);

    useEffect(() => getTable(id), [id])

    const onReloadorders = () => {
        setReloadOrders((prev) => !prev);
    }

    const openCloseModal = () => {
        setshowModal((prev) => !prev);
    }

    const openCreatePayment = async () => {
        MySwal.fire({
            title: 'Generar Cuenta',
            text: "¿Estas seguro de cerrar la cuenta de la mesa?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#207c28',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
          }).then( async (result) => {
            if (result.isConfirmed) {
                console.log('Generar');
            }
          })
    }

    return (
        <>
            <HeaderPage 
                title={`Detalle de mesa ${table?.number || ''}`} 
                btnTitle="Añadir pedido"
                btnClick={openCloseModal}
                btnTitleTwo="Generar cuenta"
                btnClickTwo={openCreatePayment}
            />
            {loading ? (
                <Loader active inline='centered'>Cargando...</Loader>
            ) : (
                <ListOrderAdmin orders={orders} onReloadorders={onReloadorders} />
            )}

            <ModalBasic show={showModal} onClose={openCloseModal} title="Generar pedido">
                <AddOrderForm 
                    idTable={id} 
                    openCloseModal={openCloseModal} 
                    onReloadorders={onReloadorders} 
                />
            </ModalBasic>
        </>
    )
}
