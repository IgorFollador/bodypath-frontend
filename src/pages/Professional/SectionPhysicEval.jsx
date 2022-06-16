import './ProfessionalSections.scss';
import { Link } from 'react-router-dom';
import plus from '../../images/plus.png';
import edit from '../../images/edit.png';
import exclude from '../../images/exclude.png';
import React, { useEffect, useState } from 'react';
import Moment from 'moment';

export default function SectionPhysicEval() {
    function ListEvaluations() {
        //Array estático até ter a consulta ao back-end
        const [arrEval, setArrEval] = useState([]);
        const [arrPeople, setArrPeople] = useState([]);
        
        useEffect(() => {
            fetch('http://localhost:10000/phyisical_evaluation/evaluations')
            .then(response => response.json())
            .then(data => {arr(data)})
        }, [])
        
        useEffect(() => {
            fetch('http://localhost:10000/customer/users')
            .then(response => response.json())
            .then(data => {
                var arrBuffer = [];
                data.forEach(user => {
                    var userData = {'id': user.id, 'fullName': user.firstName + ' ' + user.lastName};
                    arrBuffer.push(userData);
                });
                setArrPeople(arrBuffer);
            })
        }, [])

        const arr = props => {
            setArrEval(props);
        }

        const deleteEval = id => {
            fetch('http://localhost:10000/phyisical_evaluation/evaluations/' + id, {
                method: 'DELETE',
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
                    {arrEval.map(evaluation => {
                        return (
                            <div className='list-line' key={'eval-' + evaluation._id}>
                                <div className='item-list' onDoubleClick={()=>{redirectUpdate(evaluation._id)}}>
                                    <div className='eval-list'>
                                    {
                                        arrPeople.length > 0 &&
                                        <span>{arrPeople.map(user => {
                                            if (user.id === evaluation.user_id) {
                                                return user.fullName;
                                            }
                                        })}
                                        </span>
                                    }
                                    </div>
                                    <div>
                                        <span>{ Moment(evaluation.createdAt.slice(0, -14).replace(/-/gi, '')).format('DD/MM/YYYY') }</span>
                                    </div>
                                </div>
                                <Link to={'/professional/evaluations/update/' + evaluation._id}>
                                    <button className='btn btn-edit'><img src={edit} alt='Editar' /></button>
                                </Link>
                                <button className='btn btn-exclude' onClick={() => {deleteEval(evaluation._id)}}><img src={exclude} alt='Excluir' /></button>
                            </div>
                        )
                    })}
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