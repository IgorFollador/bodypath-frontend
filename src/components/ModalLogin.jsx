import React, { useState } from 'react';
import './Modals.scss'
import './InputText.scss';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const Modal = ({ id = 'modal', onClose = () => {} }) => {
    const { register, handleSubmit } = useForm();//default
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn, signed} = useContext(AuthContext);


    const handleSignIn = async (e) => {
        e.preventDefault();
        const data = {
            email,
            password,
        };
        console.log(data);

        await signIn(data);

    }

    const addMinLabel = (id, field) => {
        console.log(id)
        var input = document.getElementById(id);
        input.value.trim() !== '' ?
        input.classList.add('min-label') :
        input.classList.remove('min-label');
    }//default

    const handleOutsideClick = event => {
        if (event.target.id === id) onClose();
    }//default

    if(signed) {
        window.location.href = "/professional/feed"
    } else {

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
                            <form id='form-login' onSubmit={handleSignIn}>
                                <div className='input-label-default'>
                                    <input  className='input-text-default' 
                                            id='input-login-email' 
                                            fieldname='E-mail' 
                                            onBlur={() => addMinLabel('input-login-email', 'email')} 
                                            maxLength='255' 
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)} />
                                    <label htmlFor='input-login-email'>E-mail</label>
                                </div>
                                <div className='input-label-default'>
                                    <input  className='input-text-default' 
                                            id='input-login-password' 
                                            type='password' 
                                            fieldname='Senha' 
                                            onBlur={() => addMinLabel('input-login-password', 'password')} 
                                            maxLength='255' 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} />
                                    <label htmlFor='input-login-password'>Senha</label>
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
}

export default Modal;