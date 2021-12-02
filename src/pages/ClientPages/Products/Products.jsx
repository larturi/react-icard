import React from 'react';
import { useParams, Link } from 'react-router-dom';

import './Products.scss';

export const Products = () => {

    const { categoryId, tableNumber } = useParams();
    
    return (
        <div>
            <Link to={`/client/${tableNumber}`}>Volver a Categorías</Link>

            <p>Mesa {tableNumber}</p>
            <p>Categoria {categoryId}</p>
        </div>
    )
}
