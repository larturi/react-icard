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

export const getTableApi = async (idTable) => {
    try {
        const url = `${BASE_API}/api/tables/${idTable}`;
        const response = await fetchData(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
};

export const getTableByNumberApi = async (numberTable) => {
    try {
        const tableFilter = `number=${numberTable}`;
        const url = `${BASE_API}/api/tables/?${tableFilter}`;
        const response = await fetchData(url);
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        throw error;
    } 
};

export const addTableApi = async (data, token) => {
    try {
        const url = `${BASE_API}/api/tables/`;

        const params = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        const response = await fetchData(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
};

export const updateTableApi = async (id, data, token) => {
    try {
        const url = `${BASE_API}/api/tables/${id}/`;

        const params = {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        const response = await fetchData(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
};

export const deleteTableApi = async (id, token) => {
    try {
        const url = `${BASE_API}/api/tables/${id}/`;

        const params = {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        };

        const response = await fetchData(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
};
