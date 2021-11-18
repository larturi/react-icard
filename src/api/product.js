import { fetchData } from "./fetchData";

const BASE_API = process.env.REACT_APP_BASE_API;

export const getProductsApi = async () => {
    try {
        const url = `${BASE_API}/api/products/`;
        const response = await fetchData(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
};


export const addProductApi = async (data, token) => {
    try {
        const formData = new FormData();
        formData.append('image', data.image);
        formData.append('title', data.title);
        formData.append('price', data.price);
        formData.append('category', data.category);
        formData.append('active', data.active);

        const url = `${BASE_API}/api/products/`;

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