import React, { useEffect } from 'react';
import { useCategories  } from '../../../hooks';
import { ListCategories } from '../../../components/Client';

export const Categories = () => {

    const { loading, categories, getCategories } = useCategories();

    useEffect(() => getCategories(), []);

    return (
        <div>
            <h3>Categorias</h3>
            {loading ? <p>Cargando... </p> : (
                <ListCategories categories={categories} />
            )}
        </div>
    )
}
