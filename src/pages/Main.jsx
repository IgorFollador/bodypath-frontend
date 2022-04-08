import './Main.scss';
import image from '../images/image-gym.png'

const Main = () => {
  return (
    <main>
        <div className='sections-container'>
            <section id='main' className='section-main'>
                <div className='main-text'>
                    <div className='main-title'>
                        <h1>Facilitando a vida dos profissionais que falicitam nosso <span>caminho até um corpo saudável</span></h1>
                    </div>
                    <div className='main-links'>
                        <a href='/'>Quem somos?</a>
                        <a href='/'>Entre em contato!</a>
                        <a href='/'>Conheça nossos planos.</a>
                        <a href='/'>Conheça nossos profissionais de nutrição...</a>
                        <a href='/'>Conheça nossos profissionais de treino...</a>
                    </div>
                </div>
                <div className='main-image'>
                    <img src={image} alt='Training'></img>
                </div>
            </section>
            <section>

            </section>
        </div>
    </main>
  );
}

export default Main;