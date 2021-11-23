import { fetchData } from "./fetchData";

const BASE_API = process.env.REACT_APP_BASE_API;

export const getOrdersByTablesApi = async (idTable, status = '', ordering = '') => {
    try {
        const tableFilter = `table=${idTable}`;
        const statusFilter = `status=${status}`;
        const closedFilter = 'closed=False';

        const url = `${BASE_API}/api/orders/?${tableFilter}&${statusFilter}&${closedFilter}&${ordering}`;
        const response = await fetchData(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
};
