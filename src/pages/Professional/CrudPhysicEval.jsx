import './CrudPhysicEval.scss';
import '../../components/InputText.scss';
import '../../components/InputRadio.scss';
import { useForm } from 'react-hook-form';

export default function CrudPhysicEval() {
    const { register, handleSubmit } = useForm();

    const addMinLabel = (id, field) => {
        var input = document.getElementById(id);
        input.value.trim() !== '' ?
        input.classList.add('min-label') :
        input.classList.remove('min-label');
    }

    return (
        <>
            <div className='div-inputs-container'>
                <div className='div-inputs-firstrow'>
                    <div className='div-personal-data div-data'>
                        <h3>Dados pessoais:</h3>
                        <div className='input-label-default'>
                            <input className='input-text-default' id='input-pro-eval-firstname' fieldname='Nome' {...register("firstName")} onBlur={() => addMinLabel('input-pro-stud-firstname', 'firstname')} maxLength='255' />
                            <label htmlFor='input-pro-stud-firstname'>Nome</label>
                            {/* { !firstNameIsValid && <span>Campo inválido!</span> } */}
                        </div>
                        <div className='input-label-default'>
                            <input className='input-text-default' id='input-pro-eval-lastname' fieldname='Sobrenome' {...register("lastname")} onBlur={() => addMinLabel('input-pro-stud-lastname', 'lastname')} maxLength='255' />
                            <label htmlFor='input-pro-stud-lastname'>Sobrenome</label>
                            {/* { !lastnameIsValid && <span>Campo inválido!</span> } */}
                        </div>
                        <div className='input-label-default'>
                            <input className='input-text-default' id='input-pro-eval-email' fieldname='E-mail' {...register("email")} onBlur={() => addMinLabel('input-pro-stud-email', 'email')} maxLength='255' />
                            <label htmlFor='input-pro-stud-email'>E-mail</label>
                            {/* { !emailIsValid && <span>Campo inválido!</span> } */}
                        </div>
                        {/* <InputText id='input-pro-eval-firstname' fieldName='Nome'/>
                        <InputText id='input-pro-eval-lastname' fieldName='Sobrenome'/>
                        <InputText id='input-pro-eval-email' fieldName='E-mail'/> */}
                    </div>

                    <div className='div-fundamental-data div-data'>
                        <h3>Dados fundamentais:</h3>
                        <div className='input-sex input-radio-container'>
                            <span>Sexo:</span>
                            <div className='inputs-radio'>
                                <div className="input-label-radio">
                                    <input id='radio-pro-eval-feminine' className='input-radio-default' name='sex' type="radio" {...register("sex")} value={1}/>
                                    <label className='label-radio-default' htmlFor='radio-pro-eval-feminine'>Feminino</label>
                                </div>
                                <div className="input-label-radio">
                                    <input id='radio-pro-eval-masculine' className='input-radio-default' name='sex' type="radio" {...register("sex")} value={1}/>
                                    <label className='label-radio-default' htmlFor='radio-pro-eval-masculine'>Masculino</label>
                                </div>
                                {/* <InputRadio id='radio-pro-eval-feminine' labelName='Feminino' name='sex' />
                                <InputRadio id='radio-pro-eval-masculine' labelName='Masculino' name='sex' /> */}
                            </div>
                        </div>
                        <div className='input-biotype input-radio-container'>
                            <span>Biotipo:</span>
                            <div className='inputs-radio'>
                                <div className="input-label-radio">
                                    <input id='radio-pro-eval-ectomorph' className='input-radio-default' name='biotype' type="radio" {...register("biotype")} value={1}/>
                                    <label className='label-radio-default' htmlFor='radio-pro-eval-ectomorph'>Ectomorfo</label>
                                </div>
                                <div className="input-label-radio">
                                    <input id='radio-pro-eval-mesomorph' className='input-radio-default' name='biotype' type="radio" {...register("biotype")} value={2}/>
                                    <label className='label-radio-default' htmlFor='radio-pro-eval-mesomorph'>Mesomorfo</label>
                                </div>
                                <div className="input-label-radio">
                                    <input id='radio-pro-eval-endomorph' className='input-radio-default' name='biotype' type="radio" {...register("biotype")} value={3}/>
                                    <label className='label-radio-default' htmlFor='radio-pro-eval-endomorph'>Endomorfo</label>
                                </div>
                                {/* <InputRadio id='radio-pro-eval-ectomorph' labelName='Ectomorfo' name='biotype' />
                                <InputRadio id='radio-pro-eval-mesomorph' labelName='Mesomorfo' name='biotype' />
                                <InputRadio id='radio-pro-eval-endomorph' labelName='Endomorfo' name='biotype' /> */}
                            </div>
                        </div>
                        <div className='inputs-text'>
                            <div className='input-label-default'>
                                <input className='input-text-default' id='input-pro-eval-age' fieldname='Idade' {...register("age")} onBlur={() => addMinLabel('input-pro-stud-age', 'age')} maxLength='255' />
                                <label htmlFor='input-pro-stud-age'>Idade</label>
                                {/* { !ageIsValid && <span>Campo inválido!</span> } */}
                            </div>
                            <div className='input-label-default'>
                                <input className='input-text-default' id='input-pro-eval-height' fieldname='Altura' {...register("height")} onBlur={() => addMinLabel('input-pro-stud-height', 'height')} maxLength='255' />
                                <label htmlFor='input-pro-stud-height'>Altura</label>
                                {/* { !heightIsValid && <span>Campo inválido!</span> } */}
                            </div>
                            <div className='input-label-default'>
                                <input className='input-text-default' id='input-pro-eval-weight' fieldname='Peso' {...register("weight")} onBlur={() => addMinLabel('input-pro-stud-weight', 'weight')} maxLength='255' />
                                <label htmlFor='input-pro-stud-weight'>Peso</label>
                                {/* { !weightIsValid && <span>Campo inválido!</span> } */}
                            </div>
                            {/* <InputText id='input-pro-eval-age' fieldName='Idade'/>
                            <InputText id='input-pro-eval-height' fieldName='Altura'/>
                            <InputText id='input-pro-eval-weight' fieldName='Peso'/> */}
                        </div>
                    </div>

                    <div className='div-measurements-data div-data'>
                        <h3>Medidas (mm):</h3>
                        <div className='input-centralize'>
                            <div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-neck' fieldname='Pescoço' {...register("neck")} onBlur={() => addMinLabel('input-pro-stud-neck', 'neck')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-neck'>Pescoço</label>
                                    {/* { !neckIsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-waist' fieldname='Cintura' {...register("waist")} onBlur={() => addMinLabel('input-pro-stud-waist', 'waist')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-waist'>Cintura</label>
                                    {/* { !waistIsValid && <span>Campo inválido!</span> } */}
                                </div>
                                {/* <InputText id='input-pro-eval-neck' fieldName='Pescoço'/>
                                <InputText id='input-pro-eval-waist' fieldName='Cintura'/> */}
                            </div>
                            <div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-thorax' fieldname='Tórax' {...register("thorax")} onBlur={() => addMinLabel('input-pro-stud-thorax', 'thorax')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-thorax'>Tórax</label>
                                    {/* { !thoraxIsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-abdomen' fieldname='Abdômen' {...register("abdomen")} onBlur={() => addMinLabel('input-pro-stud-abdomen', 'abdomen')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-abdomen'>Abdômen</label>
                                    {/* { !abdomenIsValid && <span>Campo inválido!</span> } */}
                                </div>
                                {/* <InputText id='input-pro-eval-thorax' fieldName='Tórax'/>
                                <InputText id='input-pro-eval-abdomen' fieldName='Abdômen'/> */}
                            </div>
                            <div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-rightarm' fieldname='Braço Direito' {...register("rightarm")} onBlur={() => addMinLabel('input-pro-stud-rightarm', 'rightarm')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-rightarm'>Braço direito</label>
                                    {/* { !rightarmIsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-leftarm' fieldname='Braço Esquerdo' {...register("leftarm")} onBlur={() => addMinLabel('input-pro-stud-leftarm', 'leftarm')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-leftarm'>Braço esquerdo</label>
                                    {/* { !leftarmIsValid && <span>Campo inválido!</span> } */}
                                </div>
                                {/* <InputText id='input-pro-eval-rightarm' fieldName='Braço Direito'/>
                                <InputText id='input-pro-eval-leftarm' fieldName='Braço Esquerdo'/> */}
                            </div>
                            <div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-rightforearm' fieldname='Antebraço D' {...register("rightforearm")} onBlur={() => addMinLabel('input-pro-stud-rightforearm', 'rightforearm')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-rightforearm'>Antebraço D</label>
                                    {/* { !rightforearmIsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-leftforearm' fieldname='Antebraço E' {...register("leftforearm")} onBlur={() => addMinLabel('input-pro-stud-leftforearm', 'leftforearm')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-leftforearm'>Antebraço E</label>
                                    {/* { !leftforearmIsValid && <span>Campo inválido!</span> } */}
                                </div>
                                {/* <InputText id='input-pro-eval-rightforearm' fieldName='Antebraço D'/>
                                <InputText id='input-pro-eval-leftforearm' fieldName='Antebraço E'/> */}
                            </div>
                            <div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-rightupperthigh' fieldname='Coxa Superior D' {...register("rightupperthigh")} onBlur={() => addMinLabel('input-pro-stud-rightupperthigh', 'rightupperthigh')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-rightupperthigh'>Coxa superior D</label>
                                    {/* { !rightupperthighIsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-leftupperthigh' fieldname='Coxa Superior E' {...register("leftupperthigh")} onBlur={() => addMinLabel('input-pro-stud-leftupperthigh', 'leftupperthigh')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-leftupperthigh'>Coxa superior E</label>
                                    {/* { !leftupperthighIsValid && <span>Campo inválido!</span> } */}
                                </div>
                                {/* <InputText id='input-pro-eval-rightupperthigh' fieldName='Coxa Superior D'/>
                                <InputText id='input-pro-eval-leftupperthigh' fieldName='Coxa Superior E'/> */}
                            </div>
                            <div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-rightmiddlethigh' fieldname='Coxa Média D' {...register("rightmiddlethigh")} onBlur={() => addMinLabel('input-pro-stud-rightmiddlethigh', 'rightmiddlethigh')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-rightmiddlethigh'>Coxa média D</label>
                                    {/* { !rightmiddlethighIsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-leftmiddlethigh' fieldname='Coxa Média E' {...register("leftmiddlethigh")} onBlur={() => addMinLabel('input-pro-stud-leftmiddlethigh', 'leftmiddlethigh')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-leftmiddlethigh'>Coxa média E</label>
                                    {/* { !leftmiddlethighIsValid && <span>Campo inválido!</span> } */}
                                </div>
                                {/* <InputText id='input-pro-eval-rightmiddlethigh' fieldName='Coxa Média D'/>
                                <InputText id='input-pro-eval-leftmiddlethigh' fieldName='Coxa Média E'/> */}
                            </div>
                            <div className='input-label-default'>
                                <input className='input-text-default' id='input-pro-eval-hip' fieldname='Quadril' {...register("hip")} onBlur={() => addMinLabel('input-pro-stud-hip', 'hip')} maxLength='255' />
                                <label htmlFor='input-pro-stud-hip'>Quadril</label>
                                {/* { !hipIsValid && <span>Campo inválido!</span> } */}
                            </div>
                            {/* <InputText id='input-pro-eval-hip' fieldName='Quadril'/> */}
                        </div>
                    </div>
                </div>
                <div className='div-inputs-secondrow'>
                    <div className='div-bodyfolds-data'>
                        <h3>Dobras corporais (mm):</h3>
                        <div className='divs-measurements'>
                            <div className='first-measurements'>
                                <h4>Primeira medida:</h4>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-subscapularis1' fieldname='Subescapular' {...register("subscapularis1")} onBlur={() => addMinLabel('input-pro-stud-subscapularis1', 'subscapularis1')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-subscapularis1'>Subescapular</label>
                                    {/* { !subscapularis1IsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-triceps1' fieldname='Tríceps' {...register("triceps1")} onBlur={() => addMinLabel('input-pro-stud-triceps1', 'triceps1')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-triceps1'>Tríceps</label>
                                    {/* { !triceps1IsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-breastplate1' fieldname='Peitoral' {...register("breastplate1")} onBlur={() => addMinLabel('input-pro-stud-breastplate1', 'breastplate1')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-breastplate1'>Peitoral</label>
                                    {/* { !breastplate1IsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-axillary1' fieldname='Axilar média' {...register("axillary1")} onBlur={() => addMinLabel('input-pro-stud-axillary1', 'axillary1')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-axillary1'>Axilar média</label>
                                    {/* { !axillary1IsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-suprailiac1' fieldname='Supra-ilíaca' {...register("suprailiac1")} onBlur={() => addMinLabel('input-pro-stud-suprailiac1', 'suprailiac1')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-suprailiac1'>Supra-ilíaca</label>
                                    {/* { !suprailiac1IsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-abdomnal1' fieldname='Abdominal' {...register("abdomnal1")} onBlur={() => addMinLabel('input-pro-stud-abdomnal1', 'abdomnal1')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-abdomnal1'>Abdominal</label>
                                    {/* { !abdomnal1IsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-femoral1' fieldname='Femural médio' {...register("femoral1")} onBlur={() => addMinLabel('input-pro-stud-femoral1', 'femoral1')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-femoral1'>Femural médio</label>
                                    {/* { !femoral1IsValid && <span>Campo inválido!</span> } */}
                                </div>
                                {/* <InputText id='input-pro-eval-subscapularis1' fieldName='Subescapular'/> */}
                                {/* <InputText id='input-pro-eval-triceps1' fieldName='Tríceps'/> */}
                                {/* <InputText id='input-pro-eval-breastplate1' fieldName='Peitoral'/> */}
                                {/* <InputText id='input-pro-eval-axillary1' fieldName='Axilar média'/> */}
                                {/* <InputText id='input-pro-eval-suprailiac1' fieldName='Supra-ilíaca'/> */}
                                {/* <InputText id='input-pro-eval-abdomnal1' fieldName='Abdominal'/> */}
                                {/* <InputText id='input-pro-eval-femoral1' fieldName='Femural médio'/> */}
                            </div>
                            <div className='second-measurements'>
                                <h4>Segunda medida:</h4>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-subscapularis2' fieldname='Subescapular' {...register("subscapularis2")} onBlur={() => addMinLabel('input-pro-stud-subscapularis2', 'subscapularis2')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-subscapularis2'>Subescapular</label>
                                    {/* { !subscapularis2IsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-triceps2' fieldname='Tríceps' {...register("triceps2")} onBlur={() => addMinLabel('input-pro-stud-triceps2', 'triceps2')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-triceps2'>Tríceps</label>
                                    {/* { !triceps2IsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-breastplate2' fieldname='Peitoral' {...register("breastplate2")} onBlur={() => addMinLabel('input-pro-stud-breastplate2', 'breastplate2')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-breastplate2'>Peitoral</label>
                                    {/* { !breastplate2IsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-axillary2' fieldname='Axilar média' {...register("axillary2")} onBlur={() => addMinLabel('input-pro-stud-axillary2', 'axillary2')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-axillary2'>Axilar média</label>
                                    {/* { !axillary2IsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-suprailiac2' fieldname='Supra-ilíaca' {...register("suprailiac2")} onBlur={() => addMinLabel('input-pro-stud-suprailiac2', 'suprailiac2')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-suprailiac2'>Supra-ilíaca</label>
                                    {/* { !suprailiac2IsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-abdomnal2' fieldname='Abdominal' {...register("abdomnal2")} onBlur={() => addMinLabel('input-pro-stud-abdomnal2', 'abdomnal2')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-abdomnal2'>Abdominal</label>
                                    {/* { !abdomnal2IsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-femoral2' fieldname='Femural médio' {...register("femoral2")} onBlur={() => addMinLabel('input-pro-stud-femoral2', 'femoral2')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-femoral2'>Femural médio</label>
                                    {/* { !femoral2IsValid && <span>Campo inválido!</span> } */}
                                </div>
                                {/* <InputText id='input-pro-eval-subscapularis2' fieldName='Subescapular'/>
                                <InputText id='input-pro-eval-triceps2' fieldName='Tríceps'/>
                                <InputText id='input-pro-eval-breastplate2' fieldName='Peitoral'/>
                                <InputText id='input-pro-eval-axillary2' fieldName='Axilar média'/>
                                <InputText id='input-pro-eval-suprailiac2' fieldName='Supra-ilíaca'/>
                                <InputText id='input-pro-eval-abdomnal2' fieldName='Abdominal'/>
                                <InputText id='input-pro-eval-femoral2' fieldName='Femural médio'/> */}
                            </div>
                            <div className='third-measurements'>
                                <h4>Terceira medida</h4>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-subscapularis3' fieldname='Subescapular' {...register("subscapularis3")} onBlur={() => addMinLabel('input-pro-stud-subscapularis3', 'subscapularis3')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-subscapularis3'>Subescapular</label>
                                    {/* { !subscapularis3IsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-triceps3' fieldname='Tríceps' {...register("triceps3")} onBlur={() => addMinLabel('input-pro-stud-triceps3', 'triceps3')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-triceps3'>Tríceps</label>
                                    {/* { !triceps3IsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-breastplate3' fieldname='Peitoral' {...register("breastplate3")} onBlur={() => addMinLabel('input-pro-stud-breastplate3', 'breastplate3')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-breastplate3'>Peitoral</label>
                                    {/* { !breastplate3IsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-axillary3' fieldname='Axilar média' {...register("axillary3")} onBlur={() => addMinLabel('input-pro-stud-axillary3', 'axillary3')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-axillary3'>Axilar média</label>
                                    {/* { !axillary3IsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-suprailiac3' fieldname='Supra-ilíaca' {...register("suprailiac3")} onBlur={() => addMinLabel('input-pro-stud-suprailiac3', 'suprailiac3')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-suprailiac3'>Supra-ilíaca</label>
                                    {/* { !suprailiac3IsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-abdomnal3' fieldname='Abdominal' {...register("abdomnal3")} onBlur={() => addMinLabel('input-pro-stud-abdomnal3', 'abdomnal3')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-abdomnal3'>Abdominal</label>
                                    {/* { !abdomnal3IsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-femoral3' fieldname='Femural médio' {...register("femoral3")} onBlur={() => addMinLabel('input-pro-stud-femoral3', 'femoral3')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-femoral3'>Femural médio</label>
                                    {/* { !femoral3IsValid && <span>Campo inválido!</span> } */}
                                </div>
                                {/* <InputText id='input-pro-eval-subscapularis3' fieldName='Subescapular'/>
                                <InputText id='input-pro-eval-triceps3' fieldName='Tríceps'/>
                                <InputText id='input-pro-eval-breastplate3' fieldName='Peitoral'/>
                                <InputText id='input-pro-eval-axillary3' fieldName='Axilar média'/>
                                <InputText id='input-pro-eval-suprailiac3' fieldName='Supra-ilíaca'/>
                                <InputText id='input-pro-eval-abdomnal3' fieldName='Abdominal'/>
                                <InputText id='input-pro-eval-femoral3' fieldName='Femural médio'/> */}
                            </div>
                            <div className='average-measurements'>
                                <h4>Média das três medidas:</h4>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-subscapularis' fieldname='Subescapular' {...register("subscapularis")} onBlur={() => addMinLabel('input-pro-stud-subscapularis', 'subscapularis')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-subscapularis'>Subescapular</label>
                                    {/* { !subscapularisIsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-triceps' fieldname='Tríceps' {...register("triceps")} onBlur={() => addMinLabel('input-pro-stud-triceps', 'triceps')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-triceps'>Tríceps</label>
                                    {/* { !tricepsIsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-breastplate' fieldname='Peitoral' {...register("breastplate")} onBlur={() => addMinLabel('input-pro-stud-breastplate', 'breastplate')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-breastplate'>Peitoral</label>
                                    {/* { !breastplateIsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-axillary' fieldname='Axilar média' {...register("axillary")} onBlur={() => addMinLabel('input-pro-stud-axillary', 'axillary')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-axillary'>Axilar média</label>
                                    {/* { !axillaryIsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-suprailiac' fieldname='Supra-ilíaca' {...register("suprailiac")} onBlur={() => addMinLabel('input-pro-stud-suprailiac', 'suprailiac')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-suprailiac'>Supra-ilíaca</label>
                                    {/* { !suprailiacIsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-abdomnal' fieldname='Abdominal' {...register("abdomnal")} onBlur={() => addMinLabel('input-pro-stud-abdomnal', 'abdomnal')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-abdomnal'>Abdominal</label>
                                    {/* { !abdomnalIsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-femoral' fieldname='Femural médio' {...register("femoral")} onBlur={() => addMinLabel('input-pro-stud-femoral', 'femoral')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-femoral'>Femural médio</label>
                                    {/* { !femoralIsValid && <span>Campo inválido!</span> } */}
                                </div>
                                {/* <InputText id='input-pro-eval-subscapularis' fieldName='Subescapular'/>
                                <InputText id='input-pro-eval-triceps' fieldName='Tríceps'/>
                                <InputText id='input-pro-eval-breastplate' fieldName='Peitoral'/>
                                <InputText id='input-pro-eval-axillary' fieldName='Axilar média'/>
                                <InputText id='input-pro-eval-suprailiac' fieldName='Supra-ilíaca'/>
                                <InputText id='input-pro-eval-abdomnal' fieldName='Abdominal'/>
                                <InputText id='input-pro-eval-femoral' fieldName='Femural médio'/> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='div-inputs-thirdrow'>
                    <div className='div-bodyresults-data div-data'>
                        <h3>Resultados corporais:</h3>
                        <div className='div-results'>
                            <div className='first-result'>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-subscapularis1' fieldname='Densidade corporal' {...register("subscapularis1")} onBlur={() => addMinLabel('input-pro-stud-subscapularis1', 'subscapularis1')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-subscapularis1'>Densidade corporal (g/ml)</label>
                                    {/* { !subscapularis1IsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-triceps1' fieldname='Massa magra' {...register("triceps1")} onBlur={() => addMinLabel('input-pro-stud-triceps1', 'triceps1')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-triceps1'>Massa magra (kg)</label>
                                    {/* { !triceps1IsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-breastplate1' fieldname='Pei>Massa gordatoral' {...register("breastplate1")} onBlur={() => addMinLabel('input-pro-stud-breastplate1', 'breastplate1')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-breastplate1'>Massa gorda (kg)</label>
                                    {/* { !breastplate1IsValid && <span>Campo inválido!</span> } */}
                                </div>
                            </div>
                            <div className='second-result'>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-axillary1' fieldname='Percentual de gordura' {...register("axillary1")} onBlur={() => addMinLabel('input-pro-stud-axillary1', 'axillary1')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-axillary1'>Percentual de gordura (%)</label>
                                    {/* { !axillary1IsValid && <span>Campo inválido!</span> } */}
                                </div>
                                <div className='input-label-default'>
                                    <input className='input-text-default' id='input-pro-eval-suprailiac1' fieldname='Taxa metamólica basal' {...register("suprailiac1")} onBlur={() => addMinLabel('input-pro-stud-suprailiac1', 'suprailiac1')} maxLength='255' />
                                    <label htmlFor='input-pro-stud-suprailiac1'>Taxa metamólica basal (kcal)</label>
                                    {/* { !suprailiac1IsValid && <span>Campo inválido!</span> } */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}