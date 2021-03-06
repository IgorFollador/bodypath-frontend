import './Cruds.scss';
import '../../components/InputText.scss';
import '../../components/InputRadio.scss';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Select from "react-select";

export default function CrudPhysicEval() {
    const { register, handleSubmit } = useForm();
    const { id } = useParams();
    const [ arrStudents, setArrStudents ] = useState([]);
    const [ activeInputHip, setActiveInputHip ] = useState(false);
    const [ studentNewEval, setStudentNewEval ] = useState(null);
    const [ nameUserEditing, setNameUserEditing ] = useState('');
    const professionalId = localStorage.getItem("@Auth:professional_id");
    const idsFields = ['input-pro-eval-age', 'input-pro-eval-height', 'input-pro-eval-weight', 'input-pro-eval-neck', 'input-pro-eval-waist', 
    'input-pro-eval-thorax', 'input-pro-eval-abdomen', 'input-pro-eval-rightarm', 'input-pro-eval-leftarm', 'input-pro-eval-rightupperthigh',
    'input-pro-eval-leftupperthigh', 'input-pro-eval-subscapularis', 'input-pro-eval-triceps', 'input-pro-eval-breastplate',
    'input-pro-eval-axillary', 'input-pro-eval-suprailiac', 'input-pro-eval-abdomnal', 'input-pro-eval-femoral'];

    useEffect(() => {
        fetch('http://localhost:10000/customer/clients/professional/' + professionalId, {
            headers: {
                'Authorization': localStorage.getItem("@Auth:token")
            },
        })
        .then(response => response.json())
        .then(data => {
            var arr = [];
            data.forEach(student => {
                arr.push({value: student.id, label:  student.User.firstName + ' ' + student.User.lastName})
            })
            setArrStudents(arr);
        })
    }, []);

    const spreadUserData = () => {
        fetch('http://localhost:10000/phyisical_evaluation/evaluations/' + id, {
            headers: {
                'Authorization': localStorage.getItem("@Auth:token")
            }, 
        })
        .then(response => response.json())
        .then(data => {
            setNameUserEditing(data.Client.User.firstName + ' ' + data.Client.User.lastName);
            const fundamentalDataValues = [data.age, data.height, data.weight];
            const measurementsValues = [data.neck, data.waist, data.chest, data.abdomen, data.right_arm, data.left_arm, data.right_forearm, data.left_forearm, data.right_upperThigh, data.left_upperThigh, data.right_middleThigh, data.left_middleThigh, data.hip];
            const bodyFoldsValues = [data.subscapularis, data.triceps, data.breastplate, data.middle_axillary, data.supra_iliac, data.abdominal, data.mid_femoral];
            const bodyResultsValues = [data.body_density, data.body_mass, data.body_fat, data.fat_percentage, data.bmr];
            const divsFundData = document.querySelector('.div-inputs-firstrow .div-fundamental-data .inputs-text').children;
            const divsMesurements = document.querySelector('.div-measurements-data .input-centralize').children;
            const divsBodyFolds = document.querySelector('.div-bodyfolds-data .divs-measurements .average-measurements').children;
            const divsBodyResults = document.querySelector('.div-results').children;

            for (let i = 0; i < divsFundData.length; i++) {
                divsFundData[i].children[0].value = fundamentalDataValues[i].toString();
                divsFundData[i].children[0].classList.add('min-label');
            }

            if (data.sex === 'F') {
                document.getElementById('radio-pro-eval-feminine').checked = true;
                setActiveInputHip(true);
            } else if (data.sex === 'M') {
                document.getElementById('radio-pro-eval-masculine').checked = true;
            }

            let diff = 0;
            for (let i = 0; i < divsMesurements.length; i++) {
                divsMesurements[i].children[0].children[0].value = measurementsValues[i+diff] !== null ? measurementsValues[i+diff].toString() : 'Null'; diff++;
                divsMesurements[i].children[1].children[0].value = measurementsValues[i+diff] !== null ? measurementsValues[i+diff].toString() : 'Null';
                divsMesurements[i].children[0].children[0].classList.add('min-label')
                divsMesurements[i].children[1].children[0].classList.add('min-label')
            }

            for (let i = 0; i < divsBodyFolds.length; i++) {
                divsBodyFolds[i].children[0].value = bodyFoldsValues[i].toString();
                divsBodyFolds[i].children[0].classList.add('min-label');
            }

            for (let i = 0; i < 3; i++) {
                divsBodyResults[0].children[i].children[0].value = bodyResultsValues[i].toString();
                divsBodyResults[0].children[i].children[0].classList.add('min-label');
            }
            for (let i = 0; i < 2; i++) {
                divsBodyResults[1].children[i].children[0].value = bodyResultsValues[i+3].toString();
                divsBodyResults[1].children[i].children[0].classList.add('min-label');
            }

            if (data.biotype === "ECTOMORFO") {
                document.getElementById('radio-pro-eval-ectomorph').checked = true;
            } else if (data.biotype === "MESOMORFO") {
                document.getElementById('radio-pro-eval-mesomorph').checked = true;
            } else if (data.biotype === "ENDOMORFO") {
                document.getElementById('radio-pro-eval-endomorph').checked = true;
            }
        })
    }

    if (id) {
        var reload = true;
        idsFields.forEach(field => {
            reload = (document.getElementById(field) !== null) && reload;
        })
        reload && spreadUserData(id);
    }

    const handleInputHip = e => {
        var val = e.target.value;
        if (val === 'F') setActiveInputHip(true);
        else setActiveInputHip(false);
    }

    const returnEditObj = data => {
        console.log(data)
        let obj = {};
        for (var key in data) {
            console.log(data[key])
            if (data[key] !== '' && data[key] !== null) {
                obj[key] = data[key];
            }
        }
        console.log(obj)
        return obj;
    }

    const returnCreatetObj = data => {
        let obj = data;
        obj.sex = activeInputHip ? 'F' : 'M';
        obj.client_id = studentNewEval;
        obj.professional_id = professionalId;
        return obj;
    }

    const submitForm = data => {
        let obj;
        // verifyDataForm();
        if (id) {
            obj = returnEditObj(data);
            asyncPutCall(obj);
        } else {
            obj = returnCreatetObj(data);
            console.log(obj)
            asyncPostCall(obj);
        }
        // closeSaveModal();
        window.location.href = '/professional/evaluations';
    }

    const asyncPutCall = async data => {
        fetch('http://localhost:10000/phyisical_evaluation/evaluations/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("@Auth:token")
            },
            body: JSON.stringify(data)
        }).then(result => console.log(result.ok))
    }

    const asyncPostCall = data => {
        fetch('http://localhost:10000/phyisical_evaluation/evaluations/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("@Auth:token")
            },
            body: JSON.stringify(data)
        })
    }

    const addMinLabel = (id, field) => {
        var input = document.getElementById(id);
        input.value.trim() !== '' ?
        input.classList.add('min-label') :
        input.classList.remove('min-label');
    }

    const changeStudent = e => {
        setStudentNewEval(e.value);
    }

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <div className='div-inputs-container'>
                <div className='div-align-select'>
                    <div className='div-select-data'>
                        {id ?
                        <h1>{nameUserEditing}</h1>
                        :
                        <>
                            <h3>Selecione o aluno:</h3>
                            <div className='div-select-students'>
                                <Select options={arrStudents} onChange={changeStudent} />
                            </div>
                        </>
                        }
                    </div>
                </div>
                <div className='div-inputs-firstrow'>

                    <div className='div-fundamental-data div-data'>
                        <h3>Dados fundamentais:</h3>
                        <div className='input-sex input-radio-container'>
                            <span>Sexo:</span>
                            <div className='inputs-radio'>
                                <div className="input-label-radio">
                                    <input id='radio-pro-eval-feminine' className='input-radio-default' name='sex' type="radio" {...register("sex")} value={'F'} onChange={handleInputHip}/>
                                    <label className='label-radio-default' htmlFor='radio-pro-eval-feminine'>Feminino</label>
                                </div>
                                <div className="input-label-radio">
                                    <input id='radio-pro-eval-masculine' className='input-radio-default' name='sex' type="radio" {...register("sex")} value={'M'} onChange={handleInputHip}/>
                                    <label className='label-radio-default' htmlFor='radio-pro-eval-masculine'>Masculino</label>
                                </div>
                            </div>
                        </div>
                        <div className='input-biotype input-radio-container'>
                            <span>Biotipo:</span>
                            <div className='inputs-radio'>
                                <div className="input-label-radio">
                                    <input id='radio-pro-eval-ectomorph' className='input-radio-default' name='biotype' type="radio" {...register("biotype")} value={'ECTOMORFO'}/>
                                    <label className='label-radio-default' htmlFor='radio-pro-eval-ectomorph'>Ectomorfo</label>
                                </div>
                                <div className="input-label-radio">
                                    <input id='radio-pro-eval-mesomorph' className='input-radio-default' name='biotype' type="radio" {...register("biotype")} value={'MESOMORFO'}/>
                                    <label className='label-radio-default' htmlFor='radio-pro-eval-mesomorph'>Mesomorfo</label>
                                </div>
                                <div className="input-label-radio">
                                    <input id='radio-pro-eval-endomorph' className='input-radio-default' name='biotype' type="radio" {...register("biotype")} value={'ENDOMORFO'}/>
                                    <label className='label-radio-default' htmlFor='radio-pro-eval-endomorph'>Endomorfo</label>
                                </div>
                            </div>
                        </div>
                        <div className='inputs-text'>
                            <div className='input-label-default'>
                                <input className='input-text-default' id='input-pro-eval-age' fieldname='Idade' {...register("age")} onBlur={() => addMinLabel('input-pro-eval-age', 'age')} maxLength='255' />
                                <label htmlFor='input-pro-eval-age'>Idade</label>
                                {/* { !ageIsValid && <span>Campo inv??lido!</span> } */}
                            </div>
                            <div className='input-label-default'>
                                <input className='input-text-default' id='input-pro-eval-height' fieldname='Altura' {...register("height")} onBlur={() => addMinLabel('input-pro-eval-height', 'height')} maxLength='255' />
                                <label htmlFor='input-pro-eval-height'>Altura (cm)</label>
                                {/* { !heightIsValid && <span>Campo inv??lido!</span> } */}
                            </div>
                            <div className='input-label-default'>
                                <input className='input-text-default' id='input-pro-eval-weight' fieldname='Peso' {...register("weight")} onBlur={() => addMinLabel('input-pro-eval-weight', 'weight')} maxLength='255' />
                                <label htmlFor='input-pro-eval-weight'>Peso (kg)</label>
                                {/* { !weightIsValid && <span>Campo inv??lido!</span> } */}
                            </div>
                        </div>
                    </div>

                    <div className='div-measurements-data div-data'>
                        <h3>Medidas (mm):</h3>
                        <div className='input-centralize'>
                            <div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-neck' fieldname='Pesco??o' {...register("neck")} onBlur={() => addMinLabel('input-pro-eval-neck', 'neck')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-neck'>Pesco??o</label>
                                    {/* { !neckIsValid && <span>Campo inv??lido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-waist' fieldname='Cintura' {...register("waist")} onBlur={() => addMinLabel('input-pro-eval-waist', 'waist')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-waist'>Cintura</label>
                                    {/* { !waistIsValid && <span>Campo inv??lido!</span> } */}
                                </div>
                            </div>
                            <div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-thorax' fieldname='T??rax' {...register("chest")} onBlur={() => addMinLabel('input-pro-eval-thorax', 'thorax')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-thorax'>T??rax</label>
                                    {/* { !thoraxIsValid && <span>Campo inv??lido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-abdomen' fieldname='Abd??men' {...register("abdomen")} onBlur={() => addMinLabel('input-pro-eval-abdomen', 'abdomen')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-abdomen'>Abd??men</label>
                                    {/* { !abdomenIsValid && <span>Campo inv??lido!</span> } */}
                                </div>
                            </div>
                            <div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-rightarm' fieldname='Bra??o Direito' {...register("right_arm")} onBlur={() => addMinLabel('input-pro-eval-rightarm', 'rightarm')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-rightarm'>Bra??o direito</label>
                                    {/* { !rightarmIsValid && <span>Campo inv??lido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-leftarm' fieldname='Bra??o Esquerdo' {...register("left_arm")} onBlur={() => addMinLabel('input-pro-eval-leftarm', 'leftarm')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-leftarm'>Bra??o esquerdo</label>
                                    {/* { !leftarmIsValid && <span>Campo inv??lido!</span> } */}
                                </div>
                            </div>
                            <div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-rightforearm' fieldname='Antebra??o D' {...register("right_forearm")} onBlur={() => addMinLabel('input-pro-eval-rightforearm', 'rightforearm')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-rightforearm'>Antebra??o D</label>
                                    {/* { !rightforearmIsValid && <span>Campo inv??lido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-leftforearm' fieldname='Antebra??o E' {...register("left_forearm")} onBlur={() => addMinLabel('input-pro-eval-leftforearm', 'leftforearm')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-leftforearm'>Antebra??o E</label>
                                    {/* { !leftforearmIsValid && <span>Campo inv??lido!</span> } */}
                                </div>
                            </div>
                            <div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-rightupperthigh' fieldname='Coxa Superior D' {...register("right_upperThigh")} onBlur={() => addMinLabel('input-pro-eval-rightupperthigh', 'rightupperthigh')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-rightupperthigh'>Coxa superior D</label>
                                    {/* { !rightupperthighIsValid && <span>Campo inv??lido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-leftupperthigh' fieldname='Coxa Superior E' {...register("left_upperThigh")} onBlur={() => addMinLabel('input-pro-eval-leftupperthigh', 'leftupperthigh')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-leftupperthigh'>Coxa superior E</label>
                                    {/* { !leftupperthighIsValid && <span>Campo inv??lido!</span> } */}
                                </div>
                            </div>
                            <div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-rightmiddlethigh' fieldname='Coxa M??dia D' {...register("right_middleThigh")} onBlur={() => addMinLabel('input-pro-eval-rightmiddlethigh', 'rightmiddlethigh')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-rightmiddlethigh'>Coxa m??dia D</label>
                                    {/* { !rightmiddlethighIsValid && <span>Campo inv??lido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-leftmiddlethigh' fieldname='Coxa M??dia E' {...register("left_middleThigh")} onBlur={() => addMinLabel('input-pro-eval-leftmiddlethigh', 'leftmiddlethigh')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-leftmiddlethigh'>Coxa m??dia E</label>
                                    {/* { !leftmiddlethighIsValid && <span>Campo inv??lido!</span> } */}
                                </div>
                            </div>
                            {activeInputHip &&
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-hip' fieldname='Quadril' {...register("hip")} onBlur={() => addMinLabel('input-pro-eval-hip', 'hip')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-hip'>Quadril</label>
                                    {/* { !hipIsValid && <span>Campo inv??lido!</span> } */}
                                </div>
                            }
                        </div>
                    </div>

                    <div className='div-bodyfolds-data div-data'>
                        <h3>Dobras corporais (mm):</h3>
                        <div className='divs-measurements'>
                            <div className='average-measurements'>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-subscapularis' fieldname='Subescapular' {...register("subscapularis")} onBlur={() => addMinLabel('input-pro-eval-subscapularis', 'subscapularis')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-subscapularis'>Subescapular</label>
                                    {/* { !subscapularisIsValid && <span>Campo inv??lido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-triceps' fieldname='Tr??ceps' {...register("triceps")} onBlur={() => addMinLabel('input-pro-eval-triceps', 'triceps')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-triceps'>Tr??ceps</label>
                                    {/* { !tricepsIsValid && <span>Campo inv??lido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-breastplate' fieldname='Peitoral' {...register("breastplate")} onBlur={() => addMinLabel('input-pro-eval-breastplate', 'breastplate')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-breastplate'>Peitoral</label>
                                    {/* { !breastplateIsValid && <span>Campo inv??lido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-axillary' fieldname='Axilar m??dia' {...register("middle_axillary")} onBlur={() => addMinLabel('input-pro-eval-axillary', 'axillary')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-axillary'>Axilar m??dia</label>
                                    {/* { !axillaryIsValid && <span>Campo inv??lido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-suprailiac' fieldname='Supra-il??aca' {...register("supra_iliac")} onBlur={() => addMinLabel('input-pro-eval-suprailiac', 'suprailiac')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-suprailiac'>Supra-il??aca</label>
                                    {/* { !suprailiacIsValid && <span>Campo inv??lido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-abdomnal' fieldname='Abdominal' {...register("abdominal")} onBlur={() => addMinLabel('input-pro-eval-abdomnal', 'abdomnal')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-abdomnal'>Abdominal</label>
                                    {/* { !abdomnalIsValid && <span>Campo inv??lido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-femoral' fieldname='Femural m??dio' {...register("mid_femoral")} onBlur={() => addMinLabel('input-pro-eval-femoral', 'femoral')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-femoral'>Femural m??dio</label>
                                    {/* { !femoralIsValid && <span>Campo inv??lido!</span> } */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {id &&
                <div className='div-inputs-thirdrow'>
                    <div className='div-bodyresults-data div-data'>
                        <h3>Resultados corporais:</h3>
                        <div className='div-results'>
                            <div className='first-result'>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-subscapularis1' fieldname='Densidade corporal' onBlur={() => addMinLabel('input-pro-eval-subscapularis1', 'subscapularis1')} maxLength='255' readOnly />
                                    <label htmlFor='input-pro-eval-subscapularis1'>Densidade corporal (g/ml)</label>
                                    {/* { !subscapularis1IsValid && <span>Campo inv??lido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-triceps1' fieldname='Massa magra' onBlur={() => addMinLabel('input-pro-eval-triceps1', 'triceps1')} maxLength='255' readOnly />
                                    <label htmlFor='input-pro-eval-triceps1'>Massa magra (kg)</label>
                                    {/* { !triceps1IsValid && <span>Campo inv??lido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-breastplate1' fieldname='Massa gorda' onBlur={() => addMinLabel('input-pro-eval-breastplate1', 'breastplate1')} maxLength='255' readOnly />
                                    <label htmlFor='input-pro-eval-breastplate1'>Massa gorda (kg)</label>
                                    {/* { !breastplate1IsValid && <span>Campo inv??lido!</span> } */}
                                </div>
                            </div>
                            <div className='second-result'>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-axillary1' fieldname='Percentual de gordura' onBlur={() => addMinLabel('input-pro-eval-axillary1', 'axillary1')} maxLength='255' readOnly />
                                    <label htmlFor='input-pro-eval-axillary1'>Percentual de gordura (%)</label>
                                    {/* { !axillary1IsValid && <span>Campo inv??lido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-suprailiac1' fieldname='Taxa metam??lica basal' onBlur={() => addMinLabel('input-pro-eval-suprailiac1', 'suprailiac1')} maxLength='255' readOnly />
                                    <label htmlFor='input-pro-eval-suprailiac1'>Taxa metam??lica basal (kcal)</label>
                                    {/* { !suprailiac1IsValid && <span>Campo inv??lido!</span> } */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
                <div className="div-btn-save">
                    <button className='btn btn-save' type='submit'>Salvar</button>
                </div>
            </div>
        </form>
    )
}