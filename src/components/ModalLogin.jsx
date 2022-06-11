import React, { useState } from 'react';
import './Modals.scss'
import './InputText.scss';
import { useForm } from 'react-hook-form';

const Modal = ({ id = 'modal', onClose = () => {} }) => {
    const { register, handleSubmit } = useForm();//default
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [passwordIsValid, setPasswordIsValid] = useState(true);

    const addMinLabel = (id, field) => {
        console.log(id)
        var input = document.getElementById(id);
        input.value.trim() !== '' ?
        input.classList.add('min-label') :
        input.classList.remove('min-label');
        validateFileds(id, field);
    }//default

    const handleOutsideClick = event => {
        if (event.target.id === id) onClose();
    }//default

    const validateFileds = (id, field) => {
        const fieldValue = document.getElementById(id).value;
        if (field === 'email') {
            var regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
            setEmailIsValid(regex.test(fieldValue));
        } else if (field === 'password') {
            var isValid = fieldValue.length >= 6;
            setPasswordIsValid(isValid);
        }
    }

    const submitForm = data => {
        data.keep_logged = data.keep_logged === 'true';
        window.location.href = 'professional/feed';
        onClose();
    }

    return <div id={id} className="modal" onClick={handleOutsideClick}>
        <div className="modal-container">
            <button className="modal-container__btn-close" onClick={onClose}/>
            <div className="modal-container__content ">
                <div className="modal-login">
                    <div className="modal-login__header">
                        <h2>Conecte-se</h2>
                    </div>
                    <hr />
                    <div className="modal-login__body">
                        <form id='form-login' onSubmit={handleSubmit(submitForm)}>
                            <div className='input-label-default'>
                                <input className='input-text-default' id='input-login-email' fieldname='E-mail' {...register("email")} onBlur={() => addMinLabel('input-login-email', 'email')} maxLength='255' />
                                <label htmlFor='input-login-email'>E-mail</label>
                                { !emailIsValid && <span>Campo inválido!</span> }
                            </div>
                            <div className='input-label-default'>
                                <input className='input-text-default' id='input-login-password' type='password' fieldname='Senha' {...register("password")} onBlur={() => addMinLabel('input-login-password', 'password')} maxLength='255' />
                                <label htmlFor='input-login-password'>Senha</label>
                                { !passwordIsValid && <span>Campo inválido!</span> }
                            </div>
                            <div className="div-keep-logged">
                                <input type="checkbox" id="keep-logged" {...register("keep_logged")} value={true}/>
                                <label htmlFor="keep-logged">Mantenha-me conectado</label>
                            </div>
                            <div className="div-btn-login">
                                <button type='submit' className="btn-login">Entrar</button>
                            </div>
                        </form>
                        <button type='button' className="btn-register">Registrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Modal;