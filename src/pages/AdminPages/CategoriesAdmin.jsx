import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';

import { AddEditCategoryForm, HeaderPage, TableCategoriesAdmin } from '../../components/Admin'
import { ModalBasic } from '../../components/Common';

import { useCategories } from '../../hooks';

export const CategoriesAdmin = () => {

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refech, setRefech] = useState(false);

    const { loading, categories, getCategories } = useCategories();

    useEffect(() => {
        getCategories();
    }, [refech]);

    const openCloseModal = () => setShowModal(prev => !prev);
    const onRefech = () => setRefech(prev => !prev);

    const addCategory = () => {
        setTitleModal("Nueva Categoria");
        setContentModal(<AddEditCategoryForm onClose={openCloseModal} onRefech={onRefech} />);
        openCloseModal();
    }

    return (
        <>
            <HeaderPage 
                title="Categorias" 
                btnTitle="Nueva Categoria"
                btnClick={addCategory}
            />
            {loading ? (
                <Loader active inline="centered">Cargando...</Loader>
            ) : (
                <TableCategoriesAdmin categories={categories} />
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
