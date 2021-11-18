/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';

import { ModalBasic } from '../../components/Common'
import { HeaderPage, TableProductAdmin, AddEditProductForm} from '../../components/Admin'
import { useProduct } from '../../hooks/'

export const ProductsAdmin = () => {

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false);

    const { loading, products, getProducts } = useProduct();

    useEffect(() => getProducts(), [refetch]);

    const openCloseModal = () => setShowModal((prev) => !prev);
    const onRefetch = () => setRefetch((prev) => !prev);

    const addProduct = () => {
        setTitleModal("Nuevo Producto");
        setContentModal(
            <AddEditProductForm onClose={openCloseModal} onRefetch={onRefetch} /> 
        );
        openCloseModal();
    };

    const updateProduct = (data) => {
        setTitleModal("Actualizar Producto");
        setContentModal(
            <AddEditProductForm 
                onClose={openCloseModal} 
                onRefetch={onRefetch} 
                product={data} 
            /> 
        );
        openCloseModal();
    };

    return (
        <>
            <HeaderPage title="Productos" btnTitle="Nuevo Producto" btnClick={addProduct} />

            {loading ? (
                <Loader active inline="centered">
                    Cargando...
                </Loader>
            ) : (
                <TableProductAdmin products={products} updateProduct={updateProduct} />
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
