import { useState } from 'react';

import { 
    getCategoriesApi,
} from '../api/categories';

export function useCategories() {

    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ categories, setCategories ] = useState(null);

    const getCategories = async () => {
        try {
            setLoading(true);
            const response = await getCategoriesApi();
            setLoading(false);
            setCategories(response);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    return {
        loading,
        error,
        categories,
        getCategories,
    }

};