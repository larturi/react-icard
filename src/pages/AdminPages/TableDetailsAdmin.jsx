import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';

import { useOrder } from '../../hooks';
import { HeaderPage } from '../../components/Admin';
import { ListOrderAdmin } from '../../components/Admin/Mesas/MesaDetailAdmin';

export const TableDetailsAdmin = () => {

    const { id } = useParams();
    const { loading, orders, getOrdersByTable } = useOrder();

    useEffect(() => {
        getOrdersByTable(id);
    }, []);

    console.log(orders);

    return (
        <>
            <HeaderPage title="Detalle de mesa" />
            {loading ? (
                <Loader active inline='centered'>Cargando...</Loader>
            ) : (
                <ListOrderAdmin orders={orders} />
            )}
        </>
    )
}
