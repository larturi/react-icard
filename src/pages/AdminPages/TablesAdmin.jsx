import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';

import { HeaderPage, TableMesasAdmin, AddEditMesaForm } from '../../components/Admin';
import { useTable } from '../../hooks';
import { ModalBasic } from '../../components/Common';

export const TablesAdmin = () => {

    const { loading, tables, getTables } = useTable();

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);

    useEffect(() => getTables(), []);

    const openCloseModal = () => setShowModal(!showModal);

    const addTable = () => {
        setTitleModal('Agregar Mesa');
        setContentModal(<AddEditMesaForm onClose={openCloseModal}/>);
        openCloseModal();
    }

    return (
        <>
            <HeaderPage title="Mesas" btnTitle="Crear Nueva Mesa" btnClick={addTable} />

            {loading ? (
                <Loader active inline="centered">Cargando...</Loader>
            ) : (
                <TableMesasAdmin tables={tables} />
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
