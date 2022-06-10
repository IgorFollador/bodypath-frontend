import React, { useState } from 'react';
import './Modals.scss'
import './InputText.scss';
// import { useForm } from 'react-hook-form';

const Modal = ({ id = 'modal', onClose = () => {}, children }) => {
    // const { register, handleSubmit } = useForm();//default
    // const [emailIsValid, setEmailIsValid] = useState(true);
    // const [passwordIsValid, setPasswordIsValid] = useState(true);

    // const addMinLabel = (id, field) => {
    //     console.log(id)
    //     var input = document.getElementById(id);
    //     input.value.trim() !== '' ?
    //     input.classList.add('min-label') :
    //     input.classList.remove('min-label');
    //     validateFileds(id, field);
    // }//default

    const handleOutsideClick = event => {
        if (event.target.id === id) onClose();
    }//default

    // const validateFileds = (id, field) => {
    //     const fieldValue = document.getElementById(id).value;
    //     if (field === 'email') {
    //         var regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
    //         setEmailIsValid(regex.test(fieldValue));
    //     } else if (field === 'password') {
    //         var isValid = fieldValue.length >= 6;
    //         setPasswordIsValid(isValid);
    //     }
    // }

    const submitForm = data => {
        data.keep_logged = data.keep_logged === 'true';
        window.location.href = 'professional/feed';
        onClose();
    }

    return <div id={id} className="modal" onClick={handleOutsideClick}>
        <div className="modal-container">
            <button className="modal-container__btn-close" onClick={onClose}/>
            <div className="modal-container__content ">
                {children}
            </div>
        </div>
    </div>
}

export default Modal;