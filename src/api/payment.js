import { fetchData } from "./fetchData";
import  { PAYMENT_STATUS } from '../utils/constants.js';

const BASE_API = process.env.REACT_APP_BASE_API;

export const createPaymentApi = async (paymentData) => {
    try {
        const url = `${BASE_API}/api/payments/`;

        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentData)
        };

        const response = await fetchData(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
};

export const getPaymentByTableApi = async (idTable) => {
    try {

        const tableFilter = `table=${idTable}`;
        const statusFilter = `status_payment=${PAYMENT_STATUS.PENDING}`;

        const url = `${BASE_API}/api/payments/?${tableFilter}&${statusFilter}`;

        const params = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        };

        const response = await fetchData(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
};

export const closePaymentApi = async (idPayment) => {
    try {
        const url = `${BASE_API}/api/payments/${idPayment}/`;

        const params = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status_payment: PAYMENT_STATUS.PAID
            })
        };

        const response = await fetchData(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
};
