import './SectionStudents.scss';
import { Link } from 'react-router-dom';
import plus from '../../images/plus.png';
import edit from '../../images/edit.png';
import exclude from '../../images/exclude.png';

export default function SectionStudents() {
    function ListStudents() {
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
            <>
                <div className='list-people'>
                    {returnPeople().map((person, i) => {
                        return (
                            <div className='student-line' key={'student-' + person.id}>
                                <div className='item-person'>
                                    <span>{person.firstName + ' ' + person.lastName}</span>
                                </div>
                                <button className='btn btn-edit'><img src={edit} alt='Editar' /></button>
                                <button className='btn btn-exclude'><img src={exclude} alt='Excluir' /></button>
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