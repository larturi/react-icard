import { useState } from 'react';

import {
    getOrdersByTablesApi,
} from '../api/orders';

export function useOrder() {

    const [ errorOrders, setErrorOrders ] = useState(null);

    const getOrders = async (idTable, status = '', ordering = '') => {
        try {
            const response = await getOrdersByTablesApi(idTable, status, ordering);
            return response;
        } catch (error) {
            setErrorOrders(error);
        }
    };

    return {
        errorOrders,
        getOrders,
    }

};