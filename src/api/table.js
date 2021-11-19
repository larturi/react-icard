import { fetchData } from "./fetchData";

const BASE_API = process.env.REACT_APP_BASE_API;

export const getTablesApi = async () => {
    try {
        const url = `${BASE_API}/api/tables/`;
        const response = await fetchData(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
};
