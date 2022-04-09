import React from "react";
import './SideBar.scss';
import plus from '../images/plus.png';
import iconSearch from '../images/search-blue.png';

function ButtonSideBar(props) {
    function removeClassActive() {
        for (let i = 1; i < 6; i++) {
            var id = "btn-" + i;
            document.getElementById(id).parentNode.classList.remove('active');
        }
    }

    function activeButton(id) {
        removeClassActive();
        var element = document.getElementById(id).parentNode;
        element.classList.add('active');
    }

    const first = props.id === 'btn-1';
    return (
        <>
            { first ? (
                <div className="button-spacer active">
                    <button id={props.id} className='button-side-bar' onClick={() => activeButton(props.id)} type='button'>
                        <span>{props.label}</span>
                    </button>
                </div>
                ) : (
                <div className="button-spacer">
                    <button id={props.id} className='button-side-bar' onClick={() => activeButton(props.id)} type='button'>
                        <span>{props.label}</span>
                    </button>
                </div>
                )
            }
        </>
    )
}

function SearchPerson() {
    function returnPeople() {
        //Array estático até ter a consulta ao back-end
        var arrPeople = [
            {id: 0, firstName: 'Jaisson', lastName: 'Bassanesi'},
            {id: 1, firstName: 'Bernardo', lastName: 'Witkoski'},
            {id: 2, firstName: 'Diego', lastName: 'Gielda'},
            {id: 3, firstName: 'Matheus', lastName: 'Grigoleto'},
            {id: 4, firstName: 'Leonardo', lastName: 'Vicente'},
            {id: 5, firstName: 'Leonardo', lastName: 'Corrêa'},
            {id: 6, firstName: 'Vinicius', lastName: 'Trentin'},
            {id: 7, firstName: 'Bernardo', lastName: 'Barro'},
            {id: 8, firstName: 'Maicon', lastName: 'Miosso'},
            {id: 9, firstName: 'Caroline', lastName: 'Kolassa'},
            {id: 10, firstName: 'Pedro', lastName: 'Lucas Agostini'},
            {id: 11, firstName: 'João Vitor', lastName: 'Kichel'},
        ];
        return arrPeople;
    }

    return (
        <div className='sideBar-search'>
            <input className='input-search' placeholder='Pesquisar' type='text' />
            <img className='icon-search' src={iconSearch} alt='Icone de busca' />
            <div className='list-people'>
                {returnPeople().map((person, i) => {
                    return (<div className='item-person' key={person.id}>{person.firstName + ' ' + person.lastName}</div>)
                })}
            </div>
            <button className='button-add'>Adicionar<img className='img-plus' src={plus} alt='Mais'/></button>
        </div>
    )
}

const sideBar = () => {
    return (
        <div className='sideBar-container'>
            <div className='buttons-container'>
                <ButtonSideBar label={'Feed'} id={'btn-1'} />
                <ButtonSideBar label={'Alunos'} id={'btn-2'} />
                <ButtonSideBar label={'Avaliação Física'} id={'btn-3'} />
                <ButtonSideBar label={'Plano Alimentar'} id={'btn-4'} />
                <ButtonSideBar label={'Meu Cadastro'} id={'btn-5'} />
            </div>
            <SearchPerson />
        </div>
    )
}

export default sideBar;