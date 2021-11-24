/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';
import {Loader} from 'semantic-ui-react';
import { HeaderPage, MesasListAdmin } from '../../components/Admin';
import { useTable } from '../../hooks';

export const OrdersAdmin = () => {

    const { loading, tables, getTables } = useTable()

    useEffect(() => getTables(), []);

    return (
        <>
            <HeaderPage title="Restaurante" />
            {loading ? (
                <Loader active inline="centered">
                    Cargando...
                </Loader>
            ) : (
                <MesasListAdmin tables={tables} />
            )}
        </>
    )
};
