import './ProfessionalSections.scss';
import { Link } from 'react-router-dom';
import plus from '../../images/plus.png';
import edit from '../../images/edit.png';
import exclude from '../../images/exclude.png';
import icon_alert_circle from '../../images/icon-alert-circle.png';
import React, { useEffect, useState } from 'react';

export default function SectionFoodPlan() {
    function ListFoodPlans() {
        //Array estático até ter a consulta ao back-end
        const [arrFoodPlans, setArrFoodPlans] = useState([{}]);

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
            setArrFoodPlans(props);
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
                const arrRefresh = arrFoodPlans.filter(evaluation => {
                    return evaluation.id !== id;
                });
                setArrFoodPlans(arrRefresh);
            })
            .catch(error => {
                console.error("Error on delete evaluation:", error)
            });
        }

        const redirectUpdate = (id) => {
            window.location.href = '/professional/plans/update/' + id;
        }

        return (
            <>
                <div className='list-things'>
                    {arrFoodPlans.length > 0 ?
                    arrFoodPlans.map(plan => {
                        return (
                            <div className='list-line' key={'plan-' + plan.id}>
                                <div className='item-list' onDoubleClick={()=>{redirectUpdate(plan.id)}}>
                                    <div className='div-plan-list'><span>{plan.firstName + ' ' + plan.lastName}</span></div>
                                    <div><span>08/06/2022</span></div>
                                </div>
                                <Link to={'/professional/plans/update/' + plan.id}>
                                    <button className='btn btn-edit'><img src={edit} alt='Editar' /></button>
                                </Link>
                                <button className='btn btn-exclude' onClick={()=>{deleteEval(plan.id)}}><img src={exclude} alt='Excluir' /></button>
                            </div>
                        )
                    })
                    :
                    <div className='list-empty'>
                        <img src={icon_alert_circle} alt="Alerta" />
                        <h1>Você ainda não possui nenhum plano cadastrado...</h1>
                        <span>Adicione novos planos clicando no botão abaixo!</span>
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
                <ListFoodPlans />
            </div>
            <div className='div-btn-add'>
                <Link to={'/professional/plans/create'}>
                    <button className='btn btn-add'>Adicionar<img src={plus} alt='Excluir' /></button>
                </Link>
            </div>
        </>
    )
}