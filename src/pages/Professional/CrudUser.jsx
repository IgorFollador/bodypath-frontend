import './CrudUser.scss';
import { Link, useParams } from 'react-router-dom';
import InputText from '../../components/InputText';
import InputRadio from '../../components/InputRadio';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../components/InputText.scss';

export default function CrudUser() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { id } = useParams();
    var userValues;

    const spreadUserData = () => {
        fetch('http://localhost:3001/users/' + id).then(response => response.json())
            .then(data => {
                const address1 = data.address.split(', ');
                const address2 = address1[1].split(' - ');                                                   //state         city        street       number
                const values = [data.firstName, data.lastName, data.email, data.email, data.cpf, data.phone, address2[2], address2[1], address1[0], address2[0]]
                const div = document.querySelector('#form-crud-user .div-crud').children;
                var countDivs = 0;
                userValues = values;

                for (var i = 0; i < values.length; i++) {
                    if (i%2 == 0) {
                        div[countDivs].children[0].children[0].value = values[i];
                        div[countDivs].children[0].children[0].classList.add('min-label');
                    } else {
                        div[countDivs].children[1].children[0].value = values[i];
                        div[countDivs].children[1].children[0].classList.add('min-label');
                        countDivs++;
                    }
                }
            })
    }

    if (id) {
        spreadUserData(id);
    }

    const returnObj = data => {
        var obj = {};
        var street = data.street != '' ? data.street : userValues[8];
        var number = data.number != '' ? data.number : userValues[9];
        var city = data.city != '' ? data.city : userValues[7];
        var state = data.state != '' ? data.state : userValues[6];
        data.firstName != '' ? obj.firstName = data.firstName : obj = obj;
        data.lastName != '' ? obj.lastName = data.lastName : obj = obj;
        data.email != '' ? obj.email = data.email : obj = obj;
        data.cpf != '' ? obj.cpf = data.cpf : obj = obj;
        data.phone != '' ? obj.phone = data.phone : obj = obj;
        if (data.street != '' || data.number != '' || data.city != '' || data.state != '') {
            obj.address = street + ', ' + number + ' - ' + city + ' - ' + state;
        }
        return obj;
    }

    const asyncPutCall = async data => {
        const obj = returnObj(data);
        try {
            const response = await fetch('http://localhost:3001/users/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });
            const content = await response.json();
            alert("Success:" + content);
        } catch(error) {
            alert(error);
        } 
    }

    const asyncPostCall = async data => {
        var obj = returnObj(data);
        try {
            const response = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });
            const content = await response.json();
            alert("Success:" + content);
        } catch(error) {
            alert(error);
        } 
    }
 
    const addMinLabel = id => {
        var input = document.getElementById(id);
        input.value.trim() !== '' ?
        input.classList.add('min-label') :
        input.classList.remove('min-label');
    }
    
    return (
        <form id='form-crud-user' onSubmit={id ? handleSubmit(asyncPutCall) : handleSubmit(asyncPostCall)}>
            <div className='div-crud'>
                <div className='div-double-input'>
                    <div className='input-label-default'>
                        <input className='input-text-default' id='input-pro-stud-firstname' fieldname='Nome' {...register("firstName")} onBlur={() => addMinLabel('input-pro-stud-firstname')} />
                        <label htmlFor='input-pro-stud-firstname'>Name</label>
                    </div>
                    <div className='input-label-default'>
                        <input className='input-text-default' id='input-pro-stud-lastname' fieldname='Sobrenome' {...register("lastName")} onBlur={() => addMinLabel('input-pro-stud-lastname')} />
                        <label htmlFor='input-pro-stud-lastname'>Sobrenome</label>
                    </div>
                </div>
                <div className='div-double-input'>
                    <div className='input-label-default'>
                        <input className='input-text-default' id='input-pro-stud-email' fieldname='E-mail' {...register("email")} onBlur={() => addMinLabel('input-pro-stud-email')} />
                        <label htmlFor='input-pro-stud-email'>E-mail</label>
                    </div>
                    <div className='input-label-default'>
                        <input className='input-text-default' id='input-pro-stud-confirmemail' fieldname='Confirmação de E-mail' onBlur={() => addMinLabel('input-pro-stud-confirmemail')} />
                        <label htmlFor='input-pro-stud-confirmemail'>Confirmação de E-mail</label>
                    </div>
                </div>
                <div className='div-double-input'>
                    <div className='input-label-default'>
                        {/* <input id='input-pro-stud-birthdate' fieldname='Data de Nascimento' mask="99/99/9999" onBlur={() => addMinLabel('input-pro-stud-')} /> */}
                        <input className='input-text-default' id='input-pro-stud-cpf' fieldname='CPF' {...register("cpf")} onBlur={() => addMinLabel('input-pro-stud-cpf')} />
                        <label htmlFor='input-pro-stud-cpf'>CPF</label>
                    </div>
                    <div className='input-label-default'>
                        <input className='input-text-default' id='input-pro-stud-phone' fieldname='Telefone' {...register("phone")} onBlur={() => addMinLabel('input-pro-stud-phone')} />
                        <label htmlFor='input-pro-stud-phone'>Telefone</label>
                    </div>
                </div>
                <div className='div-double-input'>
                    <div className='input-label-default'>
                        <input className='input-text-default' id='input-pro-stud-state' fieldname='Estado' {...register("state")} onBlur={() => addMinLabel('input-pro-stud-state')} />
                        <label htmlFor='input-pro-stud-state'>Estado</label>
                    </div>
                    <div className='input-label-default'>
                        <input className='input-text-default' id='input-pro-stud-city' fieldname='Cidade' {...register("city")} onBlur={() => addMinLabel('input-pro-stud-city')} />
                        <label htmlFor='input-pro-stud-city'>Cidade</label>
                    </div>
                </div>
                <div className='div-double-input'>
                    <div className='input-label-default'>
                        <input className='input-text-default' id='input-pro-stud-street' fieldname='Rua' {...register("street")} onBlur={() => addMinLabel('input-pro-stud-street')} />
                        <label htmlFor='input-pro-stud-street'>Rua</label>
                    </div>
                    <div className='input-label-default'>
                        <input className='input-text-default' id='input-pro-stud-number' fieldname='Número' {...register("number")} onBlur={() => addMinLabel('input-pro-stud-number')} />
                        <label htmlFor='input-pro-stud-number'>Número</label>
                    </div>
                </div>
                {/* <div className='input-label-default'>
                    <input id='input-pro-stud-obs' fieldname='Observações' />
                </div> */}
                <div className='input-radio-container'>
                    <span>Permissões:</span>
                    <div className='inputs-radio'>
                        <InputRadio id='radio-pro-stud-admin' labelName='Administrador' name='permission' />
                        <InputRadio id='radio-pro-stud-personal' labelName='Educador Físico' name='permission' />
                        <InputRadio id='radio-pro-stud-nutri' labelName='Nutricionista' name='permission' />
                    </div>
                </div>
            </div>
            <div className='div-btn-save'>
                {/* <Link to={'/professional/students'}> */}
                    <button type='submit' className='btn btn-save'>Salvar</button>
                {/* </Link> */}
            </div>
        </form>
    )
}