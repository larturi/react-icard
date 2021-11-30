/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import { HeaderPage } from '../../components/Admin';
import { usePayment } from '../../hooks';
 
export const PaymentsHistory = () => {

    const { loading, payments, getPayments } = usePayment();

    useEffect(() => {
        getPayments();
    }, [])

    console.log(payments);

    return (
        <>
            <HeaderPage title="Historial de Pagos" />
            {loading ? (
                <Loader active inline='centered'>Cargando...</Loader>
            ) : (
                <p>Tabla</p>
            )}
        </>
    )
}
