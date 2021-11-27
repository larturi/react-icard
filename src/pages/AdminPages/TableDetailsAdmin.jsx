/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';

import { useOrder, useTable } from '../../hooks';
import { HeaderPage } from '../../components/Admin';
import { ListOrderAdmin } from '../../components/Admin/Mesas/MesaDetailAdmin';

export const TableDetailsAdmin = () => {

    const [reloadOrders, setReloadOrders] = useState(false);

    const { id } = useParams();
    const { loading, orders, getOrdersByTable } = useOrder();
    const { getTable, table } = useTable();

    useEffect(() => {
        getOrdersByTable(id, '', 'ordering=-status,created_at');
    }, [id, reloadOrders]);

    useEffect(() => getTable(id), [id])

    const onReloadorders = () => {
        setReloadOrders((prev) => !prev);
    }

    return (
        <>
            <HeaderPage title={`Detalle de mesa ${table?.number || ''}`} />
            {loading ? (
                <Loader active inline='centered'>Cargando...</Loader>
            ) : (
                <ListOrderAdmin orders={orders} onReloadorders={onReloadorders} />
            )}
        </>
    )
}
