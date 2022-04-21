import './SectionPhysicEval.scss';
import InputText from '../../components/InputText';
import InputRadio from '../../components/InputRadio';

export default function SectionPhysicEval() {

    return (
        <>
            <div className='div-inputs-container'>
                <div className='div-inputs-firstrow'>
                    <div className='div-personal-data div-data'>
                        <h3>Dados Pessoais:</h3>
                        <InputText id='input-pro-eval-firstname' fieldName='Nome'/>
                        <InputText id='input-pro-eval-lastname' fieldName='Sobrenome'/>
                        <InputText id='input-pro-eval-email' fieldName='E-mail'/>
                    </div>

                    <div className='div-fundamental-data div-data'>
                        <h3>Dados Fundamentais:</h3>
                        <div className='input-sex input-radio-container'>
                            <span>Sexo:</span>
                            <div className='inputs-radio'>
                                <InputRadio id='radio-pro-eval-feminine' labelName='Feminino' name='sex' />
                                <InputRadio id='radio-pro-eval-masculine' labelName='Masculino' name='sex' />
                            </div>
                        </div>
                        <div className='input-biotype input-radio-container'>
                            <span>Biotipo:</span>
                            <div className='inputs-radio'>
                                <InputRadio id='radio-pro-eval-ectomorph' labelName='Ectomorfo' name='biotype' />
                                <InputRadio id='radio-pro-eval-mesomorph' labelName='Mesomorfo' name='biotype' />
                                <InputRadio id='radio-pro-eval-endomorph' labelName='Endomorfo' name='biotype' />
                            </div>
                        </div>
                        <div className='inputs-text'>
                            <InputText id='input-pro-eval-age' fieldName='Idade'/>
                            <InputText id='input-pro-eval-height' fieldName='Altura'/>
                            <InputText id='input-pro-eval-weight' fieldName='Peso'/>
                        </div>
                    </div>

                    <div className='div-measurements-data div-data'>
                        <h3>Medidas (mm):</h3>
                        <div>
                            <InputText id='input-pro-eval-neck' fieldName='Pescoço'/>
                            <InputText id='input-pro-eval-waist' fieldName='Cintura'/>
                        </div>
                        <div>
                            <InputText id='input-pro-eval-thorax' fieldName='Tórax'/>
                            <InputText id='input-pro-eval-abdomen' fieldName='Abdômen'/>
                        </div>
                        <div>
                            <InputText id='input-pro-eval-rightarm' fieldName='Braço Direito'/>
                            <InputText id='input-pro-eval-leftarm' fieldName='Braço Esquerdo'/>
                        </div>
                        <div>
                            <InputText id='input-pro-eval-rightforearm' fieldName='Antebraço D'/>
                            <InputText id='input-pro-eval-leftforearm' fieldName='Antebraço E'/>
                        </div>
                        <div>
                            <InputText id='input-pro-eval-rightupperthigh' fieldName='Coxa Superior D'/>
                            <InputText id='input-pro-eval-leftupperthigh' fieldName='Coxa Superior E'/>
                        </div>
                        <div>
                            <InputText id='input-pro-eval-rightmiddlethigh' fieldName='Coxa Média D'/>
                            <InputText id='input-pro-eval-leftmiddlethigh' fieldName='Coxa Média E'/>
                        </div>
                        <InputText id='input-pro-eval-hip' fieldName='Quadril'/>
                    </div>
                </div>
                <div className='div-inputs-secondrow'>
                    <div className='div-bodyfolds-data'>
                        <h3>Dobras Corporais (mm):</h3>
                        <div className='divs-measurements'>
                            <div className='first-measurements'>
                                <h4>Primeira Medida:</h4>
                                <InputText id='input-pro-eval-subscapularis1' fieldName='Subescapular'/>
                                <InputText id='input-pro-eval-triceps1' fieldName='Tríceps'/>
                                <InputText id='input-pro-eval-breastplate1' fieldName='Peitoral'/>
                                <InputText id='input-pro-eval-axillary1' fieldName='Axilar média'/>
                                <InputText id='input-pro-eval-suprailiac1' fieldName='Supra-ilíaca'/>
                                <InputText id='input-pro-eval-abdomnal1' fieldName='Abdominal'/>
                                <InputText id='input-pro-eval-femoral1' fieldName='Femural médio'/>
                            </div>
                            <div className='second-measurements'>
                                <h4>Segunda Medida:</h4>
                                <InputText id='input-pro-eval-subscapularis2' fieldName='Subescapular'/>
                                <InputText id='input-pro-eval-triceps2' fieldName='Tríceps'/>
                                <InputText id='input-pro-eval-breastplate2' fieldName='Peitoral'/>
                                <InputText id='input-pro-eval-axillary2' fieldName='Axilar média'/>
                                <InputText id='input-pro-eval-suprailiac2' fieldName='Supra-ilíaca'/>
                                <InputText id='input-pro-eval-abdomnal2' fieldName='Abdominal'/>
                                <InputText id='input-pro-eval-femoral2' fieldName='Femural médio'/>
                            </div>
                            <div className='third-measurements'>
                                <h4>Terceira Medida</h4>
                                <InputText id='input-pro-eval-subscapularis3' fieldName='Subescapular'/>
                                <InputText id='input-pro-eval-triceps3' fieldName='Tríceps'/>
                                <InputText id='input-pro-eval-breastplate3' fieldName='Peitoral'/>
                                <InputText id='input-pro-eval-axillary3' fieldName='Axilar média'/>
                                <InputText id='input-pro-eval-suprailiac3' fieldName='Supra-ilíaca'/>
                                <InputText id='input-pro-eval-abdomnal3' fieldName='Abdominal'/>
                                <InputText id='input-pro-eval-femoral3' fieldName='Femural médio'/>
                            </div>
                            <div className='average-measurements'>
                                <h4>Média das três Medidas:</h4>
                                <InputText id='input-pro-eval-subscapularis1' fieldName='Subescapular'/>
                                <InputText id='input-pro-eval-triceps1' fieldName='Tríceps'/>
                                <InputText id='input-pro-eval-breastplate1' fieldName='Peitoral'/>
                                <InputText id='input-pro-eval-axillary' fieldName='Axilar média'/>
                                <InputText id='input-pro-eval-suprailiac' fieldName='Supra-ilíaca'/>
                                <InputText id='input-pro-eval-abdomnal' fieldName='Abdominal'/>
                                <InputText id='input-pro-eval-femoral' fieldName='Femural médio'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}