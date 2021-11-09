/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import { HeaderPage, TableUsers } from '../../components/Admin'
import { ModalBasic } from '../../components/Common'

import { useAuth, useUser } from '../../hooks'

export const UsersAdmin = () => {

    const [ titleModal, setTitleModal ] = useState(null);
    const [ showModal, setShowModal ] = useState(false);
    const [ contentModal, setContentModal ] = useState(null);

    const { auth } = useAuth();
    const { loading, users, getUsers } = useUser();

    useEffect(() => {
        getUsers();
    }, []);

    const openCloseModal = () => setShowModal((prev) => !prev);

    if(auth.me?.is_staff) {
        return (
            <>
                <HeaderPage 
                    title="Usuarios"
                    btnTitle="Nuevo Usuario"
                    btnClick={openCloseModal}
                />
                {loading ? (
                    <Loader active inline="centered">Cargando...</Loader>
                ) : (
                    <TableUsers users={users} />
                )}

                <ModalBasic 
                    show={showModal} 
                    onClose={openCloseModal}
                    title="Crear Usuario" 
                    children={<h2>Contenido...</h2>}
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
