import './SideBar.scss';
import { Link } from 'react-router-dom';
import plus from '../images/plus.png';
import iconSearch from '../images/search-blue.png';
import React, { useEffect, useState } from 'react';

function ButtonSideBar(props) {
    function removeClassActive() {
        for (let i = 1; i < 6; i++) {
            var id = 'btn-' + i;
            document.getElementById(id).parentNode.parentNode.classList.remove('active');
        }
    }

    function activeButton(id) {
        removeClassActive();
        var element = document.getElementById(id).parentNode.parentNode;
        element.classList.add('active');
    }

    var classes = window.location.pathname.includes(props.path) ? 'button-spacer active' : 'button-spacer';
    return (
        <div className={classes}>
            <Link to={props.path}>
                <button id={props.id} className='button-side-bar' onClick={() => activeButton(props.id)} type='button'>
                    <span>{props.label}</span>
                </button>
            </Link>
        </div>
    )
}

function SearchPerson() {
    //Array estático até ter a consulta ao back-end
    const [arrPeople, setArrPeople] = useState([]);

    useEffect(() => {
        fetch('http://localhost:10000/customer/users/names', {
            headers: {
                'Authorization': localStorage.getItem("@Auth:token")
            }, 
        })
            .then(response => response.json())
            .then(data => {setArrPeople(data)})
    }, [])

    const redirectUpdate = (id) => {
        window.location.href = '/professional/students/update/' + id;
    }

    const redirectCreate = () => {
        window.location.href = '/professional/students/create';
        setTimeout(()=>{
            window.location.reload();
        }, 200)
    }

    return (
        <div className='sideBar-search'>
            <input className='input-search' placeholder='Pesquisar' type='text' />
            <img className='icon-search' src={iconSearch} alt='Icone de busca' />
            <div className='list-people'>
                {arrPeople.map((person, i) => {
                    return (<div className='item-person' onDoubleClick={()=>{redirectUpdate(person.id)}} key={'min-student-' + person.id}>{person.firstName + ' ' + person.lastName}</div>)
                })}
            </div>
            <button className='button-add' onClick={redirectCreate}>Adicionar<img className='img-plus' src={plus} alt='Mais'/></button>
        </div>
    )
}

const sideBar = () => {
    return (
        <div className='sideBar-container'>
            <div className='buttons-container'>
                <ButtonSideBar label={'Feed'} id={'btn-1'} path={'/professional/feed'} />
                <ButtonSideBar label={'Alunos'} id={'btn-2'} path={'/professional/students'} />
                <ButtonSideBar label={'Avaliação Física'} id={'btn-3'} path={'/professional/evaluations'} />
                <ButtonSideBar label={'Plano Alimentar'} id={'btn-4'} path={'/professional/plans'} />
                <ButtonSideBar label={'Meu Cadastro'} id={'btn-5'} path={'/professional/cadastre'} />
            </div>
            <SearchPerson />
        </div>
    )
}

export default sideBar;