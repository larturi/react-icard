
import { useState } from 'react';

import { 
    getTablesApi,
    addTableApi,
    updateTableApi,
} from '../api/table';

import { useAuth } from './';

export function useTable() {

    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ tables, setTables ] = useState(null);

    const { auth } = useAuth();

    const getTables = async () => {
        try {
            setLoading(true);
            const response = await getTablesApi();
            setLoading(false);
            setTables(response);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }

    const addTable = async (data) => {
        try {
            setLoading(true);
            const response = await addTableApi(data, auth.token);
            setLoading(false);
            setTables(response);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }

    const updateTable = async (id, data) => {
        try {
            setLoading(true);
            const response = await updateTableApi(id, data, auth.token);
            setLoading(false);
            setTables(response);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }

    return {
        loading,
        error,
        tables,
        getTables,
        addTable,
        updateTable,
    }
};