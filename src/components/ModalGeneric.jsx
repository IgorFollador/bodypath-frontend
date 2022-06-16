import React from 'react';
import './Modals.scss'
import './InputText.scss';

const Modal = ({ id = 'modal', onClose = () => {}, children }) => {

    const handleOutsideClick = event => {
        if (event.target.id === id) onClose();
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
                {children}
            </div>
        </div>
    </div>
}

export default Modal;