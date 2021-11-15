import React, { useEffect } from 'react';
import { Loader } from 'semantic-ui-react';

import { HeaderPage, TableProductAdmin} from '../../components/Admin'
import { useProduct } from '../../hooks/'

export const ProductsAdmin = () => {

    const { loading, products, getProducts } = useProduct();

    useEffect(() => getProducts(), []);

    console.log(products);

    return (
        <>
            <HeaderPage title="Productos" btnTitle="Nuevo Producto" />

            {loading ? (
                <Loader active inline="centered">
                    Cargando...
                </Loader>
            ) : (
                <TableProductAdmin products={products} />
            )}
        </>
    )
}
