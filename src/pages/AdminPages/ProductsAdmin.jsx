import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';

import { ModalBasic } from '../../components/Common'
import { HeaderPage, TableProductAdmin, AddEditProductForm} from '../../components/Admin'
import { useProduct } from '../../hooks/'

export const ProductsAdmin = () => {

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);

    const { loading, products, getProducts } = useProduct();

    useEffect(() => getProducts(), []);

    const openCloseModal = () => setShowModal((prev) => !prev);

    const addProduct = () => {
        setTitleModal("Nuevo producto");
        setContentModal(
            <AddEditProductForm onClose={openCloseModal} /> 
        );
        openCloseModal();
    }

    return (
        <>
            <HeaderPage title="Productos" btnTitle="Nuevo Producto" btnClick={addProduct} />

            {loading ? (
                <Loader active inline="centered">
                    Cargando...
                </Loader>
            ) : (
                <TableProductAdmin products={products} />
            )}

            <ModalBasic 
                show={showModal} 
                onClose={openCloseModal} 
                title={titleModal} 
                children={contentModal} 
            />
        </>
    )
}
