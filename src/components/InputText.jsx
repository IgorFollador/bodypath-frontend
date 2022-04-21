import './InputText.scss'

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
            <input id={props.id} className='input-text-default' type="text" onBlur={() => addMinLabel(props.id)} autoComplete='off'/>
            <label htmlFor={props.id}>{props.fieldName}</label>
        </div>
    )
}