import './InputText.scss';
import InputMask from 'react-input-mask';

//Use default value in props 'id' of the InputText, as: input-abbreviated page name-abbreviated section name-field name (without spaces).
//Example: input-pro-eval-name -> input / professional page / section physical evaluation / field name.
export default function InputText(props) {
    function addMinLabel(id) {
        var input = document.getElementById(id);
        input.value.trim() !== '' ?
        input.classList.add('min-label') :
        input.classList.remove('min-label');
    }

    return (
        <div className="input-label-default">
            <InputMask id={props.id} className='input-text-default' type="text" mask={props.mask} onBlur={() => addMinLabel(props.id)} autoComplete='off'/>
            <label htmlFor={props.id}>{props.fieldName}</label>
        </div>
    )
}