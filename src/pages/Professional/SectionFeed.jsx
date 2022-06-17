import InputText from "../../components/InputText";
import logo from "../../images/logo.png";
import icon_cadastre from "../../images/icon-cadastre.png";
import icon_evaluation from "../../images/icon-evaluation.png";
import icon_planfood from "../../images/icon-planfood.png";
import icon_student from "../../images/icon-student.png";
import { Link } from 'react-router-dom';

export default function SectionFeed() {
    return (
        <div className="div-section-feed">
            <div className="div-scroller">
                <div className="div-content">
                    <h1>Bem-vindo à Bodypath!</h1>
                    <img src={logo} alt="Logo Bodypath" />
                    <div className="div-redirects">
                        <div>
                            <a href="/professional/students" className="item-redirect">
                                <img src={icon_student} alt="Alunos" />
                            </a>
                            <span>Alunos</span>
                            </div>
                        <div>
                            <a href="/professional/evaluations" className="item-redirect">
                                <img src={icon_evaluation} alt="Avaliação física" />
                            </a>
                            <span>Avaliação<br/>física</span>
                        </div>
                        <div>
                            <a href="/professional/plans" className="item-redirect">
                                <img src={icon_planfood} alt="Plano alimentar" />
                            </a>
                            <span>Plano<br/>alimentar</span>
                        </div>
                        <div>
                            <a href="/professional/cadastre" className="item-redirect">
                                <img src={icon_cadastre} alt="Meu cadastro" />
                            </a>
                            <span>Meu<br/>cadastro</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}