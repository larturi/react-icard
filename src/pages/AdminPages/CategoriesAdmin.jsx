/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { AddEditCategoryForm, HeaderPage, TableCategoriesAdmin } from '../../components/Admin'
import { ModalBasic } from '../../components/Common';

import { useCategories } from '../../hooks';

export const CategoriesAdmin = () => {

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refech, setRefech] = useState(false);

    const { loading, categories, getCategories, deleteCategory } = useCategories();

    const MySwal = withReactContent(Swal);

    useEffect(() => {
        getCategories();
    }, [refech]);

    const openCloseModal = () => setShowModal(prev => !prev);
    const onRefetch = () => setRefech(prev => !prev);

    const addCategory = () => {
        setTitleModal("Nueva Categoria");
        setContentModal(<AddEditCategoryForm onClose={openCloseModal} onRefetch={onRefetch} />);
        openCloseModal();
    };

    const editCategory = (data) => {
        setTitleModal("Editar Categoria");
        setContentModal(<AddEditCategoryForm onClose={openCloseModal} onRefetch={onRefetch} category={data} />);
        openCloseModal();
    };

    const onDeleteCategory = (data) => {
        MySwal.fire({
            title: 'Eliminar Categoria',
            text: "Esta acción no se puede revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
          }).then( async (result) => {
            if (result.isConfirmed) {
                await deleteCategory(data.id);
                onRefetch();
            }
          })
    };

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
                <TableCategoriesAdmin 
                    categories={categories} 
                    editCategory={editCategory} 
                    deleteCategory={onDeleteCategory} 
                />
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
