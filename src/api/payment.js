import { fetchData } from "./fetchData";

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
