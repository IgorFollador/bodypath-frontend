import './Cruds.scss';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Select from "react-select";
import ModalGeneric from '../../components/ModalGeneric';
import exclude from '../../images/exclude.png';
import plus from '../../images/plus.png';

export default function SectionFoodPlan() {
    const { id } = useParams();
    const { register, handleSubmit } = useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [arrFoods, setArrFoods] = useState([]);
    const [arrStudents, setArrStudents] = useState([]);
    const [arrPlans, setArrPlans] = useState([]);
    const [isEditing, setIsEditing] = useState(true);
    const [defaultValue, setDefaultValue] = useState(arrPlans[0]);
    //Essa chamada deverá ser alterada para o endpoint dos planos alimentares
    useEffect(() => {
        fetch('http://localhost:10000/customer/users/names')
            .then(response => response.json())
            .then(data => {
                var arrPlan = [];
                data.forEach(plan => {
                    arrPlan.push({value: plan.id, label:  plan.firstName + ' ' + plan.lastName})
                })
                setArrPlans(data);
                setArrStudents(arrPlan);
                setDefaultValue(arrPlan[0]);
            })
    }, [])
    
    useEffect(() => {
        if (id) {
            setIsEditing(true);
        } else {
            setIsEditing(false);
        }
    }, [id])

    const getFoods = () => {
        
    }

    const addMinLabel = (id, field) => {
        var input = document.getElementById(id);
        input.value.trim() !== '' ?
        input.classList.add('min-label') :
        input.classList.remove('min-label');
        // validateFileds(id, field);
    }

    return (
        <form>
            <div className='div-crud'>
                <div className="div-select-student">
                    {isEditing ? 
                        arrPlans.map(plan => {
                            return plan.id === parseInt(id) ? <h3>{plan.firstName + ' ' + plan.lastName + ':'}</h3> : null;
                        })
                        :
                        <>
                            <h3>Selecione o aluno:</h3>
                            <Select options={arrStudents} />
                        </>
                    }
                </div>
                <div className="div-define-meta div-double-input">
                    <div className='input-label-default'>
                        <input className='input-text-default' id='input-pro-plan-metabolicrate' fieldname='Taxa metabólica' onBlur={() => addMinLabel('input-pro-plan-metabolicrate', 'metabolicrate')} maxLength='7' readOnly />
                        <label htmlFor='input-pro-plan-metabolicrate'>Taxa metabólica (kcal)</label>
                    </div>
                    <div className='input-label-default'>
                        <input type='number' className='input-text-default' id='input-pro-plan-caloricvariation' fieldname='Variação calórica' onBlur={() => addMinLabel('input-pro-plan-caloricvariation', 'caloricvariation')} maxLength='7' />
                        <label htmlFor='input-pro-plan-caloricvariation'>Variação calórica (kcal)</label>
                    </div>
                </div>
                <div className="div-carbohydrates-calc">
                    <div className='input-label-default'>
                        <input className='input-text-default' id='input-pro-plan-carbohydrate' fieldname='Carboidrato' {...register("carbohydrate")} onBlur={() => addMinLabel('input-pro-plan-carbohydrate', 'carbohydrate')} maxLength='7' />
                        <label htmlFor='input-pro-plan-carbohydrate'>Carboidrato</label>
                    </div>
                    <div className='input-label-default'>
                        <input className='input-text-default' id='input-pro-plan-protein' fieldname='Proteína' {...register("protein")} onBlur={() => addMinLabel('input-pro-plan-protein', 'protein')} maxLength='7' />
                        <label htmlFor='input-pro-plan-protein'>Proteína</label>
                    </div>
                    <div className='input-label-default'>
                        <input className='input-text-default' id='input-pro-plan-fat' fieldname='Gordura' {...register("fat")} onBlur={() => addMinLabel('input-pro-plan-fat', 'fat')} maxLength='7' />
                        <label htmlFor='input-pro-plan-fat'>Gordura</label>
                    </div>
                </div>
                <tbody className='food-plan'>
                    <tr className={`line food-1 title-food`}>
                        <td className="item food__desc">Refeição I - Café da manhã</td>
                        <td className="item food__cal">Calorias<br/>kcal</td>
                        <td className="item food__carbs">Carboidratos<br/>g</td>
                        <td className="item food__fat">Gorduras<br/>g</td>
                        <td className="item food__protein">Proteínas<br/>g</td>
                    </tr>
                    <tr className="line food-2">
                        <td className="item food__desc">Maça - 1 unidade</td>
                        <td className="item food__cal">213</td>
                        <td className="item food__carbs">2</td>
                        <td className="item food__fat">16</td>
                        <td className="item food__protein">17</td>
                        <td className="item food__exclude"><a><img src={exclude} alt="Excluir" /></a></td>
                    </tr>
                    <tr className="line food-3">
                        <td className="item food__desc">Arroz - 110 gramas</td>
                        <td className="item food__cal">213</td>
                        <td className="item food__carbs">2</td>
                        <td className="item food__fat">16</td>
                        <td className="item food__protein">17</td>
                        <td className="item food__exclude"><a><img src={exclude} alt="Excluir" /></a></td>
                    </tr>
                    <tr className="line food-4">
                        <td className="item food__desc">Arroz - 110 gramas</td>
                        <td className="item food__cal">213</td>
                        <td className="item food__carbs">2</td>
                        <td className="item food__fat">16</td>
                        <td className="item food__protein">17</td>
                        <td className="item food__exclude"><a><img src={exclude} alt="Excluir" /></a></td>
                    </tr>
                    <tr className="line food-5">
                        <td className="item food__desc">Arroz - 110 gramas</td>
                        <td className="item food__cal">213</td>
                        <td className="item food__carbs">2</td>
                        <td className="item food__fat">16</td>
                        <td className="item food__protein">17</td>
                        <td className="item food__exclude"><a><img src={exclude} alt="Excluir" /></a></td>
                    </tr>
                    <tr className="line food-6">
                        <td className="item food__desc">Arroz - 110 gramas</td>
                        <td className="item food__cal">213</td>
                        <td className="item food__carbs">2</td>
                        <td className="item food__fat">16</td>
                        <td className="item food__protein">17</td>
                        <td className="item food__exclude"><a><img src={exclude} alt="Excluir" /></a></td>
                    </tr>
                    <tr className="line food-7 footer-food">
                        <td className='item food__desc'><a onClick={ () => setIsModalVisible(true) }>Adicionar alimento <img src={plus} alt="Adicionar" /></a></td>
                    </tr>


                    <tr className={`line food-8 title-food`}>
                        <td className="item food__desc">Refeição II - Lanche da manhã</td>
                    </tr>
                    <tr className="line food-9">
                        <td className="item food__desc">Maça - 1 unidade</td>
                        <td className="item food__cal">213</td>
                        <td className="item food__carbs">2</td>
                        <td className="item food__fat">16</td>
                        <td className="item food__protein">17</td>
                        <td className="item food__exclude"><a><img src={exclude} alt="Excluir" /></a></td>
                    </tr>
                    <tr className="line food-10 footer-food">
                        <td className='item food__desc'><a onClick={ () => setIsModalVisible(true) }>Adicionar alimento <img src={plus} alt="Adicionar" /></a></td>
                    </tr>


                    <tr className={`line food-11 title-food`}>
                        <td className="item food__desc">Refeição III - Almoço</td>
                    </tr>
                    {/* <tr className="line food-12">
                        <td className="item food__desc">Maça - 1 unidade</td>
                        <td className="item food__cal">213</td>
                        <td className="item food__carbs">2</td>
                        <td className="item food__fat">16</td>
                        <td className="item food__protein">17</td>
                        <td className="item food__exclude"><a><img src={exclude} alt="Excluir" /></a></td>
                    </tr> */}
                    <tr className="line food-13 footer-food">
                        <td className='item food__desc'><a onClick={ () => setIsModalVisible(true) }>Adicionar alimento <img src={plus} alt="Adicionar" /></a></td>
                    </tr>


                    <tr className={`line food-11 title-food`}>
                        <td className="item food__desc">Refeição IV - Lanche</td>
                    </tr>
                    {/* <tr className="line food-12">
                        <td className="item food__desc">Maça - 1 unidade</td>
                        <td className="item food__cal">213</td>
                        <td className="item food__carbs">2</td>
                        <td className="item food__fat">16</td>
                        <td className="item food__protein">17</td>
                        <td className="item food__exclude"><a><img src={exclude} alt="Excluir" /></a></td>
                    </tr> */}
                    <tr className="line food-13 footer-food">
                        <td className='item food__desc'><a onClick={ () => setIsModalVisible(true) }>Adicionar alimento <img src={plus} alt="Adicionar" /></a></td>
                    </tr>


                    <tr className={`line food-11 title-food`}>
                        <td className="item food__desc">Refeição V - Lanche</td>
                    </tr>
                    {/* <tr className="line food-12">
                        <td className="item food__desc">Maça - 1 unidade</td>
                        <td className="item food__cal">213</td>
                        <td className="item food__carbs">2</td>
                        <td className="item food__fat">16</td>
                        <td className="item food__protein">17</td>
                        <td className="item food__exclude"><a><img src={exclude} alt="Excluir" /></a></td>
                    </tr> */}
                    <tr className="line food-13 footer-food">
                        <td className='item food__desc'><a onClick={ () => setIsModalVisible(true) }>Adicionar alimento <img src={plus} alt="Adicionar" /></a></td>
                    </tr>


                    <tr className={`line food-11 title-food`}>
                        <td className="item food__desc">Refeição VI - Janta</td>
                    </tr>
                    {/* <tr className="line food-12">
                        <td className="item food__desc">Maça - 1 unidade</td>
                        <td className="item food__cal">213</td>
                        <td className="item food__carbs">2</td>
                        <td className="item food__fat">16</td>
                        <td className="item food__protein">17</td>
                        <td className="item food__exclude"><a><img src={exclude} alt="Excluir" /></a></td>
                    </tr> */}
                    <tr className="line food-13 footer-food">
                        <td className='item food__desc'><a onClick={ () => setIsModalVisible(true) }>Adicionar alimento <img src={plus} alt="Adicionar" /></a></td>
                    </tr>
                </tbody>
                {isModalVisible && <ModalGeneric onClose={ () => setIsModalVisible(false) }>
                    <div className="modal-search-food">
                        <div className="modal-search-food__header">
                            <h3>Buscar alimento por nome:</h3>
                            <div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-search-food' fieldname='Alimento' {...register("food")} onBlur={() => addMinLabel('input-search-food', 'food')} maxLength='255' />
                                    <label htmlFor='input-search-food'>Alimento...</label>
                                </div>
                                <button type='button' className="btn-search">Buscar</button>
                            </div>
                        </div>
                        <hr />
                        <div className="modal-search-food__body">
                            <div className='filter-foods'>
                                <ul className='filter-foods__list'>
                                    <li className='filter-foods__line pair'>
                                        <a>
                                            <h4>Frango Grelhado</h4>
                                            <p>Frango, 100g, 159 calorias</p>
                                        </a>
                                    </li>
                                    <li className='filter-foods__line'>
                                        <a>
                                            <h4>Frango Grelhado</h4>
                                            <p>Frango, 100g, 159 calorias</p>
                                        </a>
                                    </li>
                                    <li className='filter-foods__line pair'>
                                        <a>
                                            <h4>Frango Grelhado</h4>
                                            <p>Frango, 100g, 159 calorias</p>
                                        </a>
                                    </li>
                                    <li className='filter-foods__line'>
                                        <a>
                                            <h4>Frango Grelhado</h4>
                                            <p>Frango, 100g, 159 calorias</p>
                                        </a>
                                    </li>
                                    <li className='filter-foods__line pair'>
                                        <a>
                                            <h4>Frango Grelhado</h4>
                                            <p>Frango, 100g, 159 calorias</p>
                                        </a>
                                    </li>
                                    <li className='filter-foods__line'>
                                        <a>
                                            <h4>Frango Grelhado</h4>
                                            <p>Frango, 100g, 159 calorias</p>
                                        </a>
                                    </li>
                                    <li className='filter-foods__line pair'>
                                        <a>
                                            <h4>Frango Grelhado</h4>
                                            <p>Frango, 100g, 159 calorias</p>
                                        </a>
                                    </li>
                                    <li className='filter-foods__line'>
                                        <a>
                                            <h4>Frango Grelhado</h4>
                                            <p>Frango, 100g, 159 calorias</p>
                                        </a>
                                    </li>
                                    <li className='filter-foods__line pair'>
                                        <a>
                                            <h4>Frango Grelhado</h4>
                                            <p>Frango, 100g, 159 calorias</p>
                                        </a>
                                    </li>
                                    <li className='filter-foods__line'>
                                        <a>
                                            <h4>Frango Grelhado</h4>
                                            <p>Frango, 100g, 159 calorias</p>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    </ModalGeneric>}
            </div>
        </form>
    )
}