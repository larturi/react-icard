/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { HeaderPage, TableMesasAdmin, AddEditMesaForm } from '../../components/Admin';
import { useTable } from '../../hooks';
import { ModalBasic } from '../../components/Common';

export const TablesAdmin = () => {

    const { loading, tables, getTables, deleteTable } = useTable();

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false);

    const openCloseModal = () => setShowModal(prev => !prev);    
    const onRefetch = () => setRefetch(prev => !prev);

    const MySwal = withReactContent(Swal);

    useEffect(() => getTables(), [refetch]);

    const addTable = () => {
        setTitleModal('Agregar Mesa');
        setContentModal(<AddEditMesaForm onClose={openCloseModal} onRefetch={onRefetch} />);
        openCloseModal();
    }

    const updateTable = (data) => {
        setTitleModal('Editar Mesa');
        setContentModal(<AddEditMesaForm onClose={openCloseModal} onRefetch={onRefetch} table={data} />);
        openCloseModal();
    }

    const onDeleteTable = (data) => {
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
                await deleteTable(data.id);
                onRefetch();
            }
          })
    }

    return (
        <>
            <HeaderPage 
                title="Mesas" 
                btnTitle="Crear Nueva Mesa" 
                btnClick={addTable} 
            />

            {loading ? (
                <Loader active inline="centered">Cargando...</Loader>
            ) : (
                <TableMesasAdmin 
                    tables={tables} 
                    updateTable={updateTable} 
                    deleteTable={onDeleteTable}
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
};
