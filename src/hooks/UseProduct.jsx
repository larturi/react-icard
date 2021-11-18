import { useState } from 'react';

import { 
    getProductsApi,
    addProductApi
} from '../api/product';

import { useAuth } from './';

export function useProduct() {

    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ products, setProducts ] = useState(null);

    const { auth } = useAuth();

    const getProducts = async () => {
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

    return {
        loading,
        error,
        products,
        getProducts,
        addProduct,
    }

};