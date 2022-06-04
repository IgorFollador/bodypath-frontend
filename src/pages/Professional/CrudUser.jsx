import './CrudUser.scss';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import '../../components/InputText.scss';
import '../../components/InputRadio.scss';

export default function CrudUser() {
    const { register, handleSubmit } = useForm();
    const { id } = useParams();
    const [firstNameIsValid, setFirstNameIsValid] = useState(true);
    const [lastNameIsValid, setLastNameIsValid] = useState(true);
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [confirmEmailIsValid, setConfirmEmailIsValid] = useState(true);
    const [cpfIsValid, setCpfIsValid] = useState(true);
    const [phoneIsValid, setPhoneIsValid] = useState(true);
    const [stateIsValid, setStateIsValid] = useState(true);
    const [cityIsValid, setCityIsValid] = useState(true);
    const [streetIsValid, setStreetIsValid] = useState(true);
    const [numberIsValid, setNumberIsValid] = useState(true);
    const [enableSaveButton, setEnableSaveButton] = useState(true);
    const [userValues, setUserValues] = useState([]);
    const idsFields = ['input-pro-stud-firstname', 'input-pro-stud-lastname', 'input-pro-stud-email', 'input-pro-stud-confirmemail', 'input-pro-stud-cpf', 
          'input-pro-stud-phone', 'input-pro-stud-state', 'input-pro-stud-city', 'input-pro-stud-street', 'input-pro-stud-number'];

    const spreadUserData = () => {
        fetch('http://localhost:3001/users/' + id).then(response => response.json())
        .then(data => {
                const address1 = data.address.split(', ');
                const address2 = address1[1].split(' - ');                                                   //state         city        street       number
                const values = [data.firstName, data.lastName, data.email, data.email, data.cpf, data.phone, address2[2], address2[1], address1[0], address2[0]]
                const div = document.querySelector('#form-crud-user .div-crud').children;
                const permission = data.profile_id;
                var countDivs = 0;
                setUserValues(values);

                for (var i = 0; i < values.length; i++) {
                    if (i%2 === 0) {
                        div[countDivs].children[0].children[0].value = values[i];
                        div[countDivs].children[0].children[0].classList.add('min-label');
                    } else {
                        div[countDivs].children[1].children[0].value = values[i];
                        div[countDivs].children[1].children[0].classList.add('min-label');
                        countDivs++;
                    }
                }
                if (permission === 1) {
                    document.getElementById('radio-pro-stud-admin').checked = true;
                } else if (permission === 2) {
                    document.getElementById('radio-pro-stud-nutri').checked = true;
                } else if (permission === 3) {
                    document.getElementById('radio-pro-stud-personal').checked = true;
                }
            })
    }

    if (id) {
        var reload = true;
        idsFields.forEach(field => {
            if (document.getElementById(field) !== null) reload = false;
        })
        reload && spreadUserData(id);
    }

    const returnObj = data => {
        var obj = {};
        var street = data.street !== '' ? data.street : userValues[8];
        var number = data.number !== '' ? data.number : userValues[9];
        var city = data.city !== '' ? data.city : userValues[7];
        var state = data.state !== '' ? data.state : userValues[6];
        data.firstName !== '' ? obj.firstName = data.firstName : obj = obj;
        data.lastName !== '' ? obj.lastName = data.lastName : obj = obj;
        data.email !== '' ? obj.email = data.email : obj = obj;
        data.cpf !== '' ? obj.cpf = data.cpf : obj = obj;
        data.phone !== '' ? obj.phone = data.phone : obj = obj;
        data.password !== '' ? obj.password = data.password : obj = obj;
        data.profile_id !== null ? obj.profile_id = data.profile_id : obj.profile_id = 4;
        if (data.street !== '' || data.number !== '' || data.city !== '' || data.state !== '') {
            obj.address = street + ', ' + number + ' - ' + city + ' - ' + state;
        }
        return obj;
    }

    const verifyDataForm = () => {
        idsFields.forEach(id => {
            var field = id.split('-')[3];
            validateFileds(id, field);
        })
    }

    const submitForm = data => {
        const obj = returnObj(data);
        verifyDataForm();
        id ? asyncPutCall(obj) : asyncPostCall(obj);
    }

    const asyncPutCall = async data => {
        try {
            const response = await fetch('http://localhost:3001/users/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const content = await response.json();
            alert("Usuário alterado com sucesso!");
        } catch(error) {
            alert(error);
        } 
    }

    const asyncPostCall = async data => {
        try {
            const response = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const content = await response.json();
            alert("Usuário cadastrado com sucesso!");
        } catch(error) {
            alert(error);
        } 
    }
 
    const addMinLabel = (id, field) => {
        var input = document.getElementById(id);
        input.value.trim() !== '' ?
        input.classList.add('min-label') :
        input.classList.remove('min-label');
        validateFileds(id, field);
    }

    const validateFileds = (id, field) => {
        const fieldValue = document.getElementById(id).value;
        if (field === 'firstname') {
            setFirstNameIsValid(validateNames(fieldValue));
        } else if (field === 'lastname') {
            setLastNameIsValid(validateNames(fieldValue));
        } else if (field === 'email') {
            var regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
            setEmailIsValid(regex.test(fieldValue));
        } else if (field === 'confirmemail') {
            var isValid = (fieldValue === document.querySelector('#input-pro-stud-email').value) && !fieldIsEmpty(fieldValue);
            setConfirmEmailIsValid(isValid);
        } else if (field === 'cpf') {
            var cpf = fieldValue.replace(/[^0-9]/g,'');
            setCpfIsValid(validateCpf(cpf));
        } else if (field === 'phone') {
            var phone = fieldValue.replace(/[^0-9]/g,'');
            var regex = new RegExp('^([0-9]{2})(([0-9]{8})|(9[0-9]{8}))$');
            setPhoneIsValid(regex.test(phone));
        } else if (field === 'state') {
            var regex = /[A-Za-z]{2}/;
            var isValid = !fieldIsEmpty(fieldValue) && regex.test(fieldValue);
            document.getElementById('input-pro-stud-state').value = fieldValue.toUpperCase();
            setStateIsValid(isValid);
        } else if (field === 'city') {
            setCityIsValid(validateNames(fieldValue));
        } else if (field === 'street') {
            setStreetIsValid(validateNames(fieldValue));
        } else if (field === 'number') {
            setNumberIsValid(!fieldIsEmpty(fieldValue));
        }
    }

    const validateNames = value => {
        const regex = /^([a-zA-Zà-úÀ-Ú]|-|_|\s)+$/;
        var isValid = true;
        if (fieldIsEmpty(value) || value.length > 255 || value.length < 3 || !regex.test(value)) {
            isValid = false;
        }
        return isValid;
    }

    const validateCpf = cpf => {
        var sum = 0;
        var rest = 0;
        var sameNumber = true;
        if (cpf.length === 11) {
            for (var i = 1; i <= 9; i++) {
                sum += parseInt(cpf[i-1]) * (11 - i);
                if (i > 1 && cpf[i-2] !== cpf[i-1]) {
                    sameNumber = false;
                }
            }
            if (sameNumber) return false;
            rest = (sum * 10) % 11;
            if (rest === 10 || rest === 11) rest = 0;
            if (rest !== parseInt(cpf[9])) return false;
            sum = 0;

            for (var m = 1; m <= 10; m++) {
                sum += parseInt(cpf[m-1]) * (12 - m);
            }
            rest = (sum * 10) % 11;
            if (rest === 10 || rest === 11) rest = 0;
            if (rest !== parseInt(cpf[10])) return false;
            return true;
        }
        return false;
    }

    const fieldIsEmpty = value => {
        var isEmpty = false;
        if (value === '') {
            isEmpty = true;
        }
        return isEmpty;
    }

    return (
        <form id='form-crud-user' onSubmit={handleSubmit(submitForm)}>
            <div className='div-crud'>
                <div className='div-double-input'>
                    <div className='input-label-default'>
                        <input className='input-text-default' id='input-pro-stud-firstname' fieldname='Nome' {...register("firstName")} onBlur={() => addMinLabel('input-pro-stud-firstname', 'firstname')} maxLength='255' />
                        <label htmlFor='input-pro-stud-firstname'>Nome</label>
                        { !firstNameIsValid && <span>Campo inválido!</span> }
                    </div>
                    <div className='input-label-default'>
                        <input className='input-text-default' id='input-pro-stud-lastname' fieldname='Sobrenome' {...register("lastName")} onBlur={() => addMinLabel('input-pro-stud-lastname', 'lastname')} maxLength='255' />
                        <label htmlFor='input-pro-stud-lastname'>Sobrenome</label>
                        { !lastNameIsValid && <span>Campo inválido!</span> }
                    </div>
                </div>
                <div className='div-double-input'>
                    <div className='input-label-default'>
                        <input className='input-text-default' id='input-pro-stud-email' fieldname='E-mail' {...register("email")} onBlur={() => addMinLabel('input-pro-stud-email', 'email')} maxLength='255' />
                        <label htmlFor='input-pro-stud-email'>E-mail</label>
                        { !emailIsValid && <span>Campo inválido!</span> }
                    </div>
                    <div className='input-label-default'>
                        <input className='input-text-default' id='input-pro-stud-confirmemail' fieldname='Confirmação de E-mail' onBlur={() => addMinLabel('input-pro-stud-confirmemail', 'confirmemail')} maxLength='255' />
                        <label htmlFor='input-pro-stud-confirmemail'>Confirmação de E-mail</label>
                        { !confirmEmailIsValid && <span>Campo inválido!</span> }
                    </div>
                </div>
                <div className='div-double-input'>
                    <div className='input-label-default'>
                        <input className='input-text-default' id='input-pro-stud-cpf' fieldname='CPF' {...register("cpf")} onBlur={() => addMinLabel('input-pro-stud-cpf', 'cpf')} maxLength='14'/>
                        <label htmlFor='input-pro-stud-cpf'>CPF</label>
                        { !cpfIsValid && <span>Campo inválido!</span> }
                    </div>
                    <div className='input-label-default'>
                        <input className='input-text-default' id='input-pro-stud-phone' fieldname='Telefone' {...register("phone")} onBlur={() => addMinLabel('input-pro-stud-phone', 'phone')} maxLength='15'/>
                        <label htmlFor='input-pro-stud-phone'>Telefone</label>
                        { !phoneIsValid && <span>Campo inválido!</span> }
                    </div>
                </div>
                <div className='div-double-input'>
                    <div className='input-label-default'>
                        <input className='input-text-default' id='input-pro-stud-state' fieldname='Estado' {...register("state")} onBlur={() => addMinLabel('input-pro-stud-state', 'state')} maxLength='2' />
                        <label htmlFor='input-pro-stud-state'>Estado</label>
                        { !stateIsValid && <span>Campo inválido!</span> }
                    </div>
                    <div className='input-label-default'>
                        <input className='input-text-default' id='input-pro-stud-city' fieldname='Cidade' {...register("city")} onBlur={() => addMinLabel('input-pro-stud-city', 'city')} maxLength='255' />
                        <label htmlFor='input-pro-stud-city'>Cidade</label>
                        { !cityIsValid && <span>Campo inválido!</span> }
                    </div>
                </div>
                <div className='div-double-input'>
                    <div className='input-label-default'>
                        <input className='input-text-default' id='input-pro-stud-street' fieldname='Rua' {...register("street")} onBlur={() => addMinLabel('input-pro-stud-street', 'street')} maxLength='255' />
                        <label htmlFor='input-pro-stud-street'>Rua</label>
                        { !streetIsValid && <span>Campo inválido!</span> }
                    </div>
                    <div className='input-label-default'>
                        <input className='input-text-default' id='input-pro-stud-number' fieldname='Número' {...register("number")} onBlur={() => addMinLabel('input-pro-stud-number', 'number')} maxLength='5' />
                        <label htmlFor='input-pro-stud-number'>Número</label>
                        { !numberIsValid && <span>Campo inválido!</span> }
                    </div>
                </div>
                {!id &&
                    <div className='div-double-input'>
                        <div className='input-label-default'>
                            <input type='password' className='input-text-default' id='input-pro-stud-password' fieldname='Senha' {...register("password")} onBlur={() => addMinLabel('input-pro-stud-password', 'password')} maxLength='255' autoComplete='new-password' />
                            <label htmlFor='input-pro-stud-number'>Senha</label>
                        </div>
                        <div className='input-label-default'>
                            <input type='password' className='input-text-default' id='input-pro-stud-confirmpassword' fieldname='Senha' onBlur={() => addMinLabel('input-pro-stud-confirmpassword', 'confirmpassword')} maxLength='255' autoComplete='off' />
                            <label htmlFor='input-pro-stud-confirmpassword'>Confirmação de senha</label>
                        </div>
                    </div>
                }
                <div className='input-radio-container'>
                    <span>Permissões:</span>
                    <div className='inputs-radio'>
                        <div className="input-label-radio">
                            <input id='radio-pro-stud-admin' className='input-radio-default' name='profile_id' type="radio" {...register("profile_id")} value={1}/>
                            <label className='label-radio-default' htmlFor='radio-pro-stud-admin'>Administrador</label>
                        </div>
                        <div className="input-label-radio">
                            <input id='radio-pro-stud-nutri' className='input-radio-default' name='profile_id' type="radio" {...register("profile_id")} value={2}/>
                            <label className='label-radio-default' htmlFor='radio-pro-stud-nutri'>Nutricionista</label>
                        </div>
                        <div className="input-label-radio">
                            <input id='radio-pro-stud-personal' className='input-radio-default' name='profile_id' type="radio" {...register("profile_id")} value={3}/>
                            <label className='label-radio-default' htmlFor='radio-pro-stud-personal'>Educador Físico</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className='div-btn-save'>
                <button type='submit' className='btn btn-save'>Salvar</button>
            </div>
        </form>
    )
}