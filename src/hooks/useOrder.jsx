import { useState } from 'react';

import {
    getOrdersByTablesApi,
    checkDeliveredOrderApi,
    addOrderToTableApi,
    addPaymentToOrderApi,
    closeOrderApi,
    getOrdersByPaymentApi,
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

    const checkDeliveredOrder = async (idOrder) => {
        try {
            await checkDeliveredOrderApi(idOrder);
        } catch (error) {
            setError(error);
        }
    };

    const addOrderToTable = async (idTable, idOrder) => {
        try {
            await addOrderToTableApi(idTable, idOrder);
        } catch (error) {
            setError(error);
        } 
    };
    
    const addPaymentToOrder = async (idOrder, idPayment) => {
        try {
            await addPaymentToOrderApi(idOrder, idPayment);
        } catch (error) {
            setError(error);
        } 
    };

    const closeOrder = async (idOrder) => {
        try {
            await closeOrderApi(idOrder);
        } catch (error) {
            setError(error);
        } 
    };

    const getOrdersByPayment = async (idPayment) => {
        try {
            return await getOrdersByPaymentApi(idPayment);
        } catch (error) {
            setError(error);
        } 
    };

    return {
        error,
        loading,
        orders,
        getOrders,
        getOrdersByTable,
        checkDeliveredOrder,
        addOrderToTable,
        addPaymentToOrder,
        closeOrder,
        getOrdersByPayment,
    }

};