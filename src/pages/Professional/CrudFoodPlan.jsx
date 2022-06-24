import './Cruds.scss';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Select from "react-select";
import ModalGeneric from '../../components/ModalGeneric';
import exclude from '../../images/exclude.png';
import plus from '../../images/plus.png';
import icon_check_circle from '../../images/icon-check-circle.png';
import icon_alert_circle from '../../images/icon-alert-circle.png';

export default function SectionFoodPlan() {
    const { id } = useParams();
    const { register, handleSubmit } = useForm();
    const [isModalSearchVisible, setIsModalSearchVisible] = useState(false);
    const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false);
    const [foodAdd, setFoodAdd] = useState({});
    const [arrStudents, setArrStudents] = useState([]);
    const [isEditing, setIsEditing] = useState(true);
    const [filterFoods, setFilterFoods] = useState([]);
    const [isFoodsVisible, setIsFoodsVisible] = useState(false);
    const [nameUserEditing, setNameUserEditing] = useState('');
    const [studentNewPlan, setStudentNewPlan] = useState(null);
    const [foodsOnPlan, setFoodsOnPlan] = useState([]);
    const [isModalOkPlanVisible, setIsModalOkPlanVisible] = useState(false);
    const [isModalNotOkPlanVisible, setIsModalNotOkPlanVisible] = useState(false);
    const [planFoodContextId, setPlanFoodContextId] = useState(0);
    const [planContextData, setPlanContextData] = useState({});
    const [mealContext, setMealContext] = useState(0);
    const [isModalFoodAddedVisible, setIsModalFoodAddedVisible] = useState(false);
    const [isModalFoodNotAddedVisible, setIsModalFoodNotAddedVisible] = useState(false);
    const [foodsCalcTotals, setFoodsCalcTotals] = useState([]);
    const [carbohydratesGoal, setCarbohydratesGoal] = useState(1);
    const professionalId = localStorage.getItem("@Auth:professional_id");
    const idsFields = ['input-pro-plan-metabolicrate', 'input-pro-plan-caloricvariation', 'input-pro-plan-carbohydrate', 'input-pro-plan-protein', 'input-pro-plan-fat'];
    // let caloriesTotal = 0;
    let carbohydratesTotal = 0;
    let fatTotal = 0;
    let proteinTotal = 0;
    //Essa chamada deverá ser alterada para o endpoint dos planos alimentares
    useEffect(() => {
        fetch('http://localhost:10000/customer/clients/names/professional/' + professionalId, {
            headers: {
                'Authorization': localStorage.getItem("@Auth:token")
            },
        })
        .then(response => response.json())
        .then(data => {
            var arrPeople = [];
            data.forEach(person => {
                arrPeople.push({value: person.id, label:  person.User.firstName + ' ' + person.User.lastName})
            })
            setArrStudents(arrPeople);
        })
    }, [])

    useEffect(() => {
        fetch('http://localhost:10000/food_plan/foods/plan/' + planFoodContextId, {
            headers: {
                'Authorization': localStorage.getItem("@Auth:token")
            },
        })
        .then(response => response.json())
        .then(data => {
            let objTotal = {};
            let caloriesTotal = 0;
            let carbohydratesTotal = 0;
            let fatTotal = 0;
            let proteinTotal = 0;
            data.map((food, idx) => {
                caloriesTotal += food.kcal;
                carbohydratesTotal += food.carbohydrate;
                fatTotal += food.lipid;
                proteinTotal += food.protein;
            })
            objTotal.kcal = caloriesTotal.toFixed(2);
            objTotal.carbohydrate = carbohydratesTotal.toFixed(2);
            objTotal.lipid = fatTotal.toFixed(2);
            objTotal.protein = proteinTotal.toFixed(2);
            console.log("OBJETO TOTAL", objTotal)
            setFoodsCalcTotals(objTotal);
        })
    }, [planFoodContextId])

    const spreadUserData = () => {
        fetch('http://localhost:10000/food_plan/plans/' + id, {
            headers: {
                'Authorization': localStorage.getItem("@Auth:token")
            }, 
        })
        .then(response => response.json())
        .then(data => {
            console.log("PLANO", data)
            console.log("PLANO", data.Plan)
            console.log("FOOD", data.Foods)
            setFoodsOnPlan(data.Foods);
            setPlanContextData(data.Plan);
            setNameUserEditing(data.Plan.Client.User.firstName + ' ' + data.Plan.Client.User.lastName);
            let carb = (Math.abs((parseFloat(data.Plan.bmr) + parseFloat(data.Plan.calor_variation)) - ((parseFloat(data.Plan.protein) * parseFloat(data.Plan.body_mass) * 4) + (parseFloat(data.Plan.fat) * parseFloat(data.Plan.body_mass) * 9))) / 4 / parseFloat(data.Plan.body_mass)).toFixed(2);
            setCarbohydratesGoal(carb);
            const rateDatas = [data.Plan.bmr, data.Plan.calor_variation, data.Plan.body_mass];
            const calorieDatas = [carb, data.Plan.protein, data.Plan.fat];
            const divsRateData = document.querySelector('.div-define-meta').children;
            const divsCaloriesData = document.querySelector('.div-carbohydrates-calc').children;

            for (let i = 0; i < divsRateData.length; i++) {
                divsRateData[i].children[0].value = rateDatas[i].toString();
                divsRateData[i].children[0].classList.add('min-label');
            }
            
            for (let i = 0; i < divsCaloriesData.length; i++) {
                divsCaloriesData[i].children[0].value = calorieDatas[i].toString();
                divsCaloriesData[i].children[0].classList.add('min-label');
            }
        })
    }
    
    useEffect(() => {
        if (id) {
            setPlanFoodContextId(id);
            setIsEditing(true);
            spreadUserData();
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
        console.log("Foodida", food)
        setFoodAdd(food);
        setIsModalConfirmVisible(true);
        closeSearchModal();
    }

    const backToSearchModal = () => {
        closeConfirmModal();
        setIsModalSearchVisible(true);
    }

    const calcFoodAttributes = () => {
        // addMinLabel('input-pro-food-unity', 'unity');
        // var multiplier = parseFloat(document.getElementById('input-pro-food-unity').value);
        // const qntbase = !isNaN(foodAdd.base_qty) ? foodAdd.base_qty * multiplier : 0;
        // const carbohydrate = !isNaN(foodAdd.attributes.carbohydrate.qty) ? foodAdd.attributes.carbohydrate.qty * multiplier : 0;
        // const protein = !isNaN(foodAdd.attributes.protein.qty) ? foodAdd.attributes.protein.qty * multiplier : 0;
        // const lipid = !isNaN(foodAdd.attributes.lipid.qty) ? foodAdd.attributes.lipid.qty * multiplier : 0;
        // const energy = !isNaN(foodAdd.attributes.energy.kcal) ? foodAdd.attributes.energy.kcal * multiplier : 0;
        // //retornar o calculo para o post que vai registrar o alimento no back
    }

    const addMinLabel = (id, field) => {
        var input = document.getElementById(id);
        input.value.trim() !== '' ?
        input.classList.add('min-label') :
        input.classList.remove('min-label');
        // validateFileds(id, field);
    }

    const changeStudent = e => {
        setStudentNewPlan(e.value);
    }

    const submitForm = data => {
        data.client_id = studentNewPlan;
        data.professional_id = professionalId;
        let carb = Math.abs((parseFloat(data.bmr) + parseFloat(data.calor_variation)) - ((parseFloat(data.protein) * parseFloat(data.body_mass) * 4) + (parseFloat(data.fat) * parseFloat(data.body_mass) * 9))) / 4;
        document.getElementById('input-pro-plan-carbohydrate').value = carb;
        fetch('http://localhost:10000/food_plan/plans/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("@Auth:token")
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok) {
                setIsModalOkPlanVisible(true);
                setIsFoodsVisible(true);
            } else {
                setIsModalNotOkPlanVisible(true);
            }
            return response.json();
        }).then(data => {
            console.log("RESPONSE", data)
            setPlanFoodContextId(data.id);
        })
    }

    const submitFood = e => {
        const unit = document.getElementById('input-pro-food-unity').value;
        console.log(parseFloat(unit))
        let objFood = {}
        objFood.unit = unit;
        objFood.descr_nutirment = foodAdd.description;
        objFood.carbohydrate = ((foodAdd.attributes.carbohydrate) ? (foodAdd.attributes.carbohydrate.qty ? foodAdd.attributes.carbohydrate.qty * unit : 0) : 0).toFixed(2);
        objFood.protein = ((foodAdd.attributes.protein) ? (foodAdd.attributes.protein.qty ? foodAdd.attributes.protein.qty * unit : 0) : 0).toFixed(2);
        objFood.lipid = ((foodAdd.attributes.lipid) ? ((foodAdd.attributes.lipid.qty && !isNaN(foodAdd.attributes.lipid.qty)) ? foodAdd.attributes.lipid.qty * unit : 0) : 0).toFixed(2);
        objFood.kcal = ((foodAdd.attributes.energy) ? (foodAdd.attributes.energy.kcal ? foodAdd.attributes.energy.kcal * unit : 0) : 0).toFixed(2);
        objFood.nutriment_id = foodAdd.id;
        objFood.foodPlan_id = planFoodContextId;
        objFood.meal_id = mealContext;
        console.log(e)
        console.log("FOOD ADD", foodAdd)
        console.log("FOOD OBJ", objFood)
        fetch('http://localhost:10000/food_plan/foods/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("@Auth:token")
            },
            body: JSON.stringify(objFood)
        }).then(response => {
            if (response.ok) {
                setIsModalFoodAddedVisible(true);
            } else {
                setIsModalFoodNotAddedVisible(true);
            }
            setIsModalConfirmVisible(false);
        })
    }

    const deleteFoodOfPlan = id => {
        console.log(id)
        fetch('http://localhost:10000/food_plan/foods/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("@Auth:token")
            },
        }).then(response => {window.location.reload()})
    }

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <div className='div-crud'>
                <div className="div-select-student">
                    {isEditing ?
                        <h1>{nameUserEditing}</h1>
                        :
                        <>
                            <h3>Selecione o aluno:</h3>
                            <Select options={arrStudents} onChange={ changeStudent } />
                        </>
                    }
                </div>
                <div className="div-define-meta div-double-input">
                    <div className='input-label-default'>
                        <input className='input-text-default' id='input-pro-plan-metabolicrate' fieldname='Taxa metabólica' {...register("bmr")} onBlur={() => addMinLabel('input-pro-plan-metabolicrate', 'metabolicrate')} maxLength='7' />
                        <label htmlFor='input-pro-plan-metabolicrate'>Taxa metabólica (kcal)</label>
                    </div>
                    <div className='input-label-default'>
                        <input type='number' className='input-text-default' id='input-pro-plan-caloricvariation' fieldname='Variação calórica' {...register("calor_variation")} onBlur={() => addMinLabel('input-pro-plan-caloricvariation', 'caloricvariation')} maxLength='7' />
                        <label htmlFor='input-pro-plan-caloricvariation'>Variação calórica (kcal)</label>
                    </div>
                    <div className='input-label-default'>
                        <input className='input-text-default' id='input-pro-plan-leanmass' fieldname='Massa magra' {...register("body_mass")} onBlur={() => addMinLabel('input-pro-plan-leanmass', 'leanmass')} maxLength='7' />
                        <label htmlFor='input-pro-plan-leanmass'>Massa magra (kg)</label>
                    </div>
                </div>
                <div className="div-carbohydrates-calc">
                    <div className='input-label-default'>
                        <input className='input-text-default' id='input-pro-plan-carbohydrate' fieldname='Carboidrato' onBlur={() => addMinLabel('input-pro-plan-carbohydrate', 'carbohydrate')} maxLength='7' readOnly />
                        <label htmlFor='input-pro-plan-carbohydrate'>Carboidrato (g/kg)</label>
                    </div>
                    <div className='input-label-default'>
                        <input className='input-text-default' id='input-pro-plan-protein' fieldname='Proteína' {...register("protein")} onBlur={() => addMinLabel('input-pro-plan-protein', 'protein')} maxLength='7' />
                        <label htmlFor='input-pro-plan-protein'>Proteína (g/kg)</label>
                    </div>
                    <div className='input-label-default'>
                        <input className='input-text-default' id='input-pro-plan-fat' fieldname='Gordura' {...register("fat")} onBlur={() => addMinLabel('input-pro-plan-fat', 'fat')} maxLength='7' />
                        <label htmlFor='input-pro-plan-fat'>Gordura (g/kg)</label>
                    </div>
                </div>
                {!isFoodsVisible && !isEditing &&
                <div className='button-centralize'>
                    <button type='submit' className='btn btn-save'>Salvar</button>
                </div>
                }
                {((isFoodsVisible && !isEditing) || isEditing) &&
                <div>
                    <table>
                    <tbody className='food-plan'>
                        <tr className={`line food-1 title-food`}>
                            <td className="item food__desc">Refeição I - Café da manhã</td>
                            <td className="item food__cal">Calorias<br/>kcal</td>
                            <td className="item food__carbs">Carboidratos<br/>g</td>
                            <td className="item food__fat">Gorduras<br/>g</td>
                            <td className="item food__protein">Proteínas<br/>g</td>
                        </tr>
                        {foodsOnPlan.map(food => {
                            if (food.meal_id === 1) {
                                return (
                                <tr className="line">
                                    <td className="item food__desc">{food.descr_nutirment}</td>
                                    <td className="item food__cal">{food.kcal}</td>
                                    <td className="item food__carbs">{food.carbohydrate}</td>
                                    <td className="item food__fat">{food.lipid}</td>
                                    <td className="item food__protein">{food.protein}</td>
                                    <td className="item food__exclude"><a onClick={ () => {deleteFoodOfPlan(food.id)} }><img src={exclude} alt="Excluir" /></a></td>
                                </tr>
                                )
                            }
                        })
                        }
                        <tr className="line food-7 footer-food">
                            <td className='item food__desc'><a onClick={ () => {setIsModalSearchVisible(true); setMealContext(1)} }>Adicionar alimento <img src={plus} alt="Adicionar" /></a></td>
                        </tr>


                        <tr className={`line food-8 title-food`}>
                            <td className="item food__desc">Refeição II - Lanche da manhã</td>
                        </tr>
                        {foodsOnPlan.map(food => {
                            if (food.meal_id === 2) {
                                return (
                                <tr className="line">
                                    <td className="item food__desc">{food.descr_nutirment}</td>
                                    <td className="item food__cal">{food.kcal}</td>
                                    <td className="item food__carbs">{food.carbohydrate}</td>
                                    <td className="item food__fat">{food.lipid}</td>
                                    <td className="item food__protein">{food.protein}</td>
                                    <td className="item food__exclude"><a onClick={ () => {deleteFoodOfPlan(food.id)} }><img src={exclude} alt="Excluir" /></a></td>
                                </tr>
                                )
                            }
                        })
                        }
                        <tr className="line food-10 footer-food">
                            <td className='item food__desc'><a onClick={ () => {setIsModalSearchVisible(true); setMealContext(2)} }>Adicionar alimento <img src={plus} alt="Adicionar" /></a></td>
                        </tr>


                        <tr className={`line food-11 title-food`}>
                            <td className="item food__desc">Refeição III - Almoço</td>
                        </tr>
                        {foodsOnPlan.map(food => {
                            if (food.meal_id === 3) {
                                return (
                                <tr className="line">
                                    <td className="item food__desc">{food.descr_nutirment}</td>
                                    <td className="item food__cal">{food.kcal}</td>
                                    <td className="item food__carbs">{food.carbohydrate}</td>
                                    <td className="item food__fat">{food.lipid}</td>
                                    <td className="item food__protein">{food.protein}</td>
                                    <td className="item food__exclude"><a onClick={ () => {deleteFoodOfPlan(food.id)} }><img src={exclude} alt="Excluir" /></a></td>
                                </tr>
                                )
                            }
                        })
                        }
                        <tr className="line food-13 footer-food">
                            <td className='item food__desc'><a onClick={ () => {setIsModalSearchVisible(true); setMealContext(3)} }>Adicionar alimento <img src={plus} alt="Adicionar" /></a></td>
                        </tr>


                        <tr className={`line food-11 title-food`}>
                            <td className="item food__desc">Refeição IV - Lanche</td>
                        </tr>
                        {foodsOnPlan.map(food => {
                            if (food.meal_id === 4) {
                                return (
                                <tr className="line">
                                    <td className="item food__desc">{food.descr_nutirment}</td>
                                    <td className="item food__cal">{food.kcal}</td>
                                    <td className="item food__carbs">{food.carbohydrate}</td>
                                    <td className="item food__fat">{food.lipid}</td>
                                    <td className="item food__protein">{food.protein}</td>
                                    <td className="item food__exclude"><a onClick={ () => {deleteFoodOfPlan(food.id)} }><img src={exclude} alt="Excluir" /></a></td>
                                </tr>
                                )
                            }
                        })
                        }
                        <tr className="line food-13 footer-food">
                            <td className='item food__desc'><a onClick={ () => {setIsModalSearchVisible(true); setMealContext(4)} }>Adicionar alimento <img src={plus} alt="Adicionar" /></a></td>
                        </tr>


                        <tr className={`line food-11 title-food`}>
                            <td className="item food__desc">Refeição V - Janta</td>
                        </tr>
                        {foodsOnPlan.map(food => {
                            if (food.meal_id === 5) {
                                return (
                                <tr className="line">
                                    <td className="item food__desc">{food.descr_nutirment}</td>
                                    <td className="item food__cal">{food.kcal}</td>
                                    <td className="item food__carbs">{food.carbohydrate}</td>
                                    <td className="item food__fat">{food.lipid}</td>
                                    <td className="item food__protein">{food.protein}</td>
                                    <td className="item food__exclude"><a onClick={ () => {deleteFoodOfPlan(food.id)} }><img src={exclude} alt="Excluir" /></a></td>
                                </tr>
                                )
                            }
                        })
                        }
                        <tr className="line food-13 footer-food">
                            <td className='item food__desc'><a onClick={ () => {setIsModalSearchVisible(true); setMealContext(5)} }>Adicionar alimento <img src={plus} alt="Adicionar" /></a></td>
                        </tr>

                        {/* Results */}
                        <tr className="line food-14 results-food">
                            <td className="item food__desc">Totais</td>
                            <td className="item food__cal-total">
                                { foodsCalcTotals.kcal }
                            </td>
                            <td className="item food__carbs-total">
                                { foodsCalcTotals.carbohydrate }
                            </td>
                            <td className="item food__fat-total">
                                { foodsCalcTotals.lipid }
                            </td>
                            <td className="item food__protein-total">
                                { foodsCalcTotals.protein }
                            </td>
                            <td className="item food__exclude"></td>
                        </tr>
                        <tr className="line food-14 results-food">
                            <td className="item food__desc">Meta diária</td>
                            <td className="item food__cal-goal">{(planContextData.bmr + planContextData.calor_variation).toFixed(2)}</td>
                            <td className="item food__carbs-goal">{(planContextData.body_mass * carbohydratesGoal).toFixed(2)}</td>
                            <td className="item food__fat-goal">{(planContextData.body_mass * planContextData.fat).toFixed(2)}</td>
                            <td className="item food__protein-goal">{(planContextData.body_mass * planContextData.protein).toFixed(2)}</td>
                            <td className="item food__exclude"></td>
                        </tr>
                        <tr className="line food-14 results-food">
                            <td className="item food__desc">Diferença</td>
                            <td className="item food__cal-diff">{(planContextData.bmr + planContextData.calor_variation - foodsCalcTotals.kcal).toFixed(2)}</td>
                            <td className="item food__carbs-diff">{(planContextData.body_mass * carbohydratesGoal - foodsCalcTotals.carbohydrate).toFixed(2)}</td>
                            <td className="item food__fat-diff">{(planContextData.body_mass * planContextData.fat - foodsCalcTotals.lipid).toFixed(2)}</td>
                            <td className="item food__protein-diff">{(planContextData.body_mass * planContextData.protein - foodsCalcTotals.protein).toFixed(2)}</td>
                            <td className="item food__exclude"></td>
                        </tr>
                        <tr className="line food-14 results-label">
                            <td className="item food__desc"></td>
                            <td className="item food__cal-goal">Calorias<br/>kcal</td>
                            <td className="item food__carbs-goal">Carboidratos<br/>g</td>
                            <td className="item food__fat-goal">Gorduras<br/>g</td>
                            <td className="item food__protein-goal">Proteínas<br/>g</td>
                            <td className="item food__exclude"></td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                }
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
                        <form>
                            <div className="modal-confirm-food__body">
                                <div className='data-food'>
                                    <div className='input-label-default'>
                                        <div className='input-text-default' id='input-pro-food-qntbase' fieldname='Quantidade base' onBlur={() => addMinLabel('input-pro-food-qntbase', 'qntbase')} >
                                            {((foodAdd.base_qty) ? foodAdd.base_qty.toFixed(2) + ` (${foodAdd.base_unit})` : 0)}
                                        </div>
                                        <label htmlFor='input-pro-food-qntbase'>Quantidade base</label>
                                    </div>
                                    <div className='input-label-default'>
                                        <div className='input-text-default' id='input-pro-food-carbo' fieldname='Carboidrato' {...register("carbohydrate")} onBlur={() => addMinLabel('input-pro-food-carbo', 'carbo')} >
                                            {(foodAdd.attributes.carbohydrate) ? ((foodAdd.attributes.carbohydrate.qty) ? (foodAdd.attributes.carbohydrate.qty.toFixed(2) + ` (${foodAdd.attributes.carbohydrate.unit})`) : 0) : 0}
                                        </div>
                                        <label htmlFor='input-pro-food-carbo'>Carboidrato</label>
                                    </div>
                                    <div className='input-label-default'>
                                        <div className='input-text-default' id='input-pro-food-prot' fieldname='Proteína' {...register("protein")} {...register("prot")} onBlur={() => addMinLabel('input-pro-food-prot', 'prot')} >
                                            {(foodAdd.attributes.protein) ? ((foodAdd.attributes.protein.qty) ? (foodAdd.attributes.protein.qty.toFixed(2) + ` (${foodAdd.attributes.protein.unit})`) : 0) : 0}
                                        </div>
                                        <label htmlFor='input-pro-food-prot'>Proteína</label>
                                    </div>
                                    <div className='input-label-default'>
                                        <div className='input-text-default' id='input-pro-food-obesity' fieldname='Gordura' {...register("lipid")} onBlur={() => addMinLabel('input-pro-food-obesity', 'obesity')} >
                                            {(foodAdd.attributes.lipid) ? ((foodAdd.attributes.lipid.qty && !isNaN(foodAdd.attributes.lipid.qty)) ? (foodAdd.attributes.lipid.qty.toFixed(2) + ` (${foodAdd.attributes.lipid.unit})`) : 0) : 0}
                                        </div>
                                        <label htmlFor='input-pro-food-obesity'>Gordura</label>
                                    </div>
                                    <div className='input-label-default'>
                                        <div className='input-text-default' id='input-pro-food-calorie' fieldname='Caloria' {...register("kcal")} onBlur={() => addMinLabel('input-pro-food-calorie', 'calorie')} >
                                            {(foodAdd.attributes.energy) ? ((foodAdd.attributes.energy.kcal) ? foodAdd.attributes.energy.kcal.toFixed(2) + ' (kcal)' : 0) : 0}
                                        </div>
                                        <label htmlFor='input-pro-food-calorie'>Caloria</label>
                                    </div>
                                </div>
                                <div className='save-food'>
                                    <div className='input-label-default'>
                                        <input className='input-text-default min-label' id='input-pro-food-unity' {...register("unit")} type='number' max='100' step='0.1' min='0.1' fieldname='Unidades' onBlur={ calcFoodAttributes } defaultValue='1' />
                                        <label htmlFor='input-pro-food-unity'>Unidades</label>
                                    </div>
                                    <div className='save-food-buttons'>
                                        <button type='button' className="btn-confirm-food" id='btn-confirm-food' onClick={ submitFood }>Adicionar</button>
                                        <button type='button' className="btn-back-modal" id='btn-back-modal' onClick={ backToSearchModal }>Voltar à busca</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </ModalGeneric>}
                {isModalOkPlanVisible  && <ModalGeneric onClose={ ()=>{setIsModalOkPlanVisible(false)} }>
                    <div className='modal-confirm-crud'>
                        <div className='modal-confirm-crud__texts'>
                            <img src={icon_check_circle} alt="Confirmação de exclusão" />
                            <h1>Plano salvo com sucesso!</h1>
                        </div>
                        <div className='modal-confirm-crud__buttons'>
                            <button className='btn btn-confirm' onClick={ ()=>{setIsModalOkPlanVisible(false)} }>Ok</button>
                        </div>
                    </div>
                </ModalGeneric>}
                {isModalNotOkPlanVisible  && <ModalGeneric onClose={ ()=>{setIsModalNotOkPlanVisible(false)} }>
                    <div className='modal-confirm-crud'>
                        <div className='modal-confirm-crud__texts'>
                            <img src={icon_check_circle} alt="Confirmação de exclusão" />
                            <h1>O plano não foi salvo!</h1>
                            <span>Verifique os dados e ente novamente!</span>
                        </div>
                        <div className='modal-confirm-crud__buttons'>
                            <button className='btn btn-confirm' onClick={ ()=>{setIsModalNotOkPlanVisible(false)} }>Ok</button>
                        </div>
                    </div>
                </ModalGeneric>}
                {isModalFoodAddedVisible  && <ModalGeneric onClose={ ()=>{setIsModalFoodAddedVisible(false)} }>
                    <div className='modal-confirm-crud'>
                        <div className='modal-confirm-crud__texts'>
                            <img src={icon_check_circle} alt="Confirmação de exclusão" />
                            <h1>Alimento adicionado com sucesso!</h1>
                        </div>
                        <div className='modal-confirm-crud__buttons'>
                            <button className='btn btn-confirm' onClick={ ()=>{setIsModalFoodAddedVisible(false);window.location.href = '/professional/plans/update/' + planFoodContextId} }>Ok</button>
                        </div>
                    </div>
                </ModalGeneric>}
                {isModalFoodNotAddedVisible  && <ModalGeneric onClose={ ()=>{setIsModalFoodNotAddedVisible(false)} }>
                    <div className='modal-confirm-crud'>
                        <div className='modal-confirm-crud__texts'>
                            <img src={icon_alert_circle} alt="Confirmação de exclusão" />
                            <h1>O alimento não foi cadastrado!</h1>
                            <span>Certifique-se de informar a quantia de unidades e tente novamente!</span>
                        </div>
                        <div className='modal-confirm-crud__buttons'>
                            <button className='btn btn-confirm' onClick={ ()=>{setIsModalFoodNotAddedVisible(false);} }>Ok</button>
                        </div>
                    </div>
                </ModalGeneric>}
            </div>
        </form>
    )
}