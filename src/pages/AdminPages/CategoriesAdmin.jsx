import React, { useEffect } from 'react';
import { Loader } from 'semantic-ui-react';

import { HeaderPage, TableCategoriesAdmin } from '../../components/Admin'
import { useCategories } from '../../hooks';

export const CategoriesAdmin = () => {

    const { loading, categories, getCategories } = useCategories();

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            <HeaderPage title="Categorias" btnTitle="Nueva Categoria" />
            {loading ? (
                <Loader active inline="centered">Cargando...</Loader>
            ) : (
                <TableCategoriesAdmin categories={categories} />
            )}
        </>
    )
}
