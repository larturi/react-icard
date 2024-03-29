import { useState } from 'react';

import {
    getProductsApi,
    getProductByIdApi,
    addProductApi,
    updateProductApi,
    deleteProductApi,
    getProductByCategoryApi,
} from '../api/product';

import { useAuth } from './';

export function useProduct() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState(null);

    const { auth } = useAuth();

    const getProducts = async() => {
        try { 
            setLoading(true);
            const response = await getProductsApi();
            setLoading(false);
            setProducts(response);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    const getProductById = async (id) => {
        try {
            const product = await getProductByIdApi(id);
            return product;
        } catch (error) {
            setError(error);
        }
    };

    const addProduct = async (data) => {
        try {
            setLoading(true);
            const response = await addProductApi(data, auth.token);
            setLoading(false);
            setProducts(response);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    const updateProduct = async (id, data) => {
        try {
            setLoading(true);
            const response = await updateProductApi(id, data, auth.token);
            setLoading(false);
            setProducts(response);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            setLoading(true);
            await deleteProductApi(id, auth.token);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    const getProductByCategory = async (idCategory) => {
        try {
            setLoading(true);
            const response = await getProductByCategoryApi(idCategory);
            setLoading(false);
            setProducts(response);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    return {
        loading,
        error,
        products,
        getProducts,
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductByCategory,
    }

};