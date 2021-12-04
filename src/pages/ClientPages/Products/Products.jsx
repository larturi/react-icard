/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ListProducts } from '../../../components/Client';
import { useProduct } from '../../../hooks';

export const Products = () => {


    const { categoryId, tableNumber } = useParams();
    const { loading, products, getProductByCategory } = useProduct();

    useEffect(() => getProductByCategory(categoryId), [categoryId]);
    
    return (
        <div>
            <Link to={`/client/${tableNumber}`}>Volver a Categorías</Link>

            {loading ? <p>Cargando...</p> : <ListProducts products={products}/>}
        </div>
    )
}
