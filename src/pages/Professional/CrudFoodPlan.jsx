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
    const [isModalSearchVisible, setIsModalSearchVisible] = useState(false);
    const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false);
    const [foodAdd, setFoodAdd] = useState({});
    const [arrStudents, setArrStudents] = useState([]);
    const [arrPlans, setArrPlans] = useState([]);
    const [isEditing, setIsEditing] = useState(true);
    const [filterFoods, setFilterFoods] = useState([]);
    //Essa chamada deverá ser alterada para o endpoint dos planos alimentares
    useEffect(() => {
        fetch('http://localhost:10000/customer/users/names', {
            headers: {
                'Authorization': localStorage.getItem("@Auth:token")
            }, 
        })
        .then(response => response.json())
        .then(data => {
            var arrPlan = [];
            data.forEach(plan => {
                arrPlan.push({value: plan.id, label:  plan.firstName + ' ' + plan.lastName})
            })
            setArrPlans(data);
            setArrStudents(arrPlan);
        })
    }, [])
    
    useEffect(() => {
        if (id) {
            setIsEditing(true);
        } else {
            setIsEditing(false);
        }
    }, [id])

    const preventEnter = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (isModalSearchVisible) searchFood();
        }
    }
    
    const searchFood = () => {
        var value = document.getElementById('input-search-food').value;
        if (value !== '') {
            fetch('https://api-tacobp.herokuapp.com/api/v1/foods?search=' + value, {
                headers: {
                    'Authorization': localStorage.getItem("@Auth:token")
                }, 
            })
            .then(response => response.json())
            .then(data => {
                setFilterFoods(data);
            })
        }
    }

    const closeSearchModal = () => {
        document.getElementById('input-search-food').value = '';
        setFilterFoods([]);
        setIsModalSearchVisible(false);
    }

    const closeConfirmModal = () => {
        setFoodAdd({});
        setIsModalConfirmVisible(false);
    }

    const openConfirmModal = food => {
        setFoodAdd(food);
        setIsModalConfirmVisible(true);
        closeSearchModal();
    }

    const backToSearchModal = () => {
        closeConfirmModal();
        setIsModalSearchVisible(true);
    }

    const calcFoodAttributes = () => {
        addMinLabel('input-pro-food-unid', 'unid');
        var multiplier = parseFloat(document.getElementById('input-pro-food-unid').value);
        const qntbase = !isNaN(foodAdd.base_qty) ? foodAdd.base_qty * multiplier : 0;
        const carbohydrate = !isNaN(foodAdd.attributes.carbohydrate.qty) ? foodAdd.attributes.carbohydrate.qty * multiplier : 0;
        const protein = !isNaN(foodAdd.attributes.protein.qty) ? foodAdd.attributes.protein.qty * multiplier : 0;
        const lipid = !isNaN(foodAdd.attributes.lipid.qty) ? foodAdd.attributes.lipid.qty * multiplier : 0;
        const energy = !isNaN(foodAdd.attributes.energy.kcal) ? foodAdd.attributes.energy.kcal * multiplier : 0;
        //retornar o calculo para o post que vai registrar o alimento no back
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
                <table>
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
                        <td className='item food__desc'><a onClick={ () => setIsModalSearchVisible(true) }>Adicionar alimento <img src={plus} alt="Adicionar" /></a></td>
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
                        <td className='item food__desc'><a onClick={ () => setIsModalSearchVisible(true) }>Adicionar alimento <img src={plus} alt="Adicionar" /></a></td>
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
                        <td className='item food__desc'><a onClick={ () => setIsModalSearchVisible(true) }>Adicionar alimento <img src={plus} alt="Adicionar" /></a></td>
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
                        <td className='item food__desc'><a onClick={ () => setIsModalSearchVisible(true) }>Adicionar alimento <img src={plus} alt="Adicionar" /></a></td>
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
                        <td className='item food__desc'><a onClick={ () => setIsModalSearchVisible(true) }>Adicionar alimento <img src={plus} alt="Adicionar" /></a></td>
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
                        <td className='item food__desc'><a onClick={ () => setIsModalSearchVisible(true) }>Adicionar alimento <img src={plus} alt="Adicionar" /></a></td>
                    </tr>
                </tbody>
                </table>
                {isModalSearchVisible && <ModalGeneric onClose={ closeSearchModal }>
                    <div className="modal-search-food" onKeyDown={ preventEnter }>
                        <div className="modal-search-food__header">
                            <h3>Buscar alimento por nome:</h3>
                            <div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-search-food' fieldname='Alimento' maxLength='255' placeholder='Alimento...'/>
                                </div>
                                <button type='button' className="btn-search" id='btn-search' onClick={ searchFood }>Buscar</button>
                            </div>
                        </div>
                        <hr />
                        <div className="modal-search-food__body">
                            <div className='filter-foods'>
                                <ul className='filter-foods__list'>
                                    {filterFoods.map((food, idx) => {
                                        return idx % 2 === 0 ?
                                        <li className='filter-foods__line pair' key={ 'food-' + food.id } onClick={ () => openConfirmModal(food) }>
                                            <a>
                                                <h4>{food.description}</h4>
                                                <p>{food.base_qty + food.base_unit}</p>
                                            </a>
                                        </li>
                                        :
                                        <li className='filter-foods__line' key={ 'food-' + food.id } onClick={ () => openConfirmModal(food) }>
                                            <a>
                                                <h4>{food.description}</h4>
                                                <p>{food.base_qty + food.base_unit}</p>
                                            </a>
                                        </li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </ModalGeneric>}
                {isModalConfirmVisible && <ModalGeneric onClose={ closeConfirmModal }>
                    <div className="modal-confirm-food" onKeyDown={ preventEnter }>
                        <div className="modal-confirm-food__header">
                            <h3>{`Id: ${foodAdd.id} | ${foodAdd.description}`}</h3>
                        </div>
                        <hr />
                        <div className="modal-confirm-food__body">
                            <div className='data-food'>
                                <div className='input-label-default'>
                                    <div className='input-text-default' id='input-pro-food-qntbase' fieldname='Quantidade base' {...register("qntbase")} onBlur={() => addMinLabel('input-pro-food-qntbase', 'qntbase')} >
                                        {foodAdd.base_qty.toFixed(2) + ` (${foodAdd.base_unit})`}
                                    </div>
                                    <label htmlFor='input-pro-food-qntbase'>Quantidade base</label>
                                </div>
                                <div className='input-label-default'>
                                    <div className='input-text-default' id='input-pro-food-carbo' fieldname='Carboidrato' {...register("carbo")} onBlur={() => addMinLabel('input-pro-food-carbo', 'carbo')} >
                                        {(!isNaN(foodAdd.attributes.carbohydrate.qty) ? foodAdd.attributes.carbohydrate.qty.toFixed(2) : 0) + ` (${foodAdd.attributes.carbohydrate.unit})`}
                                    </div>
                                    <label htmlFor='input-pro-food-carbo'>Carboidrato</label>
                                </div>
                                <div className='input-label-default'>
                                    <div className='input-text-default' id='input-pro-food-prot' fieldname='Proteína' {...register("qntbase")} {...register("prot")} onBlur={() => addMinLabel('input-pro-food-prot', 'prot')} >
                                        {(!isNaN(foodAdd.attributes.protein.qty) ? foodAdd.attributes.protein.qty.toFixed(2) : 0) + ` (${foodAdd.attributes.protein.unit})`}
                                    </div>
                                    <label htmlFor='input-pro-food-prot'>Proteína</label>
                                </div>
                                <div className='input-label-default'>
                                    <div className='input-text-default' id='input-pro-food-obesity' fieldname='Gordura' {...register("obesity")} onBlur={() => addMinLabel('input-pro-food-obesity', 'obesity')} >
                                        {(!isNaN(foodAdd.attributes.lipid.qty) ? foodAdd.attributes.lipid.qty.toFixed(2) : 0) + ` (${foodAdd.attributes.lipid.unit})`}
                                    </div>
                                    <label htmlFor='input-pro-food-obesity'>Gordura</label>
                                </div>
                                <div className='input-label-default'>
                                    <div className='input-text-default' id='input-pro-food-calorie' fieldname='Caloria' {...register("calorie")} onBlur={() => addMinLabel('input-pro-food-calorie', 'calorie')} >
                                        {(!isNaN(foodAdd.attributes.energy.kcal) ? foodAdd.attributes.energy.kcal.toFixed(2) : 0) + ' (kcal)'}
                                    </div>
                                    <label htmlFor='input-pro-food-calorie'>Caloria</label>
                                </div>
                            </div>
                            <div className='save-food'>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-food-unid' type='number' max='100' step='0.1' min='0.1' fieldname='Unidades' onBlur={ calcFoodAttributes } />
                                    <label htmlFor='input-pro-food-unid'>Unidades</label>
                                </div>
                                <div className='save-food-buttons'>
                                    <button type='button' className="btn-confirm-food" id='btn-confirm-food'>Adicionar</button>
                                    <button type='button' className="btn-back-modal" id='btn-back-modal' onClick={ backToSearchModal }>Voltar à busca</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalGeneric>}
            </div>
        </form>
    )
}