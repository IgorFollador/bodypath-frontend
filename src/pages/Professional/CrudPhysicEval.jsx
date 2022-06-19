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
    const professionalId = localStorage.getItem("@Auth:professional_id");
    const idsFields = ['input-pro-eval-age', 'input-pro-eval-height', 'input-pro-eval-weight', 'input-pro-eval-neck', 'input-pro-eval-waist', 
    'input-pro-eval-thorax', 'input-pro-eval-abdomen', 'input-pro-eval-rightarm', 'input-pro-eval-leftarm', 'input-pro-eval-rightupperthigh',
    'input-pro-eval-leftupperthigh', 'input-pro-eval-hip', 'input-pro-eval-subscapularis', 'input-pro-eval-triceps', 'input-pro-eval-breastplate',
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
            console.log("students", data)
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
            console.log(data)
            // const address1 = data.address.split(', ');
            // const address2 = address1[1].split(' - ');                                                   //state         city        street       number
            // const values = [data.firstName, data.lastName, data.email, data.email, data.cpf, data.phone, address2[2], address2[1], address1[0], address2[0]]
            // const div = document.querySelector('#form-crud-user .div-crud').children;
            // const permission = data.profile_id;
            // var countDivs = 0;
            // setUserValues(values);

            // for (var i = 0; i < values.length; i++) {
            //     if (i%2 === 0) {
            //         div[countDivs].children[0].children[0].value = values[i];
            //         div[countDivs].children[0].children[0].classList.add('min-label');
            //     } else {
            //         div[countDivs].children[1].children[0].value = values[i];
            //         div[countDivs].children[1].children[0].classList.add('min-label');
            //         countDivs++;
            //     }
            // }

            if (data.sex === 'F') {
                document.getElementById('radio-pro-eval-feminine').checked = true;
                setActiveInputHip(true);
            } else if (data.sex === 'M') {
                document.getElementById('radio-pro-eval-masculine').checked = true;
            }

            if (data.biotype === "ECTOMORFO") {
                document.getElementById('radio-pro-eval-ectomorph').checked = true;
            } else if (data.biotype === "MESOMORFO") {
                document.getElementById('radio-pro-eval-mesomorph').checked = true;
            } else if (data.biotype === "ENDOMORFO") {
                document.getElementById('radio-pro-eval-endomorph').checked = true;
            }
        }
        )
    }

    if (id) {
        var reload = true;
        idsFields.forEach(field => {
            if (document.getElementById(field) !== null) reload = false;
        })
        reload && spreadUserData(id);
    }

    const handleInputHip = e => {
        var val = e.target.value;
        if (val === 'F') setActiveInputHip(true);
        else setActiveInputHip(false);
    }

    const submitForm = data => {
        data.sex = activeInputHip ? 'F' : 'M';
        data.client_id = studentNewEval;
        data.professional_id = professionalId;
        console.log(data)
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
                        <h3>Selecione o aluno:</h3>
                        <div className='div-select-students'>
                            <Select options={arrStudents} onChange={changeStudent} />
                        </div>
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
                                {/* { !ageIsValid && <span>Campo inválido!</span> } */}
                            </div>
                            <div className='input-label-default'>
                                <input className='input-text-default' id='input-pro-eval-height' fieldname='Altura' {...register("height")} onBlur={() => addMinLabel('input-pro-eval-height', 'height')} maxLength='255' />
                                <label htmlFor='input-pro-eval-height'>Altura (cm)</label>
                                {/* { !heightIsValid && <span>Campo inválido!</span> } */}
                            </div>
                            <div className='input-label-default'>
                                <input className='input-text-default' id='input-pro-eval-weight' fieldname='Peso' {...register("weight")} onBlur={() => addMinLabel('input-pro-eval-weight', 'weight')} maxLength='255' />
                                <label htmlFor='input-pro-eval-weight'>Peso (kg)</label>
                                {/* { !weightIsValid && <span>Campo inválido!</span> } */}
                            </div>
                        </div>
                    </div>

                    <div className='div-measurements-data div-data'>
                        <h3>Medidas (mm):</h3>
                        <div className='input-centralize'>
                            <div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-neck' fieldname='Pescoço' {...register("neck")} onBlur={() => addMinLabel('input-pro-eval-neck', 'neck')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-neck'>Pescoço</label>
                                    {/* { !neckIsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-waist' fieldname='Cintura' {...register("waist")} onBlur={() => addMinLabel('input-pro-eval-waist', 'waist')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-waist'>Cintura</label>
                                    {/* { !waistIsValid && <span>Campo inválido!</span> } */}
                                </div>
                            </div>
                            <div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-thorax' fieldname='Tórax' {...register("chest")} onBlur={() => addMinLabel('input-pro-eval-thorax', 'thorax')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-thorax'>Tórax</label>
                                    {/* { !thoraxIsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-abdomen' fieldname='Abdômen' {...register("abdomen")} onBlur={() => addMinLabel('input-pro-eval-abdomen', 'abdomen')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-abdomen'>Abdômen</label>
                                    {/* { !abdomenIsValid && <span>Campo inválido!</span> } */}
                                </div>
                            </div>
                            <div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-rightarm' fieldname='Braço Direito' {...register("right_arm")} onBlur={() => addMinLabel('input-pro-eval-rightarm', 'rightarm')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-rightarm'>Braço direito</label>
                                    {/* { !rightarmIsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-leftarm' fieldname='Braço Esquerdo' {...register("left_arm")} onBlur={() => addMinLabel('input-pro-eval-leftarm', 'leftarm')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-leftarm'>Braço esquerdo</label>
                                    {/* { !leftarmIsValid && <span>Campo inválido!</span> } */}
                                </div>
                            </div>
                            <div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-rightforearm' fieldname='Antebraço D' {...register("right_forearm")} onBlur={() => addMinLabel('input-pro-eval-rightforearm', 'rightforearm')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-rightforearm'>Antebraço D</label>
                                    {/* { !rightforearmIsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-leftforearm' fieldname='Antebraço E' {...register("left_forearm")} onBlur={() => addMinLabel('input-pro-eval-leftforearm', 'leftforearm')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-leftforearm'>Antebraço E</label>
                                    {/* { !leftforearmIsValid && <span>Campo inválido!</span> } */}
                                </div>
                            </div>
                            <div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-rightupperthigh' fieldname='Coxa Superior D' {...register("right_upperThigh")} onBlur={() => addMinLabel('input-pro-eval-rightupperthigh', 'rightupperthigh')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-rightupperthigh'>Coxa superior D</label>
                                    {/* { !rightupperthighIsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-leftupperthigh' fieldname='Coxa Superior E' {...register("left_upperThigh")} onBlur={() => addMinLabel('input-pro-eval-leftupperthigh', 'leftupperthigh')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-leftupperthigh'>Coxa superior E</label>
                                    {/* { !leftupperthighIsValid && <span>Campo inválido!</span> } */}
                                </div>
                            </div>
                            <div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-rightmiddlethigh' fieldname='Coxa Média D' {...register("right_middleThigh")} onBlur={() => addMinLabel('input-pro-eval-rightmiddlethigh', 'rightmiddlethigh')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-rightmiddlethigh'>Coxa média D</label>
                                    {/* { !rightmiddlethighIsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-leftmiddlethigh' fieldname='Coxa Média E' {...register("left_middleThigh")} onBlur={() => addMinLabel('input-pro-eval-leftmiddlethigh', 'leftmiddlethigh')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-leftmiddlethigh'>Coxa média E</label>
                                    {/* { !leftmiddlethighIsValid && <span>Campo inválido!</span> } */}
                                </div>
                            </div>
                            {activeInputHip &&
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-hip' fieldname='Quadril' {...register("hip")} onBlur={() => addMinLabel('input-pro-eval-hip', 'hip')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-hip'>Quadril</label>
                                    {/* { !hipIsValid && <span>Campo inválido!</span> } */}
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
                                    {/* { !subscapularisIsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-triceps' fieldname='Tríceps' {...register("triceps")} onBlur={() => addMinLabel('input-pro-eval-triceps', 'triceps')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-triceps'>Tríceps</label>
                                    {/* { !tricepsIsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-breastplate' fieldname='Peitoral' {...register("breastplate")} onBlur={() => addMinLabel('input-pro-eval-breastplate', 'breastplate')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-breastplate'>Peitoral</label>
                                    {/* { !breastplateIsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-axillary' fieldname='Axilar média' {...register("middle_axillary")} onBlur={() => addMinLabel('input-pro-eval-axillary', 'axillary')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-axillary'>Axilar média</label>
                                    {/* { !axillaryIsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-suprailiac' fieldname='Supra-ilíaca' {...register("supra_iliac")} onBlur={() => addMinLabel('input-pro-eval-suprailiac', 'suprailiac')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-suprailiac'>Supra-ilíaca</label>
                                    {/* { !suprailiacIsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-abdomnal' fieldname='Abdominal' {...register("abdominal")} onBlur={() => addMinLabel('input-pro-eval-abdomnal', 'abdomnal')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-abdomnal'>Abdominal</label>
                                    {/* { !abdomnalIsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-femoral' fieldname='Femural médio' {...register("mid_femoral")} onBlur={() => addMinLabel('input-pro-eval-femoral', 'femoral')} maxLength='255' />
                                    <label htmlFor='input-pro-eval-femoral'>Femural médio</label>
                                    {/* { !femoralIsValid && <span>Campo inválido!</span> } */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='div-inputs-thirdrow'>
                    <div className='div-bodyresults-data div-data'>
                        <h3>Resultados corporais:</h3>
                        <div className='div-results'>
                            <div className='first-result'>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-subscapularis1' fieldname='Densidade corporal' onBlur={() => addMinLabel('input-pro-eval-subscapularis1', 'subscapularis1')} maxLength='255' readOnly />
                                    <label htmlFor='input-pro-eval-subscapularis1'>Densidade corporal (g/ml)</label>
                                    {/* { !subscapularis1IsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-triceps1' fieldname='Massa magra' onBlur={() => addMinLabel('input-pro-eval-triceps1', 'triceps1')} maxLength='255' readOnly />
                                    <label htmlFor='input-pro-eval-triceps1'>Massa magra (kg)</label>
                                    {/* { !triceps1IsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-breastplate1' fieldname='Massa gorda' onBlur={() => addMinLabel('input-pro-eval-breastplate1', 'breastplate1')} maxLength='255' readOnly />
                                    <label htmlFor='input-pro-eval-breastplate1'>Massa gorda (kg)</label>
                                    {/* { !breastplate1IsValid && <span>Campo inválido!</span> } */}
                                </div>
                            </div>
                            <div className='second-result'>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-axillary1' fieldname='Percentual de gordura' onBlur={() => addMinLabel('input-pro-eval-axillary1', 'axillary1')} maxLength='255' readOnly />
                                    <label htmlFor='input-pro-eval-axillary1'>Percentual de gordura (%)</label>
                                    {/* { !axillary1IsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-suprailiac1' fieldname='Taxa metamólica basal' onBlur={() => addMinLabel('input-pro-eval-suprailiac1', 'suprailiac1')} maxLength='255' readOnly />
                                    <label htmlFor='input-pro-eval-suprailiac1'>Taxa metamólica basal (kcal)</label>
                                    {/* { !suprailiac1IsValid && <span>Campo inválido!</span> } */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="div-btn-save">
                    <button className='btn btn-save' type='submit'>Salvar</button>
                </div>
            </div>
        </form>
    )
}