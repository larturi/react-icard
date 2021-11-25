import { useState } from 'react';

import {
    getOrdersByTablesApi,
} from '../api/orders';

export function useOrder() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [orders, setOrders] = useState(null);

    const getOrders = async (idTable, status = '', ordering = '') => {
        try {
            setLoading(true);
            const response = await getOrdersByTablesApi(idTable, status, ordering);
            setLoading(false);
            return response;
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    const getOrdersByTable = async (idTable, status, ordering) => {
        try {
            setLoading(true);
            const response = await getOrdersByTablesApi(idTable, status, ordering);
            setLoading(false);
            setOrders(response);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    return {
        error,
        loading,
        orders,
        getOrders,
        getOrdersByTable
    }

};