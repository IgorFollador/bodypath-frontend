import './SectionStudents.scss';
import { Link } from 'react-router-dom';
import plus from '../../images/plus.png';
import edit from '../../images/edit.png';
import exclude from '../../images/exclude.png';
import React, { useEffect, useState } from 'react';

export default function SectionStudents() {
    function ListEvaluations() {
        //Array estático até ter a consulta ao back-end
        const [arrEval, setArrEval] = useState([]);

        useEffect(() => {
            fetch('http://localhost:3001/evaluations/names')
                .then(response => response.json())
                .then(data => {arr(data)})
        }, [])

        const arr = props => {
            setArrEval(props);
        }

        const deleteEval = id => {
            fetch('http://localhost:3001/evaluations/' + id, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
                const arrRefresh = arrEval.filter(evaluation => {
                    return evaluation.id !== id;
                });
                console.log('arr:', arrRefresh)
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
                <div className='list-people'>
                    {arrEval.map(evaluation => {
                        return (
                            <div className='student-line' key={'student-' + evaluation.id}>
                                <div className='item-person' onDoubleClick={()=>{redirectUpdate(evaluation.id)}}>
                                    <span>{evaluation.firstName + ' ' + evaluation.lastName}</span>
                                </div>
                                <Link to={'/professional/evaluations/update/' + evaluation.id}>
                                    <button className='btn btn-edit'><img src={edit} alt='Editar' /></button>
                                </Link>
                                <button className='btn btn-exclude' onClick={()=>{deleteEval(evaluation.id)}}><img src={exclude} alt='Excluir' /></button>
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
                <Link to={'/professional/evaluation/create'}>
                    <button className='btn btn-add'>Adicionar<img src={plus} alt='Excluir' /></button>
                </Link>
            </div>
        </>
    )
}