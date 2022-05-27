import './SectionStudents.scss';
import { Link } from 'react-router-dom';
import plus from '../../images/plus.png';
import edit from '../../images/edit.png';
import exclude from '../../images/exclude.png';
import React, { useEffect, useState } from 'react';

export default function SectionStudents() {
    function ListStudents() {
        //Array estático até ter a consulta ao back-end
        const [arrPeople, setArrPeople] = useState([]);
        
        useEffect(() => {
            fetch('http://localhost:3001/users')
                .then(response => response.json())
                .then(data => {arr(data)})
        }, [])

        const arr = props => {
            setArrPeople(props);
        }

        const deleteUser = (id) => {
            fetch('http://localhost:3001/users/' + id, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
                const arrRefresh = arrPeople.filter(user => {
                    return user.id !== id;
                });
                console.log('arr:', arrRefresh)
                setArrPeople(arrRefresh);
            })
            .catch(error => {
                console.error("Error on delete user:", error)
            });
        }

        return (
            <>
                <div className='list-people'>
                    {arrPeople.map(person => {
                        return (
                            <div className='student-line' key={'student-' + person.id}>
                                <div className='item-person'>
                                    <span>{person.firstName + ' ' + person.lastName}</span>
                                </div>
                                <Link to={'/professional/students/update/' + person.id}>
                                    <button className='btn btn-edit'><img src={edit} alt='Editar' /></button>
                                </Link>
                                <button className='btn btn-exclude' onClick={()=>{deleteUser(person.id)}}><img src={exclude} alt='Excluir' /></button>
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