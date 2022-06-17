import './ProfessionalSections.scss';
import { Link } from 'react-router-dom';
import plus from '../../images/plus.png';
import edit from '../../images/edit.png';
import exclude from '../../images/exclude.png';
import icon_alert_circle from '../../images/icon-alert-circle.png';
import React, { useEffect, useState } from 'react';

export default function SectionStudents() {
    function ListStudents() {
        //Array estático até ter a consulta ao back-end
        const [arrPeople, setArrPeople] = useState([{}]);
        
        useEffect(() => {
            fetch('http://localhost:10000/customer/users/names', {
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
            fetch('http://localhost:10000/customer/users/' + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': localStorage.getItem("@Auth:token")
                },
            })
            .then(response => response.json())
            .then(data => {
                const arrRefresh = arrPeople.filter(user => {
                    return user.id !== id;
                });
                setArrPeople(arrRefresh);
            })
            .catch(error => {
                console.error("Error on delete user:", error)
            });
        }

        const redirectUpdate = (id) => {
            window.location.href = '/professional/students/update/' + id;
        }

        return (
            <>
                <div className='list-things'>
                    {
                    arrPeople.length > 0 ?
                    arrPeople.map(person => {
                        return (
                            <div className='list-line' key={'student-' + person.id}>
                                <div className='item-list' onDoubleClick={()=>{redirectUpdate(person.id)}}>
                                    <span>{person.firstName + ' ' + person.lastName}</span>
                                </div>
                                <Link to={'/professional/students/update/' + person.id}>
                                    <button className='btn btn-edit'><img src={edit} alt='Editar' /></button>
                                </Link>
                                <button className='btn btn-exclude' onClick={()=>{deleteUser(person.id)}}><img src={exclude} alt='Excluir' /></button>
                            </div>
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