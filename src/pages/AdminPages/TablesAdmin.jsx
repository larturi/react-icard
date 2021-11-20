import React, { useEffect } from 'react';
import { Loader } from 'semantic-ui-react';

import { HeaderPage, TableMesasAdmin } from '../../components/Admin';
import { useTable } from '../../hooks';

export const TablesAdmin = () => {

    const { loading, tables, getTables } = useTable();

    useEffect(() => getTables(), []);

    console.log(tables);

    return (
        <>
            <HeaderPage title="Mesas" btnTitle="Crear Nueva Mesa" />

            {loading ? (
                <Loader active inline="centered">Cargando...</Loader>
            ) : (
                <TableMesasAdmin tables={tables} />
            )}
        </>
    )
};
