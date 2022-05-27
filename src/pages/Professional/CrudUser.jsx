import './CrudUser.scss';
import { Link, useParams } from 'react-router-dom';
import InputText from '../../components/InputText';
import InputRadio from '../../components/InputRadio';
import React, { useEffect, useState } from 'react';

export default function CrudUser() {
    const initData = {
        firstName: '',
        lastName: '',
        email: '',
        cpf: '',
        phone: '',
        adress: '',
    }

    const [crudData, setCrudData] = useState(initData);

    const { id } = useParams();
    if(id) {
        console.log(id)
        //fazer requisição para buscar os dados do usuário através do id, e preencher o crud com os dados da requisição
    }

    function constructJson(event) {
        event.preventDefault();
        const obj = {
            'firstName': event.target[0].value,
            'lastName': event.target[1].value,
            'email': event.target[2].value,
            'cpf': event.target[5].value,
            'phone': event.target[6].value,
            'adress': event.target[10].value + ', ' +
            event.target[11].value + ' - ' +
            event.target[8].value + ' - ' +
            event.target[7].value,
        }
        setCrudData(obj);
        // console.log(JSON.stringify(obj))
        // console.log(JSON.parse(JSON.stringify(obj)))
        
        fetch('http://localhost:3001/users', {
            method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json',
            // },
            // mode: "no-cors",
            body: JSON.stringify(crudData),
        }).then(response => response.json())
        .then(data => {
            console.log(event)
            console.log("Success:",data)
        })
        .catch(error => {
            console.error("Error:",error)
        }); 
    }
    
    return (
        <form  onSubmit={constructJson}>
            <div className='div-crud'>
                <div className='div-double-input'>
                    <InputText id='input-pro-stud-firstname' fieldName='Nome' />
                    <InputText id='input-pro-stud-lastname' fieldName='Sobrenome' />
                </div>
                <div className='div-double-input'>
                    <InputText id='input-pro-stud-email' fieldName='E-mail' />
                    <InputText id='input-pro-stud-confirmemail' fieldName='Confirmação do E-mail' />
                </div>
                <div className='div-double-input'>
                    <InputText id='input-pro-stud-birthdate' fieldName='Data de Nascimento' mask="99/99/9999" />
                    <InputText id='input-pro-stud-cpf' fieldName='CPF' mask="999.999.999-99" />
                </div>
                <div className='div-double-input'>
                    <InputText id='input-pro-stud-phone' fieldName='Telefone' mask="(99) 99999-9999" />
                    <InputText id='input-pro-stud-state' fieldName='Estado' />
                </div>
                <div className='div-double-input'>
                    <InputText id='input-pro-stud-city' fieldName='Cidade' />
                    <InputText id='input-pro-stud-district' fieldName='Bairro' />
                </div>
                <div className='div-double-input'>
                    <InputText id='input-pro-stud-street' fieldName='Rua' />
                    <InputText id='input-pro-stud-number' fieldName='Número' />
                </div>
                <div className='div-area-input'>
                    <InputText id='input-pro-stud-obs' fieldName='Observações' />
                </div>
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