/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import { HeaderPage, TableUsers, AddEditUserForm } from '../../components/Admin'
import { ModalBasic } from '../../components/Common'

import { useAuth, useUser } from '../../hooks'

export const UsersAdmin = () => {

    const [ titleModal, setTitleModal ] = useState(null);
    const [ showModal, setShowModal ] = useState(false);
    const [ contentModal, setContentModal ] = useState(null);
    const [ refetch, setRefetch ] = useState(false);

    const { auth } = useAuth();
    const { loading, users, getUsers } = useUser();

    useEffect(() => {
        getUsers();
    }, [refetch]);

    const openCloseModal = () => setShowModal((prev) => !prev);
    const onRefetch = () => setRefetch((prev) => !prev);

    const createUser = () => {
        setTitleModal("Nuevo Usuario");
        setContentModal(
            <AddEditUserForm 
                onClose={openCloseModal} 
                onRefetch={onRefetch} 
                btnName="Crear" 
            />
        );
        openCloseModal();
    };

    const updateUser = (data) => {
        setTitleModal("Editar Usuario");
        setContentModal(
            <AddEditUserForm 
                onClose={openCloseModal} 
                onRefetch={onRefetch} 
                btnName="Editar" 
                user={data}
            />
        );
        openCloseModal();
    };

    if(auth.me?.is_staff) {
        return (
            <>
                <HeaderPage 
                    title="Usuarios"
                    btnTitle="Nuevo Usuario"
                    btnClick={createUser}
                />
                {loading ? (
                    <Loader active inline="centered">Cargando...</Loader>
                ) : (
                    <TableUsers users={users} updateUser={updateUser} />
                )}

                <ModalBasic 
                    show={showModal} 
                    onClose={openCloseModal}
                    title="Crear Usuario" 
                    children={contentModal}
                />
            </>
        )
    } else {
        return (
            <div>
                <h3>Acceso restringido al Administrador</h3>
            </div>
        )
    }

    
    
}
