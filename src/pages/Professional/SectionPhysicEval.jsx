import './ProfessionalSections.scss';
import { Link } from 'react-router-dom';
import plus from '../../images/plus.png';
import edit from '../../images/edit.png';
import exclude from '../../images/exclude.png';
import icon_alert_circle from '../../images/icon-alert-circle.png';
import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import Professional from './Professional';

export default function SectionPhysicEval() {
    function ListEvaluations() {
        //Array estático até ter a consulta ao back-end
        const initialObj = {
            'id': 0,
            'user_id': 0,
            'createdAt': '2000-01-01T17:00:00.000Z',
            'Client': {
                'User': {
                    'firstName': '',
                    'lastName': ''
                }
            }
        }
        const [arrEval, setArrEval] = useState([initialObj]);
        const professionalId = localStorage.getItem("@Auth:professional_id");

        useEffect(() => {
            fetch('http://localhost:10000/phyisical_evaluation/evaluations/professional/' + professionalId, {
                headers: {
                    'Authorization': localStorage.getItem("@Auth:token")
                }, 
            })
            .then(response => response.json())
            .then(data => {
                var arrBuffer = [];
                data.forEach(user => {
                    var userData = {'id': user.Client.id, 'fullName': user.Client.firstName + ' ' + user.Client.lastName};
                    arrBuffer.push(userData);
                });
                arr(data);
            })
        }, [])

        const arr = props => {
            setArrEval(props);
        }

        const deleteEval = id => {
            fetch('http://localhost:10000/phyisical_evaluation/evaluations/' + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': localStorage.getItem("@Auth:token")
                }, 
            })
            .then(response => response.json())
            .then(data => {
                const arrRefresh = arrEval.filter(evaluation => {
                    return evaluation.id !== id;
                });
                setArrEval(arrRefresh);
            })
            .catch(error => {
                console.error("Error on delete evaluation:", error)
            });
        }

        const redirectUpdate = (id) => {
            window.location.href = '/professional/evaluations/update/' + id;
        }

        return (
            <>
                <div className='list-things'>
                    {arrEval.length > 0 &&
                        <div className='title-list'>
                            <div>
                                <span>Nome</span>
                            </div>
                            <div>
                                <span>Data de criação</span>
                            </div>
                        </div>
                    }
                    {arrEval.length > 0 ?
                    arrEval.map(evaluation => {
                        return (
                            <>
                            <div className='list-line' key={'eval-' + evaluation.id}>
                                <div className='item-list' onDoubleClick={()=>{redirectUpdate(evaluation.id)}}>
                                    <div className='eval-list'><span>{evaluation.Client.User.firstName + ' ' + evaluation.Client.User.lastName}</span></div>
                                    <div><span>{arrEval.length > 0 &&
                                        Moment(evaluation.createdAt.replace(/-/gi, '').slice(0, -14)).format('DD/MM/YYYY')
                                    }</span></div>
                                </div>
                                <Link to={'/professional/evaluations/update/' + evaluation.id}>
                                    <button className='btn btn-edit'><img src={edit} alt='Editar' /></button>
                                </Link>
                                <button className='btn btn-exclude' onClick={()=>{deleteEval(evaluation.id)}}><img src={exclude} alt='Excluir' /></button>
                            </div>
                            </>
                        )
                    })
                    :
                    <div className='list-empty'>
                        <img src={icon_alert_circle} alt="Alerta" />
                        <h1>Você ainda não possui nenhuma avaliação cadastrada...</h1>
                        <span>Adicione novas avaliações clicando no botão abaixo!</span>
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
                <ListEvaluations />
            </div>
            <div className='div-btn-add'>
                <Link to={'/professional/evaluations/create'}>
                    <button className='btn btn-add'>Adicionar<img src={plus} alt='Excluir' /></button>
                </Link>
            </div>
        </>
    )
}