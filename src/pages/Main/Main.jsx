import './Main.scss';
import image from '../../images/image-gym.png'
import balestrin from '../../images/balestrin.jpg'
import desordi from '../../images/desordi.jpeg'
import muzy from '../../images/muzy.jpg'
import norton from '../../images/norton.jpg'
import stronda from '../../images/stronda.jpg'
import arrow_left from '../../images/arrow-left.png'
import arrow_right from '../../images/arrow-right.png'
import React, { useState } from 'react';

const Main = () => {
    const [idxProfessional, setIdxProfessional] = useState(0);
    const professionals = [
        {
            'name': 'Júlio Balestrin',
            'office': 'Educador Físico',
            'photo': balestrin
        },{
            'name': 'Henrique Desordi',
            'office': 'Nutricionista',
            'photo': desordi
        },{
            'name': 'Paulo Muzy',
            'office': 'Educador Físico',
            'photo': muzy
        },{
            'name': 'Norton Mello',
            'office': 'Educador Físico',
            'photo': norton
        },{
            'name': 'Leonardo Cardoso',
            'office': 'Educador Físico',
            'photo': stronda
        },
    ]

    const refreshIndex = operator => {
        if (operator === 'plus') {
            if (idxProfessional === (professionals.length - 1)) setIdxProfessional(0);
            else setIdxProfessional(idxProfessional+1);
        } else {
            if (idxProfessional === 0) setIdxProfessional(professionals.length - 1);
            else setIdxProfessional(idxProfessional-1);
        }
    }

    return (
        <main>
            <div className='sections-container'>
                <section id='main' className='section-main'>
                    <div className='main-text'>
                        <div className='main-title'>
                            <h1>Facilitando a vida dos profissionais que falicitam nosso <span>caminho até um corpo saudável</span></h1>
                        </div>
                        <div className='main-links'>
                            <a href='#know-professional'>Conheça nossos profissionais...</a>
                            <a href='#know-plans'>Conheça nossos planos.</a>
                            <a href='#'>Quem somos?</a>
                            <a href='#'>Entre em contato!</a>
                        </div>
                    </div>
                    <div className='main-image'>
                        <img src={image} alt='Training'></img>
                    </div>
                </section>
                <section id='know-professional' className='section-know-professional'>
                    <div className='know-professional-content'>
                        <div className='know-professional-title'>
                            <h1>Conheça alguns dos nossos profissionais</h1>
                        </div>
                        <div className='know-professional-carousel'>
                            <div className='carousel-item'>
                                <div className='arrow' style={{backgroundImage: `url(${arrow_left})`}} onClick={ () => {refreshIndex('minus')} }></div>
                                <div className='align-content'>
                                    <div className='image' style={{backgroundImage: `url(${professionals[idxProfessional].photo})`}}></div>
                                    <div className='info'>
                                        <h3>{professionals[idxProfessional].name}</h3>
                                        <p>{professionals[idxProfessional].office}</p>
                                    </div>
                                </div>
                                <div className='arrow' style={{backgroundImage: `url(${arrow_right})`}} onClick={ () => {refreshIndex('plus')} }></div>
                            </div>
                        </div>
                    </div>
                </section>
                <hr />
                <section id='know-plans' className='section-know-plans'>
                    <div className='know-plans-content'>
                        <div className='know-plans-title'>
                            <h1>Escolha o plano ideal para você!</h1>
                        </div>
                        <div className='know-plans'>
                            <div className='plan-nutri'>
                                <div className='plan-title'>
                                    <h3>Nutricionista</h3>
                                </div>
                                <hr />
                                <div className='plan-content'>
                                    <div>
                                        <ul>
                                            <li>API com diversos alimentos</li>
                                            <li>Controle de planos alimentares</li>
                                            <li>Cadastro de alunos</li>
                                        </ul>
                                    </div>
                                    <div className='plan-values'>
                                        <div>
                                            <p>R$ </p>
                                            <p>59,90</p>
                                            <p> / mês</p>
                                        </div>
                                        <div>
                                            <p>R$ </p>
                                            <p>659,90</p>
                                            <p>/ ano</p>
                                        </div>
                                        <p>*Opção mais barata</p>
                                    </div>
                                </div>
                            </div>
                            <div className='plan-personal'>
                                <div className='plan-title'>
                                    <h3>Educador físico</h3>
                                </div>
                                <hr />
                                <div className='plan-content'>
                                    <div>
                                        <ul>
                                            <li>Controle de planilha de treinos</li>
                                            <li>Impressão de treinos</li>
                                            <li>Cadastro de alunos</li>
                                        </ul>
                                    </div>
                                    <div className='plan-values'>
                                        <div>
                                            <p>R$ </p>
                                            <p>59,90</p>
                                            <p> / mês</p>
                                        </div>
                                        <div>
                                            <p>R$ </p>
                                            <p>659,90</p>
                                            <p>/ ano</p>
                                        </div>
                                        <p>*Opção mais barata</p>
                                    </div>
                                </div>
                            </div>
                            <div className='plan-nutri-personal'>
                                <div className='plan-title'>
                                    <h3>Nutricionista +<br/>Educador físico</h3>
                                </div>
                                <hr />
                                <div className='plan-content'>
                                    <div>
                                        <ul>
                                            <li>API com diversos alimentos</li>
                                            <li>Controle de planilha de treinos</li>
                                            <li>Controle de planos alimentares</li>
                                            <li>Impressão de treinos</li>
                                            <li>Cadastro de alunos</li>
                                        </ul>
                                    </div>
                                    <div className='plan-values'>
                                        <div>
                                            <p>R$ </p>
                                            <p>99,90</p>
                                            <p> / mês</p>
                                        </div>
                                        <div>
                                            <p>R$ </p>
                                            <p>999,90</p>
                                            <p>/ ano</p>
                                        </div>
                                        <p>*Opção mais barata</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Main;