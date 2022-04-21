import './InputRadio.scss'

//Use default value in props 'id' of the InputRadio, as: radio-abbreviated page name-abbreviated section name-field name (without spaces).
//Example: radio-pro-eval-feminine -> input / professional page / section physical evaluation / field name.
export default function InputRadio(props) {

    return (
        <div className="input-label-radio">
            <input id={props.id} className='input-radio-default' name={props.name} type="radio"/>
            <label className='label-radio-default' htmlFor={props.id}>{props.labelName}</label>
        </div>
    )
}