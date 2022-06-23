import './ProfessionalSections.scss';
import { Link } from 'react-router-dom';
import plus from '../../images/plus.png';
import edit from '../../images/edit.png';
import exclude from '../../images/exclude.png';
import icon_alert_circle from '../../images/icon-alert-circle.png';
import icon_check_circle from '../../images/icon-check-circle.png';
import ModalGeneric from '../../components/ModalGeneric';
import React, { useEffect, useState } from 'react';

export default function SectionStudents() {
    function ListStudents() {
        //Array estático até ter a consulta ao back-end
        const initialObj = {
            'id': 0,
            'user_id': 0,
            'User': {
                'firstName': '',
                'lastName': ''
            }
        }
        const [arrPeople, setArrPeople] = useState([initialObj]);
        const professionalId = localStorage.getItem("@Auth:professional_id");
        const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false);
        const [isModalOkSuccessVisible, setIsModalOkSuccessVisible] = useState(false);
        const [isModalOkFailedVisible, setIsModalOkFailedVisible] = useState(false);
        const [clientOnDeleting, setClientOnDeleting] = useState();
        const userId = localStorage.getItem("@Auth:userId");
        
        useEffect(() => {
            fetch('http://localhost:10000/customer/clients/professional/' + professionalId, {
                headers: {
                    'Authorization': localStorage.getItem("@Auth:token")
                },
            })
                .then(response => response.json())
                .then(data => {arr(data)})
        }, [])

        const arr = props => {
            setArrPeople(props);
        }

        const deleteUser = id => {
            fetch('http://localhost:10000/customer/clients/' + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': localStorage.getItem("@Auth:token")
                },
            })
            .then(response => {
                response.json();
                if (response.ok) {
                    setIsModalOkSuccessVisible(true);
                } else {
                    setIsModalOkFailedVisible(true);
                }
            })
            .catch(error => {
                console.error("Error on delete user:", error)
            });
            closeExcludeModal();
        }

        const redirectUpdate = (id) => {
            window.location.href = '/professional/students/update/' + id;
        }

        const openExcludeModal = (person) => {
            setClientOnDeleting(person);
            setIsModalConfirmVisible(true);
        }

        const closeExcludeModal = () => {
            setIsModalConfirmVisible(false);
        }

        return (
            <>
                <div className='list-things'>
                    {arrPeople.length > 0 &&
                        <div className='title-list'>
                            <div>
                                <span>Nome</span>
                            </div>
                        </div>
                    }
                    {
                    arrPeople.length > 0 ?
                    arrPeople.map(person => {
                        return (
                            <>
                            <div className='list-line' key={'student-' + person.id}>
                                <div className='item-list' onDoubleClick={()=>{redirectUpdate(person.id)}}>
                                    <span>{person.User.firstName + ' ' + person.User.lastName}</span>
                                </div>
                                <Link to={'/professional/students/update/' + person.id}>
                                    <button className='btn btn-edit'><img src={edit} alt='Editar' /></button>
                                </Link>
                                <button className='btn btn-exclude' onClick={ ()=>{openExcludeModal(person)} }><img src={exclude} alt='Excluir' /></button>
                            </div>
                            </>
                        )
                    })
                    :
                    <div className='list-empty'>
                        <img src={icon_alert_circle} alt="Alerta" />
                        <h1>Você ainda não possui nenhum aluno cadastrado...</h1>
                        <span>Adicione novos alunos clicando no botão abaixo!</span>
                        <div className='item-list'>
                        </div>
                    </div>
                    }
                </div>
                {isModalConfirmVisible  && <ModalGeneric onClose={ closeExcludeModal }>
                    <div className='modal-confirm-crud'>
                        <div className='modal-confirm-crud__texts'>
                            <h1>Você confirma a exclusão do aluno</h1>
                            <h1>{clientOnDeleting.User.firstName + ' ' + clientOnDeleting.User.lastName}?</h1>
                        </div>
                        <div className='modal-confirm-crud__buttons'>
                            <button type='button' id='btn-saveEditUser' className='btn btn-confirm' onClick={ ()=>{deleteUser(clientOnDeleting.id)} }>Confirmar</button>
                            <button className='btn btn-cancel' onClick={ closeExcludeModal }>Cancelar</button>
                        </div>
                    </div>
                </ModalGeneric>}
                {isModalOkSuccessVisible  && <ModalGeneric onClose={ ()=>{setIsModalOkSuccessVisible(false)} }>
                    <div className='modal-confirm-crud'>
                        <div className='modal-confirm-crud__texts'>
                            <img src={icon_check_circle} alt="Confirmação de exclusão" />
                            <h1>Aluno deletado com sucesso!</h1>
                        </div>
                        <div className='modal-confirm-crud__buttons'>
                            <button className='btn btn-confirm' onClick={ ()=>{setIsModalOkSuccessVisible(false);window.location.href = '/professional/students'} }>Ok</button>
                        </div>
                    </div>
                </ModalGeneric>}
                {isModalOkFailedVisible  && <ModalGeneric onClose={ ()=>{setIsModalOkFailedVisible(false)} }>
                    <div className='modal-confirm-crud'>
                        <div className='modal-confirm-crud__texts'>
                            <img src={icon_alert_circle} alt="Confirmação de exclusão" />
                            <h1>O aluno não foi deletado!</h1>
                            <span>Certifique-se de que não existam avaliações físicas e/ou planos alimentares atrelados a este aluno e tente novamente!</span>
                        </div>
                        <div className='modal-confirm-crud__buttons'>
                            <button className='btn btn-confirm' onClick={ ()=>{setIsModalOkFailedVisible(false);} }>Ok</button>
                        </div>
                    </div>
                </ModalGeneric>}
            </>
        )
    }

    return (
        <>
            <div className='div-scroller'>
                <ListStudents />
            </div>
            <div className='div-btn-add'>
                <Link to={'/professional/students/create'}>
                    <button className='btn btn-add'>Adicionar<img src={plus} alt='Excluir' /></button>
                </Link>
            </div>
        </>
    )
}