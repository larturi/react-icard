import { fetchData } from "./fetchData";

const BASE_API = process.env.REACT_APP_BASE_API;

export const getCategoriesApi = async () => {
    try {
        const url = `${BASE_API}/api/categories/`;
        const response = await fetchData(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
};

export const addCategoryApi = async (data, token) => {
    try {

        const formData = new FormData();
        formData.append('image', data.image);
        formData.append('title', data.title);

        const url = `${BASE_API}/api/categories/`;

        const params = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formData
        };

        const response = await fetchData(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
};

export const updateCategoryApi = async (id, data, token) => {
    try {

        const formData = new FormData();
        formData.append('title', data.title);

        if (data.image) {
            formData.append('image', data.image);
        }

        const url = `${BASE_API}/api/categories/${id}/`;

        const params = {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formData
        };

        const response = await fetchData(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
};

export const deleteCategoryApi = async (id, token) => {
    try {
        const url = `${BASE_API}/api/categories/${id}/`;

        const params = {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        };

        const response = await fetchData(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
};